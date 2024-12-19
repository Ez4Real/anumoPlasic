import uuid
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import Product, ProductCreate, User, UserCreate, UserUpdate, Subscriber, SubscriberCreate, SubscriberUpdate


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_product(*, session: Session, product_in: ProductCreate, owner_id: uuid.UUID) -> Product:
    db_product = Product.model_validate(product_in, update={"owner_id": owner_id})
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product


def create_subscriber(*, session: Session, subscriber_in: SubscriberCreate) -> Subscriber:
    db_subscriber = Subscriber.model_validate(subscriber_in)
    session.add(db_subscriber)
    session.commit()
    session.refresh(db_subscriber)
    return db_subscriber


def get_subscriber_by_email(*, session: Session, email: str) -> Subscriber | None:
    statement = select(Subscriber).where(Subscriber.email == email)
    session_subscriber = session.exec(statement).first()
    return session_subscriber


def update_subscriber(
        *,
        session: Session,
        db_subscriber: Subscriber,
        subscriber_in: SubscriberUpdate
    ) -> Any:
    subscriber_data = subscriber_in.model_dump(exclude_unset=True)
    db_subscriber.sqlmodel_update(subscriber_data)
    session.add(db_subscriber)
    session.commit()
    session.refresh(db_subscriber)
    return db_subscriber