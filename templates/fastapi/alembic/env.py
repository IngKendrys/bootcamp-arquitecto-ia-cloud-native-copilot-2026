from alembic import context
config = context.config
target_metadata = None

def run_migrations_offline():
    context.configure(url="postgresql+psycopg://postgres:example@localhost:5432/enrollmenthub")
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    run_migrations_offline()

def run_migrations():
    run_migrations_online()
run_migrations()
