import os
from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import DateTime, Float, Integer, String, create_engine, func, select, text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker


class Base(DeclarativeBase):
    pass


class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class ItemCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    description: str | None = Field(default=None, max_length=500)
    price: float = Field(gt=0)
    stock: int = Field(ge=0)


class ItemUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=100)
    description: str | None = Field(default=None, max_length=500)
    price: float | None = Field(default=None, gt=0)
    stock: int | None = Field(default=None, ge=0)


class ItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    price: float
    stock: int
    created_at: datetime


def create_app(database_url: str | None = None) -> FastAPI:
    db_url = database_url or os.getenv(
        "DATABASE_URL",
        "sqlite+pysqlite:///./fastapi_lab.db",
    )

    connect_args = {"check_same_thread": False} if db_url.startswith("sqlite") else {}
    engine = create_engine(db_url, future=True, pool_pre_ping=True, connect_args=connect_args)
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

    Base.metadata.create_all(bind=engine)

    app = FastAPI(
        title="FastAPI Lab 04 Service",
        version="1.0.0",
        description="Servicio base productivo con FastAPI, PostgreSQL y CRUD de items.",
    )

    def get_db() -> Session:
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "message": "Validation error",
                "path": request.url.path,
                "details": exc.errors(),
            },
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        detail = exc.detail if isinstance(exc.detail, str) else "Request failed"
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "message": detail,
                "path": request.url.path,
            },
        )

    @app.get("/health", tags=["health"])
    def health(db: Session = Depends(get_db)):
        try:
            db.execute(text("SELECT 1"))
            db_status = "up"
        except Exception:
            db_status = "down"
        return {
            "status": "ok",
            "database": db_status,
        }

    @app.get("/items", response_model=list[ItemOut], tags=["items"])
    def list_items(db: Session = Depends(get_db)):
        items = db.execute(select(Item).order_by(Item.id)).scalars().all()
        return items

    @app.get("/items/{item_id}", response_model=ItemOut, tags=["items"])
    def get_item(item_id: int, db: Session = Depends(get_db)):
        item = db.get(Item, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
        return item

    @app.post("/items", response_model=ItemOut, status_code=status.HTTP_201_CREATED, tags=["items"])
    def create_item(payload: ItemCreate, db: Session = Depends(get_db)):
        item = Item(
            name=payload.name.strip(),
            description=payload.description,
            price=payload.price,
            stock=payload.stock,
        )
        db.add(item)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Item name already exists")
        db.refresh(item)
        return item

    @app.put("/items/{item_id}", response_model=ItemOut, tags=["items"])
    def update_item(item_id: int, payload: ItemUpdate, db: Session = Depends(get_db)):
        item = db.get(Item, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

        updates = payload.model_dump(exclude_unset=True)
        if "name" in updates and updates["name"] is not None:
            updates["name"] = updates["name"].strip()
        for key, value in updates.items():
            setattr(item, key, value)

        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Item name already exists")
        db.refresh(item)
        return item

    @app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["items"])
    def delete_item(item_id: int, db: Session = Depends(get_db)):
        item = db.get(Item, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
        db.delete(item)
        db.commit()

    return app


app = create_app()
