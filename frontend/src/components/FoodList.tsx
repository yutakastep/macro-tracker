import { useState } from "react";
import type { Food } from "../types";

type FoodListProps = {
  foods: Food[];

  onDelete: (
    id: number
  ) => void;

  onUpdate: (
    id: number,
    food: Food
  ) => void;
};

export default function FoodList({
  foods,
  onDelete,
  onUpdate,
}: FoodListProps) {
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editedFood,
    setEditedFood] =
    useState<Food | null>(null);

  return (
    <>
      <h2>Foods</h2>

      {foods.map((food) => (
        <div key={food.id}>

          {editingId === food.id ? (

            <>
              <input
                value={editedFood?.name ?? ""}
                onChange={(e) =>
                  setEditedFood({
                    ...editedFood!,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={
                  editedFood?.calories ?? 0
                }
                onChange={(e) =>
                  setEditedFood({
                    ...editedFood!,
                    calories: e.target.value
                  })
                }
              />

              <button
                onClick={() => {

                  if (!editedFood)
                    return;

                  onUpdate(
                    food.id,
                    editedFood
                  );

                  setEditingId(null);
                }}
              >
                Save
              </button>

              <button
                onClick={() =>
                  setEditingId(null)
                }
              >
                Cancel
              </button>
            </>

          ) : (

            <>
              {food.name}
              {" - "}
              {food.calories}
              {" calories "}

              <button
                onClick={() => {
                  setEditingId(
                    food.id
                  );

                  setEditedFood(
                    food
                  );
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(
                    food.id
                  )
                }
              >
                Delete
              </button>
            </>

          )}

        </div>
      ))}
    </>
  );
}