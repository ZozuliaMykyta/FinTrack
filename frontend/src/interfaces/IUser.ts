interface IUser {
  id: number | string;
  name: string;
  email: string;
  password: string;
  jwtToken: string;
}
export default IUser;
