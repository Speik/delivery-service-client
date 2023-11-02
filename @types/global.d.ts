type PaymentMethod = import('~/declarations').PaymentMethod;
type OrderType = import('~/declarations').OrderType;
type OrderStatus = import('~/declarations').OrderStatus;

interface ICategory {
  id: string;
  name: string;
}

interface IDish {
  id: string;
  name: string;
  price: string;
  category: ICategory | null;
  image: string | null;
  description: string | null;
}

interface ICustomer {
  id: string;
  customerNumber: number;
  name: string;
  phone: string;
  address: string | null;
  preferredOrder: OrderType;
  preferredPayment: PaymentMethod;
}

interface IOrder {
  id: string;
  customer: ICustomer;
  orderNumber: number;
  type: OrderType;
  paymentMethod: PaymentMethod;
  dishes: IDish[];
  price: number;
  status: OrderStatus;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}