import { useEffect, useState } from "react";
import type { 
  DashboardData, 
  FoodEntry, 
} from "./types";

// start react, then:
function App() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);
  
  const [entries, setEntries] =
    useState<FoodEntry[]>([]);

  // send request for dashboard
  useEffect(() => {
    fetch("http://localhost:5000/dashboard/today")
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);
  // backend receives GET, responses come back as JSON

  //send request for food entries
  useEffect(() => {
    fetch("https://localhost:5000/food-entries")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);
  // backend receives GET, responses come back as JSON

  return (
    <div>
      <h1>Macro Tracker</h1>

      {dashboard && (
        <>
          <p>Calories: {dashboard.calories}</p>
          <p>Protein: {dashboard.protein}</p>
          <p>Carbs: {dashboard.carbs}</p>
          <p>Fat: {dashboard.fat}</p>
        </>
      )}

      <h2>Today's Entries</h2>
      
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.name}</p>
          <p>{entry.servings}</p>
        </div>
      ))}
    </div>
  );
}

export default App;