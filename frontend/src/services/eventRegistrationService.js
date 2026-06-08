import api from "./api";

const API_URL =`${import.meta.env.VITE_API_URL}/events`;

export const registerForEvent = (
  eventId,
  token
) => {
  return api.post(
    `${API_URL}/${eventId}/register`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMyRegistrations = (
  token
) => {
  return api.get(
    `${API_URL}/my-registrations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const cancelRegistration = (eventId,token) => {
  return api.delete(
    `${API_URL}/${eventId}/unregister`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};