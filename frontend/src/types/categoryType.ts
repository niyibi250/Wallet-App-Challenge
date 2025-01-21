interface Subcategory {
    name: string;
  }
  
  export interface Category {
    _id: string;
    userId: string;
    categoryName: string;
    subcategories: Subcategory[];
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
    __v: number;
  }
  