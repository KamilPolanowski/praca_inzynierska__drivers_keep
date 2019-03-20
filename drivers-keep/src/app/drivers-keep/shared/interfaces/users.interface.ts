export interface DatabaseUsers {
  users: DatabaseUser[];
}

export interface DatabaseUser {
  email?: string;
  phoneNumber?: string;
  kind?: UserKinds;
  name?: string;
  surname?: string;
  additional_duties?: DriverDuties | WarehouseDuties | AdminDuties;
}

export interface DriverDuties {
  assigned_zipcodes: string;
}

export interface WarehouseDuties {
  [prop: string]: string;
}

export interface AdminDuties {
  [prop: string]: string;
}

export interface UserInfoForRegister {
  key: string;
  toRegister: DatabaseUser;
}

export interface UserCredentials {
  uid: string;
  permission: UserKinds;
}

export const enum UserKinds {
  Awaits = 'do-przydzialu',
  Admin = 'admin',
  Magazynier = 'mag',
  Pracownik = 'pracownik'
}
