/** @format */

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  status: string;
  registration_number: string;
  qualification: string;
  password: string;
  identification: Identity;
  address: UserAddress;
  createdAt: string;
  approvedAt: string;
  updatedAt: string;
};
export type Identity = {
  number: string;
  identityCard: string;
};
export type UserAddress = {
  currentAddress: Address;
  permanentAddress: Address;
};
export type Address = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  nationality: string;
};
