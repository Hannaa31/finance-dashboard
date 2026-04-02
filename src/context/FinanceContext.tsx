import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Transaction, TransactionType } from "../types/finance";
import { initialTransactions } from "../data/mockData";

export type Role = "Viewer" | "Admin";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  editTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  
  // Derived state
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "finance-dashboard-data-inr";
const ROLE_STORAGE_KEY = "finance-dashboard-role";

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem(ROLE_STORAGE_KEY) as Role) || "Admin";
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage data", e);
        return initialTransactions;
      }
    }
    return initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);
  };

  const addTransaction = (txData: Omit<Transaction, "id">) => {
    const newTx: Transaction = {
      ...txData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const editTransaction = (updatedTx: Transaction) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const { totalIncome, totalExpenses, totalBalance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach((t) => {
      if (t.type === "income") inc += t.amount;
      else exp += t.amount;
    });
    return {
      totalIncome: inc,
      totalExpenses: exp,
      totalBalance: inc - exp,
    };
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        editTransaction,
        deleteTransaction,
        totalBalance,
        totalIncome,
        totalExpenses,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
