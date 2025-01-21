export type Transaction = {
  _id: string;
  user: string;
  account: any;
  category: any;
  subcategory?: string;
  amount: number;
  type: string;
  date: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
