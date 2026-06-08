from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.event import Event
from app.models.eventRegistration import EventRegistration
from app.models.user import User

from app.schemas.event import (
    EventCreate,
    EventUpdate
)


def create_event(event_data: EventCreate,current_user: User,db: Session):
    event = Event(
        title=event_data.title,
        description=event_data.description,
        location=event_data.location,
        event_date=event_data.event_date,
        capacity=event_data.capacity,
        created_by=current_user.id
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event


def get_events(current_user: User,db: Session):
    events = db.query(Event).all()

    for event in events:
        event.registrations_count = (
            db.query(EventRegistration)
            .filter(
                EventRegistration.event_id == event.id
            )
            .count()
        )
    
        event.is_registered = (
            db.query(EventRegistration)
            .filter(
                EventRegistration.event_id == event.id,
                EventRegistration.user_id == current_user.id
            )
            .first()
            is not None
        )

    return events


def update_event(event_id,event_data: EventUpdate,db: Session):
    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )

    update_data = event_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(event, field, value)

    db.commit()
    db.refresh(event)

    return event


def delete_event(event_id, db: Session):
    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )

    db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id
    ).delete(
        synchronize_session=False
    )

    db.delete(event)

    db.commit()

    return {
        "message": "Event deleted successfully"
    }


def register_for_event(event_id,current_user: User,db: Session):
    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )

    existing_registration = (
        db.query(EventRegistration)
        .filter(
            EventRegistration.user_id == current_user.id,
            EventRegistration.event_id == event_id
        )
        .first()
    )

    if existing_registration:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already registered for this event"
        )

    if event.capacity is not None:
        registrations_count = (
            db.query(EventRegistration)
            .filter(
                EventRegistration.event_id == event_id
            )
            .count()
        )

        if registrations_count >= event.capacity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Event is full"
            )

    registration = EventRegistration(
        user_id=current_user.id,
        event_id=event_id
    )

    db.add(registration)
    db.commit()
    db.refresh(registration)

    return registration


def get_my_registrations(current_user: User,db: Session):
    return (
        db.query(
            Event.title,
            Event.location,
            Event.event_date,
            EventRegistration.registered_at
        )
        .join(
            Event,
            Event.id == EventRegistration.event_id
        )
        .filter(
            EventRegistration.user_id == current_user.id
        )
        .all()
    )

def cancel_registration(event_id,current_user: User,db: Session):
    registration = (
        db.query(EventRegistration)
        .filter(
            EventRegistration.event_id == event_id,
            EventRegistration.user_id == current_user.id
        )
        .first()
    )

    if not registration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Registration not found"
        )

    db.delete(registration)
    db.commit()

    return {
        "message": "Registration cancelled successfully"
    }