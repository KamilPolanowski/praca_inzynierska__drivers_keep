export interface DatabaseUsers {
  users: DatabaseUser[];
}

export interface DatabaseUser {
  email?: string;
  phoneNumber?: string;
  kind?: UserKinds;
  name?: string;
  surname?: string;
}

export interface UserInfoForRegister {
  key: string;
  toRegister: DatabaseUser;
}

export const enum UserKinds {
  Awaits = 'do-przydzialu',
  Admin = 'admin',
  Magazynier = 'mag',
  Pracownik = 'pracownik'
}
