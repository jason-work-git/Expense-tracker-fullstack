export interface CategoryType {
  _id: string;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ExpenseType {
  _id: string;
  userId: number;
  amount: number;
  description: string;
  date: string;
  categoryId: CategoryType;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}