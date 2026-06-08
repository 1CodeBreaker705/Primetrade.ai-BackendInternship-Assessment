from contextlib import asynccontextmanager
from fastapi import FastAPI,APIRouter
from app.db.database import Base, engine
from app.routers.auth import router as auth_router
from app.routers.event import router as event_router
from fastapi.middleware.cors import CORSMiddleware
# Import models so SQLAlchemy knows about them
from app.models.user import User
from app.models.event import Event
from app.models.eventRegistration import EventRegistration


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="EventHub API",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/")
async def health_check():
    return {
        "status": "ok",
        "message": "EventHub API is running"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://primetrade-ai-backend-internship-as.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_v1 = APIRouter(prefix="/api/v1")

api_v1.include_router(auth_router)
api_v1.include_router(event_router)
app.include_router(api_v1)
