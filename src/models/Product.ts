export type ProductCategory =
  | 'mobiliario'
  | 'sagrada'
  | 'decoracao'
  | 'sazonal';
export type TagVariant = 'green' | 'yellow';

export interface Product {
  id: string;
  cat: ProductCategory;
  catLabel: string;
  wood: string;
  name: string;
  price: string;
  priceNote: string;
  tag?: string;
  tagVariant?: TagVariant;
  placeholder: string;
}
