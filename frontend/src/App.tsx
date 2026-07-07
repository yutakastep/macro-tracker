import Dashboard from "./components/Dashboard";
import FoodList from "./components/FoodList";
import EntryList from "./components/EntryList";
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
  
  const loadDashboard = async () => {
    const response =
      await fetch(
        "http://localhost:5000/dashboard/today"
      );

    const data =
      await response.json();

    setDashboard(data);
  };

  const loadEntries = async () => {
    const response = await fetch(
      "http://localhost:5000/food-entries"
    );

    const data = await response.json();

    setEntries(data);
  };

  const handleDeleteEntry =
  async (id: number) => {

    const response =
      await fetch(
        `http://localhost:5000/food-entries/${id}`,
        {
          method: "DELETE",
        }
      );

    if (!response.ok) {
      alert("Failed to delete entry");
      return;
    }

    await loadEntries();
    await loadDashboard();
  };
  
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

  // save what food was selected
  const [selectedFoodId, setSelectedFoodId] =
    useState("");
  
  // save serving count
  const [servings, setServings] = 
    useState("");

  // send request for dashboard
  useEffect(() => {
    loadDashboard();
  }, []);
  // backend receives GET, responses come back as JSON

  //send request for food entries
  useEffect(() => {
    loadEntries();
  }, []);
  // backend receives GET, responses come back as JSON

  useEffect(() => {
    fetch("http://localhost:5000/foods")
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

  const handleAddEntry = async () => {
    const today = 
      new Date()  // creates 2026-06-26T14:20:31.000Z
        .toISOString()
        .split("T")[0];
      
    const response = await fetch(
      "http://localhost:5000/food-entries",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          foodId: Number(selectedFoodId),
          servings: Number(servings),
          entryDate: today,
        }),
      }
    );

    if (!response.ok) {
      alert("Failed to add entry")
      return;
    }

    await loadEntries();
    await loadDashboard();

    setServings("");
    setSelectedFoodId("");
  }


  return (
    <div>
      <h1>Macro Tracker</h1>

      {dashboard && (
        <Dashboard
          calories={dashboard.calories}
          protein={dashboard.protein}
          carbs={dashboard.carbs}
          fat={dashboard.fat}
        />
      )}

      <EntryList
        entries={entries}
        onDelete={handleDeleteEntry}
      />

      <FoodList foods={foods} />

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

      <input
        type="number"
        placeholder="Servings"
        value={servings}
        onChange={(e) =>
          setServings(e.target.value)
        }
      />

      <button onClick={handleAddEntry}>Add Entry</button>

    </div>
  );
}

export default App;