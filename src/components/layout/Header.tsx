import { Download, Moon, Sun, UserCircle } from "lucide-react";
import { useFinance } from "../../context/FinanceContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/Button";

export function Header() {
  const { role, setRole, transactions } = useFinance();
  const { theme, setTheme } = useTheme();

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "transactions.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" || (theme === "system" && document.documentElement.classList.contains("dark")) ? "light" : "dark");
  };

  const toggleRole = () => {
    setRole(role === "Admin" ? "Viewer" : "Admin");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Finance Dashboard</h1>
          <p className="text-xs text-muted-foreground sm:text-sm">Track and manage your finances</p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="outline" size="sm" onClick={handleExport} className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleRole}
            title={`Current Role: ${role}. Click to swap.`}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{role}</span>
          </Button>

          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
