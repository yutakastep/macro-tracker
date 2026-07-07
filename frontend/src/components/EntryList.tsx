import type { FoodEntry } from "../types";
import { useState } from "react";

type EntryListProps = {
  entries: FoodEntry[];

  onDelete: (
    id: number
  ) => void;

  onUpdate: (
    id: number,
    servings: number
  ) => void;
};

export default function EntryList({
  entries,
  onDelete,
  onUpdate
}: EntryListProps) {
    const [editingId, setEditingId] =
      useState<number | null>(null);

    const [editedServings,
      setEditedServings] =
      useState("");

  return (
    <>
      <h2>Today's Entries</h2>

      {entries.map((entry) => (
        <div key={entry.id}>

          {editingId === entry.id ? (

            <>
              <input
                value={editedServings}
                onChange={(e) =>
                  setEditedServings(
                    e.target.value
                  )
                }
              />

              <button
                onClick={() => {
                  onUpdate(
                    entry.id,
                    Number(
                      editedServings
                    )
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
              {entry.name}
              {" - "}
              {entry.servings}
              {" servings "}

              <button
                onClick={() => {
                  setEditingId(
                    entry.id
                  );

                  setEditedServings(
                    String(
                      entry.servings
                    )
                  );
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(
                    entry.id
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