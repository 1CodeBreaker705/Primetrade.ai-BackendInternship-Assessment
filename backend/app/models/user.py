from sqlalchemy import Column, String, DateTime, Enum
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid
from app.core.enums import UserRole

class User(Base):
    __tablename__ = "users"

    id = Column(
      UUID(as_uuid=True),
      primary_key=True,
      default=uuid.uuid4
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(
        String,
        nullable=False
    )

    role = Column(
        Enum(UserRole),
        nullable=False,
        default=UserRole.USER
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )