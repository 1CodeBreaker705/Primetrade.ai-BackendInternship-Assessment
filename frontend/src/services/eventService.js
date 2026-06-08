import api from "./api";

const API_URL =`${import.meta.env.VITE_API_URL}/events`;

export const getEvents = (token) => {
  return api.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createEvent = (
  eventData,
  token
) => {
  return api.post(
    API_URL,
    eventData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateEvent = (
  eventId,
  eventData,
  token
) => {
  return api.put(
    `${API_URL}/${eventId}`,
    eventData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEvent = (
  eventId,
  token
) => {
  return api.delete(
    `${API_URL}/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};