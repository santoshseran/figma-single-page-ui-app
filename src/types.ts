export type Status = "Active" | "Inactive" | "Pending";
export type Category = "Type A" | "Type B" | "Type C";

export type DataRecord = {
  id: string;
  reviewer: string;
  asofmonth: string; // YYYY-MM
  customerName: string;
  accountNumber: string;
  status: Status;
  approved: boolean;
  category: Category;
  amount: number;
  comments: string;
};

