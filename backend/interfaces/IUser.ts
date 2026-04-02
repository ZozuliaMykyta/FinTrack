interface IUser {
  id: number | string;
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}
export default IUser;
