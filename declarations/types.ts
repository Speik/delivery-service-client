export type OrderValues = {
  phone: string;
  name: string;
  paymentMethod: PaymentMethod | null;
  orderType: OrderType | null;
  address: string;
  comment: string;
};
