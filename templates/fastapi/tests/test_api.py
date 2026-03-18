import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from src.app import create_app


@pytest.fixture
def test_app(tmp_path):
    db_url = f"sqlite+pysqlite:///{tmp_path / 'test.db'}"
    return create_app(db_url)


@pytest_asyncio.fixture
async def client(test_app):
    transport = ASGITransport(app=test_app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
async def test_health(client):
    response = await client.get("/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["database"] == "up"


@pytest.mark.asyncio
async def test_create_and_get_item(client):
    create_response = await client.post(
        "/items",
        json={
            "name": "Laptop",
            "description": "Equipo de trabajo",
            "price": 1499.99,
            "stock": 4,
        },
    )

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["id"] > 0
    assert created["name"] == "Laptop"

    get_response = await client.get(f"/items/{created['id']}")
    assert get_response.status_code == 200
    loaded = get_response.json()
    assert loaded["name"] == "Laptop"
    assert loaded["stock"] == 4


@pytest.mark.asyncio
async def test_create_item_validation_error(client):
    response = await client.post(
        "/items",
        json={
            "name": "A",
            "description": "Inválido por nombre corto y precio negativo",
            "price": -10,
            "stock": -1,
        },
    )

    assert response.status_code == 422
    payload = response.json()
    assert payload["message"] == "Validation error"
    assert payload["path"] == "/items"


@pytest.mark.asyncio
async def test_get_item_not_found(client):
    response = await client.get("/items/99999")

    assert response.status_code == 404
    payload = response.json()
    assert payload["message"] == "Item not found"
    assert payload["path"] == "/items/99999"


@pytest.mark.asyncio
async def test_delete_item(client):
    create_response = await client.post(
        "/items",
        json={
            "name": "Mouse",
            "description": "Accesorio",
            "price": 19.99,
            "stock": 15,
        },
    )
    item_id = create_response.json()["id"]

    delete_response = await client.delete(f"/items/{item_id}")
    assert delete_response.status_code == 204

    get_response = await client.get(f"/items/{item_id}")
    assert get_response.status_code == 404
