import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../../utils/getUserRole";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#0f172a",
        color: "white",
      }}
    >
      <Link
        to="/dashboard"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        EventHub
      </Link>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {token ? (
          <>
            <Link
              to="/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>

            {role === "user" && (
              <Link
                to="/my-registrations"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                My Registrations
              </Link>
            )}

            {role === "admin" && (
              <Link
                to="/admin/events"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Admin Events
              </Link>
            )}

            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
