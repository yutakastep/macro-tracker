import type { FoodEntry } from "../types";

type EntryListProps = {
  entries: FoodEntry[];
};

export default function EntryList({
  entries,
}: EntryListProps) {
  return (
    <>
      <h2>Today's Entries</h2>

      {entries.map((entry) => (
        <div key={entry.id}>
          {entry.name} : {entry.servings} servings
        </div>
      ))}
    </>
  );
}