declare interface IAttach {
  originalId: number;
  title: string;
  description?: string;
  done?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
  positiveCount?: number
  negativeCount?: number
}
