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
  
  const caloriePercent =
    goalCalories > 0
      ? Math.round((Number(calories) / goalCalories) * 100): 0;

  const proteinPercent =
    goalProtein > 0
      ? Math.round((Number(protein) / goalProtein) * 100): 0;
  
  return (
    <>
      <p>
        Calories:
        {calories}
        /
        {goalCalories}
        (
        {caloriePercent}
        %)
      </p>

      <p>
        Protein:
        {protein}
        /
        {goalProtein}
        (
        {proteinPercent}
        %)
      </p>
      <p>Carbs: {carbs}</p>
      <p>Fat: {fat}</p>
    </>
  );
}