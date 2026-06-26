import { useEffect, useState } from "react";
import type { 
  DashboardData, 
  FoodEntry, 
  Food,
} from "./types";

// start react, then:
function App() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);
  
  const [entries, setEntries] =
    useState<FoodEntry[]>([]);
  
  const [foods, setFoods] =
    useState<Food[]>([]);

  const [name, setName] = 
    useState("");

  const [calories, setCalories] = 
    useState("");

  const [protein, setProtein] = 
    useState("");

  const [carbs, setCarbs] = 
    useState("");

  const [fat, setFat] = 
    useState("");

  const [selectedFoodId, setSelectedFoodId] =
    useState("");
  
  const [servings, setServings] = 
    useState("");

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

  useEffect(() => {
    fetch("https://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  const handleAddFood = async () => {
    const response = await fetch(
      "http://localhost:5000/foods",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          calories: Number(calories),
          protein: Number(protein),
          carbs: Number(carbs),
          fat: Number(fat),
        }),
      }
    );

    if (!response.ok) {
      alert("Failed to create food");
      return;
    }

    const newFood =
      await response.json();
    
    setFoods([
      ...foods,
      newFood,
    ]);

    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };


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

      <h2>Foods</h2>

      {foods.map((food) => (
        <div key={food.id}>
          {food.name}
        </div>
      ))}

      <h2>Add Food</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Calories"
        value={calories}
        onChange={(e) =>
          setCalories(e.target.value)
        }
      />

      <input
        placeholder="Protein"
        value={protein}
        onChange={(e) =>
          setProtein(e.target.value)
        }
      />

      <input
        placeholder="Carbs"
        value={carbs}
        onChange={(e) =>
          setCarbs(e.target.value)
        }
      />

      <input
        placeholder="Fat"
        value={fat}
        onChange={(e) =>
          setFat(e.target.value)
        }
      />

      <button onClick={handleAddFood}>
        Add Food
      </button>
      
      <h2>Log Food</h2>

      <select
        value={selectedFoodId}
        onChange={(e) => 
          setSelectedFoodId(e.target.value)
        }
      >
        <option value="">
          Select a food
        </option>

        {foods.map((food) => (
          <option
            key={food.id}
            value={food.id}
          >
            {food.name}
          </option>
        ))}
      </select>

    </div>
  );
}

export default App;