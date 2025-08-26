
export type Transaction = {
  id: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  amount: number; 
  date: string; 
  createdAt?: string;
  updatedAt?: string;
};

export type Goal = {
  id: number;
  name: string;
  target: number;
  saved: number;
  createdAt?: string;
  updatedAt?: string;
};
