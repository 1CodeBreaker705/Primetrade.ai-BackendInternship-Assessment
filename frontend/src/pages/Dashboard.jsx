import { useEffect, useState } from "react";

import {
  cancelRegistration,
  registerForEvent,
} from "../services/eventRegistrationService";
import { getEvents } from "../services/eventService";

import EventCard from "../pages/components/EventCard";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await getEvents(token);

      setEvents(response.data);
    } catch (err) {
      setMessage("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem("access_token");

      await registerForEvent(eventId, token);

      setMessage("Successfully registered for the event");

      fetchEvents();
    } catch (err) {
      setMessage(err.response?.data?.detail || "Registration failed");
    }
  };

  const handleCancel = async (eventId) => {
    try {
      const token = localStorage.getItem("access_token");

      await cancelRegistration(eventId, token);

      setMessage("Registration cancelled");

      fetchEvents();
    } catch (err) {
      setMessage(err.response?.data?.detail || "Cancellation failed");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
        }}
      >
        <h2>Loading Events...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          color: "#0f172a",
        }}
      >
        Events Dashboard
      </h1>

      {message && (
        <div
          style={{
            background: "#dbeafe",
            color: "#1e40af",
            padding: "1rem",
            borderRadius: "10px",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      {events.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#0f172a",
              marginBottom: "0.5rem",
            }}
          >
            No Events Available
          </h2>

          <p
            style={{
              color: "#64748b",
              margin: 0,
            }}
          >
            Check back later for upcoming events.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "flex-start",
          }}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
