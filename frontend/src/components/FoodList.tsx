import type { Food } from "../types";

type FoodListProps = {
  foods: Food[];
};

export default function FoodList({
  foods,
}: FoodListProps) {
  return (
    <>
      <h2>Foods</h2>

      {foods.map((food) => (
        <div key={food.id}>
          {food.name}
        </div>
      ))}
    </>
  );
}