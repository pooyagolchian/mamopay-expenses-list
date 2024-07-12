export interface Expense {
    id: string;
    date: string;
    category: string;
    description: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: string;
    receiptAttached: boolean;
}

export interface ExpensesState {
    expenses: Expense[];
    page: number;
    hasMore: boolean;
}
