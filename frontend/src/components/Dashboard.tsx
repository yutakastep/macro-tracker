type DashboardProps = {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
};

export default function Dashboard({
  calories,
  protein,
  carbs,
  fat,
}: DashboardProps) {
  return (
    <>
      <p>Calories: {calories}</p>
      <p>Protein: {protein}</p>
      <p>Carbs: {carbs}</p>
      <p>Fat: {fat}</p>
    </>
  );
}