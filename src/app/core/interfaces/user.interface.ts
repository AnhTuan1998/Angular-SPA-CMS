export interface UserInterface {
  account_number: number,
  balance: number,
  firstname: string,
  lastname: string,
  age: number,
  gender: string,
  address: string,
  employer: string,
  email: string,
  city: string,
  state: string
}

export class ModelUserInterface {
  account_number: number;
  balance: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string
  address: string;
  employer: string;
  email: string;
  city: string;
  state: string
}
