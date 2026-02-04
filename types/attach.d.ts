declare interface IAttach {
  id: number;
  title: string;
  description?: string;
  done?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
  positiveCount?: number
  negativeCount?: number
}
