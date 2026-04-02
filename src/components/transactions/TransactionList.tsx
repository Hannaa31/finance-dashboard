import { useState, useEffect } from "react";
import { format } from "date-fns";
import { PencilLine, Trash2, Plus } from "lucide-react";
import { useFinance } from "../../context/FinanceContext";
import { Transaction } from "../../types/finance";
import { formatCurrency } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { TransactionFormModal } from "./TransactionFormModal";

export function TransactionList() {
  const { transactions, role, deleteTransaction, addTransaction, editTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchTerm, filterType]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const filtered = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddClick = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (txData: Omit<Transaction, "id"> | Transaction) => {
    if ("id" in txData) {
      editTransaction(txData as Transaction);
    } else {
      addTransaction(txData);
    }
  };

  return (
    <>
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transactions</CardTitle>
          {role === "Admin" && (
            <Button size="sm" onClick={handleAddClick}>
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <Input 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button 
                variant={filterType === "all" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button 
                variant={filterType === "income" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilterType("income")}
                className={filterType === "income" ? "bg-green-600 hover:bg-green-700 hover:text-white dark:text-white" : ""}
              >
                Income
              </Button>
              <Button 
                variant={filterType === "expense" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilterType("expense")}
                className={filterType === "expense" ? "bg-red-600 hover:bg-red-700 hover:text-white dark:text-white" : ""}
              >
                Expense
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  {role === "Admin" && <th className="px-4 py-3 font-medium text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={role === "Admin" ? 6 : 5} className="py-8 text-center text-muted-foreground">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filtered.slice(0, visibleCount).map((tx) => (
                    <tr key={tx.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">{format(new Date(tx.date), "MMM dd, yyyy")}</td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground">{tx.title}</p>
                        <p className="text-xs text-muted-foreground">{tx.description}</p>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{tx.category}</td>
                      <td className="px-4 py-4">
                        <Badge variant={tx.type === "income" ? "success" : "destructive"}>
                          {tx.type}
                        </Badge>
                      </td>
                      <td className={`px-4 py-4 text-right font-bold whitespace-nowrap ${tx.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                      </td>
                      {role === "Admin" && (
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => handleEditClick(tx)}>
                              <PencilLine className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteTransaction(tx.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > visibleCount && (
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => setVisibleCount(prev => prev + 6)}>
                View More
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTx}
      />
    </>
  );
}
