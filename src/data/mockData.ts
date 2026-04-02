import { Transaction } from "../types/finance";

// Generate unique IDs
const uid = () => Math.random().toString(36).substr(2, 9);

export const initialTransactions: Transaction[] = [
  // Apr 2026
  { id: uid(), date: "2026-04-05", title: "Freelance project payment", description: "Design work", category: "Freelance", type: "income", amount: 200000.00 },
  { id: uid(), date: "2026-04-02", title: "Monthly salary payment", description: "Company Inc.", category: "Salary", type: "income", amount: 380000.00 },
  { id: uid(), date: "2026-04-10", title: "Groceries purchase", description: "Whole Foods", category: "Groceries", type: "expense", amount: 25000.00 },
  { id: uid(), date: "2026-04-15", title: "Transportation purchase", description: "Public Transit", category: "Transportation", type: "expense", amount: 9800.00 },
  
  // Mar 2026 (Huge increase as per chart)
  { id: uid(), date: "2026-03-25", title: "Investment returns", description: "Stock Sale", category: "Investment", type: "income", amount: 1100000.00 },
  { id: uid(), date: "2026-03-20", title: "Bonus payment", description: "Annual Bonus", category: "Salary", type: "income", amount: 800000.00 },
  { id: uid(), date: "2026-03-15", title: "Shopping purchase", description: "Amazon", category: "Shopping", type: "expense", amount: 33000.00 },
  { id: uid(), date: "2026-03-10", title: "Travel purchase", description: "Airbnb", category: "Travel", type: "expense", amount: 95000.00 },
  { id: uid(), date: "2026-03-02", title: "Monthly salary payment", description: "Company Inc.", category: "Salary", type: "income", amount: 380000.00 },

  // Feb 2026
  { id: uid(), date: "2026-02-28", title: "Utilities", description: "Electric Bill", category: "Bills & Utilities", type: "expense", amount: 12000.00 },
  { id: uid(), date: "2026-02-20", title: "Dining out", description: "Local Restaurant", category: "Food & Dining", type: "expense", amount: 9500.00 },
  { id: uid(), date: "2026-02-15", title: "Education purchase", description: "Online Course", category: "Education", type: "expense", amount: 23500.00 },
  { id: uid(), date: "2026-02-02", title: "Monthly salary payment", description: "Company Inc.", category: "Salary", type: "income", amount: 380000.00 },
  
  // Jan 2026
  { id: uid(), date: "2026-01-25", title: "Shopping purchase", description: "Walmart", category: "Shopping", type: "expense", amount: 16000.00 },
  { id: uid(), date: "2026-01-20", title: "Groceries purchase", description: "Local Market", category: "Groceries", type: "expense", amount: 16000.00 },
  { id: uid(), date: "2026-01-02", title: "Monthly salary payment", description: "Company Inc.", category: "Salary", type: "income", amount: 380000.00 },
  
  // Dec 2025
  { id: uid(), date: "2025-12-18", title: "Holiday gifts", description: "Amazon", category: "Shopping", type: "expense", amount: 64000.00 },
  { id: uid(), date: "2025-12-15", title: "Entertainment purchase", description: "Concert Tickets", category: "Entertainment", type: "expense", amount: 36000.00 },
  { id: uid(), date: "2025-12-02", title: "Monthly salary payment", description: "Company Inc.", category: "Salary", type: "income", amount: 380000.00 },

  // Nov 2025
  { id: uid(), date: "2025-11-20", title: "Freelance project payment", description: "Web Dev", category: "Freelance", type: "income", amount: 250000.00 },
  { id: uid(), date: "2025-11-10", title: "Dining out", description: "Starbucks", category: "Food & Dining", type: "expense", amount: 6800.00 },
  { id: uid(), date: "2025-11-02", title: "Monthly salary payment", description: "Company Inc.", category: "Salary", type: "income", amount: 380000.00 },

  // Older entries to set base balance
  { id: uid(), date: "2025-10-15", title: "Initial Balance Setup", description: "Savings Transfer", category: "Investment", type: "income", amount: 1200000.00 },
];
