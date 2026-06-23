import { useEffect, useState } from "react";
import type { DashboardData } from "./types";

function App() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard/today")
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

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
    </div>
  );
}

export default App;