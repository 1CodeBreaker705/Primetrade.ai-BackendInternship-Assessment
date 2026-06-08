import { useEffect, useState } from "react";

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../services/eventService";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    capacity: "",
  });

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await getEvents(token);

      setEvents(response.data);
    } catch (err) {
      setMessage("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      location: "",
      event_date: "",
      capacity: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      const payload = {
        ...formData,
        capacity: formData.capacity === "" ? null : Number(formData.capacity),
      };

      if (editingId) {
        await updateEvent(editingId, payload, token);

        setMessage("Event updated successfully");
      } else {
        await createEvent(payload, token);

        setMessage("Event created successfully");
      }

      resetForm();
      fetchEvents();
    } catch (err) {
      setMessage(err.response?.data?.detail || "Operation failed");
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);

    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      event_date: event.event_date.slice(0, 16),
      capacity: event.capacity ?? "",
    });
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("access_token");

      await deleteEvent(eventId, token);

      setMessage("Event deleted successfully");

      fetchEvents();
    } catch (err) {
      setMessage(err.response?.data?.detail || "Delete failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.2rem",
          marginBottom: "1.5rem",
          color: "#0f172a",
        }}
      >
        Admin Events
      </h1>

      {message && (
        <p
          style={{
            background: "#dbeafe",
            color: "#1e40af",
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "1rem",
          marginBottom: "2rem",
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          style={inputStyle}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="datetime-local"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "0.9rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {editingId ? "Update Event" : "Create Event"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              background: "#e5e7eb",
              border: "none",
              padding: "0.9rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2
        style={{
          marginBottom: "1rem",
        }}
      >
        Existing Events
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              width: "380px",
              boxSizing: "border-box",
              background: "#ffffff",
              padding: "1.5rem",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#0f172a",
              }}
            >
              {event.title}
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.5",
              }}
            >
              {event.description}
            </p>

            <p>📍 {event.location}</p>

            <p>📅 {new Date(event.event_date).toLocaleString()}</p>

            <p>👥 Capacity: {event.capacity ?? "Unlimited"}</p>

            <p>📊 Registrations: {event.registrations_count}</p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={() => handleEdit(event)}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(event.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "0.9rem",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "0.95rem",
};
