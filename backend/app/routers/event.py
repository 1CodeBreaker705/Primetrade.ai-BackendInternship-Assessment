from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.user import User

from app.schemas.event import (
    EventCreate,
    EventUpdate,
    EventResponse
)

from app.schemas.eventRegistration import (
    MyRegistrationsResponse,RegistrationResponse
)

from app.core.dependencies import (
    verify_user,
    verify_role_admin
)

from app.services.eventService import (
    create_event,
    get_events,
    update_event,
    delete_event,
    register_for_event,
    get_my_registrations,
    cancel_registration
)

router = APIRouter(prefix="/events",tags=["Events"])



@router.get("/",response_model=list[EventResponse])
def get_all_events(db: Session = Depends(get_db),current_user: User = Depends(verify_user)):
    return get_events(current_user,db)

#ADMIN ROUTES
@router.post("/",response_model=EventResponse,status_code=201)
def create_new_event(event_data: EventCreate,db: Session = Depends(get_db),current_admin: User = Depends(verify_role_admin)):
    return create_event(event_data,current_admin,db)

@router.put("/{event_id}",response_model=EventResponse)
def update_existing_event(event_id: UUID,event_data: EventUpdate,db: Session = Depends(get_db),current_admin: User = Depends(verify_role_admin)):
    return update_event(event_id,event_data,db)

@router.delete("/{event_id}")
def delete_existing_event(event_id: UUID,db: Session = Depends(get_db),current_admin: User = Depends(verify_role_admin)):
    return delete_event(event_id,db)

#USER Event Registration Handling
@router.post("/{event_id}/register",response_model=RegistrationResponse)
def register_event(event_id: UUID,db: Session = Depends(get_db),current_user: User = Depends(verify_user)):
    return register_for_event(event_id,current_user,db)

@router.delete("/{event_id}/unregister")
def unregister_event(event_id: UUID,db: Session = Depends(get_db),current_user: User = Depends(verify_user)):
    return cancel_registration(event_id,current_user,db)

@router.get("/my-registrations",response_model=list[MyRegistrationsResponse])
def my_registrations(db: Session = Depends(get_db),current_user: User = Depends(verify_user)):
    return get_my_registrations(current_user,db)