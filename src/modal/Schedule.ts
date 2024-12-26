/** @format */

import {Product} from "./Product";
import {User} from "./User";

export type Schedule = {
  id: string;
  dayOfWeek: string;
  product: Product;
  user: User;
  time: string;
  startDate: string;
  endDate: string;
  duration: number;
};
