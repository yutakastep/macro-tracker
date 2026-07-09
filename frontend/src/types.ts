// tell typescript what object looks like

export interface DashboardData {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface FoodEntry {
  id: number;
  name: string;
  servings: string;
  entry_date: string;
}

export interface Food {
  id: number;
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface GoalData {
  calorie_goal: number;
  protein_goal: number;
}