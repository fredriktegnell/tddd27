// src/api/results.ts
const API_BASE_URL = "http://localhost:5001/api";



export const fetchAllGameweeks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/all-gameweeks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return [];
  }
}

export const fetchGameweek = async (week: Number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gameweek/${week}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return [];
  }
}

export const fetchFutureGameweek = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/future-gameweeks`);
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching future fixtures: ", error);
    return [];
  }
}

export const fetchTeam = async (teamID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${teamID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return [];
  }
}

export const fetchStandings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/teamStandings`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return [];
  }
}

export const fetchGame = async (week: number, id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gameweek/${week}/${id}`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching game:", error);
    return null;
  }
}

