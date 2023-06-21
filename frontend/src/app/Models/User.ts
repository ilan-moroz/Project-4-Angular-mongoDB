export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public idNumber: number;
  public password: string;
  public city: string;
  public street: string;
  public role: string;
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    idNumber: number,
    password: string,
    city: string,
    street: string,
    role: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.idNumber = idNumber;
    this.password = password;
    this.city = city;
    this.street = street;
    this.role = role;
  }
}
