import React, { useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import {useDispatch} from "react-redux";
import {incrementPage} from "../store/expensesSlice";

interface Expense {
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

const ExpensesList = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch()

    const loadMore = async (page: number) => {
        try {
            dispatch(incrementPage(page));
            const response = await axios.get('http://localhost:8010/proxy/expenses', {
                params: { page, limit: 10 },
            });
            const newExpenses = response.data.expenses;
            setExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
            setHasMore(response?.data?.pagination?.hasNextPage);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Expenses List</h1>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <ul className="space-y-4">
                    {expenses.map((expense, index) => (
                        <li key={`${expense.id}-${index}`} className="p-4 border rounded shadow">
                            <p>{expense.date} - {expense.category} - {expense.description} - {expense.amount} {expense.currency}</p>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
};

export default ExpensesList;
