from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from pydantic import ConfigDict


class EventCreate(BaseModel):
    title: str = Field(min_length=3,max_length=255)

    description: str

    location: str

    event_date: datetime

    capacity: int | None = Field(default=None,gt=0)

class EventUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    location: str | None = None
    event_date: datetime | None = None
    capacity: int | None = Field(default=None,gt=0)


class EventResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: UUID
    title: str
    description: str
    location: str
    event_date: datetime
    capacity: int | None
    registrations_count: int | None = None
    is_registered: bool = False
    created_by: UUID
    created_at: datetime