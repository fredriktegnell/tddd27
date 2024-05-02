const API_BASE_URL = "http://localhost:5001/api";

export const fetchTableStandings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/table-standings`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching table:", error);
    return [];
  }
};
