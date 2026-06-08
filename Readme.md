# EventHub

A full-stack Event Management Platform built with React, FastAPI, PostgreSQL, SQLAlchemy, JWT Authentication, Refresh Tokens, and Role-Based Access Control.

## Overview

EventHub allows administrators to create and manage events while enabling users to browse events, register for events, cancel registrations, and view their registrations.

The project demonstrates:

* REST API Design
* JWT Authentication
* Refresh Token Workflow
* Role-Based Access Control (RBAC)
* PostgreSQL Database Design
* Frontend-Backend Integration
* Event Registration Management

---

## Features

### Authentication & Security

* User Registration
* User Login
* Password Hashing (bcrypt)
* JWT Access Tokens
* Refresh Tokens
* Protected Routes
* Role-Based Authorization

### User Features

* View Events
* Register for Events
* Cancel Event Registrations
* View Registered Events

### Admin Features

* Create Events
* Update Events
* Delete Events
* Monitor Registration Counts

### Event Management

* Event Capacity Limits
* Unlimited Capacity Support
* Duplicate Registration Prevention
* Registration Tracking

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Vite

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication
* bcrypt

### Database

* PostgreSQL

---

## High-Level Project Structure

```text
eventhub/

├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
```

---

## API Endpoints

### Authentication

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | /auth/register | Register User        |
| POST   | /auth/login    | Login User           |
| POST   | /auth/refresh  | Refresh Access Token |

### Events

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /events            | Get All Events       |
| POST   | /events            | Create Event (Admin) |
| PUT    | /events/{event_id} | Update Event (Admin) |
| DELETE | /events/{event_id} | Delete Event (Admin) |

### Event Registration (User)

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| POST   | /events/{event_id}/register   | Register for Event  |
| DELETE | /events/{event_id}/unregister | Cancel Registration |
| GET    | /events/my-registrations      | User Registrations  |

---

## Environment Variables

### Backend

```env
DATABASE_URL=postgresql://user:password@localhost/eventhub
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
FRONTEND_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

---

## Running Locally

### Backend

```bash
cd backend

python -m venv venv

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Security Features

* bcrypt Password Hashing
* JWT Authentication
* Refresh Token Workflow
* Role-Based Access Control
* Input Validation using Pydantic
* Protected API Routes
* Automatic Token Refresh via Axios Interceptors

---

## Future Improvements

* Event Search & Filtering
* Pagination
* Email Notifications
* Docker Support
* Redis Caching
* CI/CD Pipeline
* Audit Logging

---

## Author

Ranjan Singh
