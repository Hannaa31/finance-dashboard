import { Header } from "./Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
