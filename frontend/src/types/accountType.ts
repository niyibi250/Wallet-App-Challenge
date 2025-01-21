export interface Account {
    _id: string;
    userId: string;
    accountName: string;
    accountNumber: string;
    accountType: string; // Example values: "MobileMoney", "Bank", etc.
    accountBalance: number;
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
    __v: number;
  }
  