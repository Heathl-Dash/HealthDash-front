declare interface IHabit {
  habit_id: number;
  user_id: number;
  title: string;
  description: string;
  positive: boolean;
  negative: boolean;
  positive_count: number;
  negative_count: number;
  created: string;
}
