import type { FoodEntry } from "../types";

type EntryListProps = {
  entries: FoodEntry[];
  onDelete: (id: number) => void;
};

export default function EntryList({
  entries,
  onDelete,
}: EntryListProps) {
  return (
    <>
      <h2>Today's Entries</h2>

      {entries.map((entry) => (
        <div key={entry.id}>
          {entry.name}
          {" - "}
          {entry.servings}
          {" servings "}

          <button
            onClick={() =>
              onDelete(entry.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}