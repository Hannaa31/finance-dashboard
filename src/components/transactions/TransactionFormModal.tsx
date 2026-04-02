import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Transaction, TransactionType } from "../../types/finance";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tx: Omit<Transaction, "id"> | Transaction) => void;
  initialData?: Transaction | null;
}

export function TransactionFormModal({ isOpen, onClose, onSubmit, initialData }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Shopping");
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setType(initialData.type);
      setDate(initialData.date);
    } else {
      setTitle("");
      setDescription("");
      setAmount("");
      setCategory("Shopping");
      setType("expense");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const txData = {
      title,
      description,
      amount: parseFloat(amount),
      category,
      type,
      date,
    };

    if (initialData) {
      onSubmit({ ...txData, id: initialData.id });
    } else {
      onSubmit(txData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-lg sm:p-8 relative">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {initialData ? "Edit Transaction" : "Adding Transaction"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            {initialData ? "Update the details of your transaction below." : "Enter the details for your new transaction."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Title</label>
            <Input 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Groceries" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Description & Location</label>
            <Input 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="e.g. Whole Foods Market" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Amount</label>
              <Input 
                required 
                type="number" 
                step="0.01"
                min="0"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="0.00" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Date</label>
              <Input 
                required 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Type</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Category</label>
              <Input 
                required 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="e.g. Shopping" 
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Save Changes" : "Save Transaction"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
