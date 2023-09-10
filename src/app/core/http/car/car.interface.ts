export interface GetCarsOut {
  [index: number]: {
    id: number;
    car_id: string;
    hp: string;
    price: string;
    color: string;
    instock: boolean;
  };
}

export interface GetCarOut {
  id: number;
  car_id: string;
  hp: string;
  price: string;
  color: string;
  instock: boolean;
}

export interface EditCarIn {
  car_id: string;
  hp: string;
  price: string;
  color: string;
  instock: boolean;
}
