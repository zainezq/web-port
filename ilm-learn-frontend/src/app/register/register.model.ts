export class Register {
  constructor(
    public id: number,
    public roles: string[],
    public firstName: string,
    public surname: string,
    public username: string,
    public password: string,
    public confirmPassword: string,
    public email: string,
    public phoneNumber: string
  ) {}
}
