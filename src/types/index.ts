export interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface SelectedService extends Service {
  quantity: number;
}