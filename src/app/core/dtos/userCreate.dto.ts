export interface UserDTO {
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

export interface UserDeleteDto {
  email: string;
}
