import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #0f172a 70%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 90%)",
        }}
      />

      <div
        style={{
          textAlign: "center",
          color: "white",
          zIndex: 1,
          maxWidth: "600px",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
            fontWeight: "700",
          }}
        >
          EventHub
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#cbd5e1",
            marginBottom: "2rem",
          }}
        >
          Manage, create and register for events with secure
          role-based access.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Link to="/login">
            <button
              style={{
                padding: "0.8rem 1.5rem",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "0.8rem 1.5rem",
                border: "1px solid white",
                background: "transparent",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}