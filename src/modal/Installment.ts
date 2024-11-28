/** @format */

import {User} from "./User";

export type Installment = {
  dbEnrollment: DbEnrollment;
  amountPaid: number;
  paymentDateTime: string;
  paymentMethod: string;
  paymentMode: string;
  transParticular: string;
  dueAmount: number;
  status: string;
};

export type DbEnrollment = {
  totalFee: number;
  balanceFee: number;
  user: User;
  product: Product;
  status: string;

  createdAt: string;

  registration_number: string;
};

export type Product = {
  title: string;
  price: number;
  description: string;
  sullabus: string;
  category: string;
};
