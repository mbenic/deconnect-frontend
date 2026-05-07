import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config";

export const ChoicesContext = createContext();

export function ChoicesProvider({ children }) {

  const [choices, setChoices] = useState({
    city: [],
    type: [],
    budget: [],
    timeline: [],
    stage: [],
    skills: [],
    industries: [],
    vibes: [],
    levels: [],
    availabilities: [],
    work_preferences: [],
  });

  useEffect(() => {
  const fetchChoices = async () => {
    try {
      const res = await fetch(`${API_URL}/choices/`);
      const data = await res.json();
      setChoices(data);
    } catch (err) {
      console.error("Failed to load choices:", err);
    }
  };

  fetchChoices();
}, []);

  return (
    <ChoicesContext.Provider value={choices}>
      {children}
    </ChoicesContext.Provider>
  );
}