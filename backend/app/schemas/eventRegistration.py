from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime


class RegistrationResponse(BaseModel): 
  model_config = ConfigDict( from_attributes=True ) 
  id: UUID 
  user_id: UUID 
  event_id: UUID 
  registered_at: datetime


class MyRegistrationsResponse(BaseModel):
    title: str
    location: str
    event_date: datetime
    registered_at: datetime