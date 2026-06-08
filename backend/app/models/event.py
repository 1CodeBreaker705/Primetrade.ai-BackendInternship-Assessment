from sqlalchemy import (
    Column,
    String,
    DateTime,
    Integer,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from app.db.database import Base

import uuid


class Event(Base):
    __tablename__ = "events"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        String,
        nullable=False
    )

    location = Column(
        String(255),
        nullable=False
    )

    event_date = Column(
        DateTime(timezone=True),
        nullable=False,
        index=True
    )

    capacity = Column(
        Integer,
        nullable=True
    )

    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )