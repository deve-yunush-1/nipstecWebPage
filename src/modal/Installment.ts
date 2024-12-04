/** @format */

import {Product} from "./Product";
import {User} from "./User";

export type Installment = {
  dbEnrollment: {
    registration_number: string;
    user: User;
  };
  amountPaid: number;
  paymentDateTime: string;
  paymentMethod: string;
  paymentMode: string;
  transParticular: string;
  dueAmount: number;
  status: string;
  receiptNumber: string;
};

export type DbEnrollment = {
  id: Number;
  totalFee: number;
  balanceFee: number;
  user: User;
  product: Product;
  status: string;

  createdAt: string;

  registration_number: string;
};
