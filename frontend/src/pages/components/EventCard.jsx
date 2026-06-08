import { getUserRole } from "../../utils/getUserRole";

export default function EventCard({ event, onRegister, onCancel }) {
  const role = getUserRole();

  return (
    <div
      style={{
        width: "400px",
        minWidth: "400px",
        maxWidth: "400px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "1.5rem",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "1.35rem",
          color: "#0f172a",
        }}
      >
        {event.title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#64748b",
          lineHeight: "1.5",
        }}
      >
        {event.description}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          marginTop: "0.5rem",
        }}
      >
        <p style={{ margin: 0 }}>
          📍 <strong>Location:</strong> {event.location}
        </p>

        <p style={{ margin: 0 }}>
          📅 <strong>Date:</strong>{" "}
          {new Date(event.event_date).toLocaleString()}
        </p>

        <p style={{ margin: 0 }}>
          👥 <strong>Capacity:</strong> {event.capacity ?? "Unlimited"}
        </p>

        <p style={{ margin: 0 }}>
          📊 <strong>Registrations:</strong> {event.registrations_count}
        </p>
      </div>

      {role === "user" && (
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginTop: "1rem",
            alignItems: "center",
          }}
        >
          <button
            disabled={event.is_registered}
            onClick={() => onRegister(event.id)}
            style={{
              flex: 1,
              padding: "0.85rem",
              border: "none",
              borderRadius: "10px",
              cursor: event.is_registered ? "default" : "pointer",
              background: event.is_registered ? "#16a34a" : "#2563eb",
              color: "white",
              fontWeight: "600",
              fontSize: "0.95rem",
              opacity: event.is_registered ? 0.9 : 1,
            }}
          >
            {event.is_registered ? "✓ Registered" : "Register"}
          </button>

          {event.is_registered && (
            <button
              onClick={() => onCancel(event.id)}
              style={{
                padding: "0.85rem 1rem",
                border: "none",
                borderRadius: "10px",
                background: "#111827",
                color: "white",
                cursor: "pointer",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}
