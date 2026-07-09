type DashboardProps = {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;

  goalCalories: number;
  goalProtein: number;
};

export default function Dashboard({
  calories,
  protein,
  carbs,
  fat,
  goalCalories,
  goalProtein,
}: DashboardProps) {
  return (
    <>
      <p>
        Calories:
        {" "}
        {calories}
        {" / "}
        {goalCalories}
      </p>

      <p>
        Protein:
        {" "}
        {protein}
        {" / "}
        {goalProtein}
      </p>
      <p>Carbs: {carbs}</p>
      <p>Fat: {fat}</p>
    </>
  );
}