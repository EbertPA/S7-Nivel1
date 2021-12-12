export interface Presupuesto {
  date: Date;
  name: string;
  customer: string;
  service: [{
    id: string;
    description: string;
    price: number;
    pages?: number;
    languages?: number;
  }];
  total: number;
}
