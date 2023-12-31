export interface User {
  email: string;
  username?: string;
  password: string;
  description?: string;
  profileImage? : ArrayBuffer | undefined;
}
