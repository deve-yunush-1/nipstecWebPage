/** @format */

const transactionMethodOptions = {
  bank: [
    {value: "transfer", label: "Bank Transfer"},
    {value: "cheque", label: "Cheque"},
  ],
  card: [
    {value: "credit", label: "Credit Card"},
    {value: "debit", label: "Debit Card"},
  ],
  cash: [
    {value: "cash", label: "Cash Payment"},
    {value: "coin", label: "Coins"},
  ],
} as const;

export type ModeOfPayment = keyof typeof transactionMethodOptions; // 'bank' | 'card' | 'cash'
