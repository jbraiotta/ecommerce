export interface IProduct {
  id: string;
  name: string;
  avatar: string;
  quantity: number;
  category: string;
  createdAt: Date;
  price: number;
  description: string;
}

export interface IContact {
  id: string;
  name: string;
  createdAt: Date;
  email: string;
  message: string;
}
