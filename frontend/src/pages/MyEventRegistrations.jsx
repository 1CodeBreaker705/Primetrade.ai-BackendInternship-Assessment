import { useEffect, useState } from "react";

import {
  getMyRegistrations,
} from "../services/eventRegistrationService";

const MyEventRegistrations = () => {
  const [registrations, setRegistrations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  
  const fetchRegistrations =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "access_token"
          );

        const response =
          await getMyRegistrations(
            token
          );

        setRegistrations(
          response.data
        );
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Failed to load registrations"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchRegistrations();
  }, []);


  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <h1
        style={{
          marginBottom: "2rem",
        }}
      >
        My Registrations
      </h1>

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      {registrations.length === 0 ? (
        <p>
          No registrations found.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
        >
          {registrations.map(
            (registration, index) => (
              <div
                key={index}
                style={{
                  background:
                    "white",
                  padding:
                    "1rem",
                  borderRadius:
                    "10px",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <h3>
                  {
                    registration.title
                  }
                </h3>

                <p>
                  📍{" "}
                  {
                    registration.location
                  }
                </p>

                <p>
                  Event Date:{" "}
                  {new Date(
                    registration.event_date
                  ).toLocaleString()}
                </p>

                <p>
                  Registered On:{" "}
                  {new Date(
                    registration.registered_at
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MyEventRegistrations;