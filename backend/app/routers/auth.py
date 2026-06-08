from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    TokenResponse,
    RefreshTokenRequest,
    RefreshTokenResponse
)
from app.services.authService import (
    register_user,
    login_user,
    refresh_access_token
)
from app.db.session import get_db


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register",response_model=UserResponse,status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate,db: Session = Depends(get_db)):
   return register_user(user_data,db)


@router.post("/login",response_model=TokenResponse)
def login(login_data: UserLogin,db: Session = Depends(get_db)):
   return login_user(login_data,db)

@router.post("/refresh",response_model=RefreshTokenResponse)
def refresh_token(refresh_data: RefreshTokenRequest,db: Session = Depends(get_db)):
    return refresh_access_token(refresh_data.refresh_token,db)