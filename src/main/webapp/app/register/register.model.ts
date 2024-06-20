export class Register {
  constructor(
    public id: number,
    public roles: string[],
    public name: string,
    public surname: string,
    public username: string,
    public email: string,
    public password: string,
    public confirmPassword: string
  ) {}
}
