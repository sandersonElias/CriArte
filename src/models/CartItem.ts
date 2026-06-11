export interface CartItem {
  id: string;
  name: string;
  price: string; // ex: "R$ 1.260"
  priceValue: number; // valor numérico para cálculo
  imageUrl?: string;
  catLabel: string;
  quantity: number;
}
