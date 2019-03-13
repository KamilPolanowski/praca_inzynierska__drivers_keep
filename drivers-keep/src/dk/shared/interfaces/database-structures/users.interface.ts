export interface DatabaseUsers {
  users: DatabaseUser[];
}

export interface DatabaseUser {
  email: string;
  phoneNumber: string;
  kind: string;
}

export interface UserInfoForRegister {
  key: string;
  toRegister: DatabaseUser;
}
