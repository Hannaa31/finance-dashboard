# Finance Dashboard

A modern, responsive, and interactive Personal Finance Dashboard built with React, TypeScript, and Tailwind CSS. This application allows users to monitor their financial health, visualize spending habits, and manage their transactions seamlessly.

## 🚀 Live Demo

[Link to Live Deployment](https://finance-dashboard-three-rho.vercel.app/) 

## ✨ Key Features

This project demonstrates strong frontend engineering skills, specifically in building robust user interfaces, managing complex states, and integrating data visualizations.

*   **Financial Overview:** Instant snapshot of Total Balance, Total Income, and Total Expenses with clean, metric-driven summary cards.
*   **Data Visuzalition:** 
    *   Interactive Line Chart for tracking balance over time.
    *   Responsive Pie Chart for breaking down categorical spending (optimized for both desktop and mobile views).
    *   Powered by `recharts`.
*   **Transaction Management:**
    *   Complete CRUD (Create, Read, Update, Delete) capability for transactions.
    *   Smart filtering by type (Income vs. Expense) and a dynamic search bar.
    *   Client-side pagination (Show default 6, load more on demand).
*   **Role-Based Access Control (RBAC):** Simulated Admin and Viewer roles. Only Admins can modify data (Add, Edit, Delete), while Viewers have read-only access.
*   **Persistent Storage:** Data is stored locally using the browser's `localStorage` to ensure persistence across page reloads.
*   **Responsive & Polished UI:** Built with an emphasis on a premium user experience, featuring dark/light mode adaptable colors, glassmorphic hints, and full mobile reactivity.

## 🛠️ Tech Stack

*   **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for strong typing and error reduction.
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for rapid, utility-first styling and robust responsive design.
*   **Charts:** [Recharts](https://recharts.org/) for declarative, responsive, and customizable SVG charts.
*   **Icons:** [Lucide React](https://lucide.dev/) for crisp, consistent iconography.
*   **State Management:** React Context API and Hooks (`useState`, `useEffect`).

## 🧠 Technical Highlights 

*   **Component Architecture:** Code is broken down into small, reusable UI components (`Card`, `Button`, `Badge`, `Input`) separating presentational elements from business logic.
*   **Custom Hooks & Context:** Uses a centralized `FinanceContext` to manage global state (transactions, user role), preventing prop drilling.
*   **Data Transformation:** Implements utility functions to parse and format raw transaction data into structures digestible by charting libraries.
*   **Mobile-First Adaptability:** specifically addressed responsive rendering issues (like optimizing charting radii and dynamic flex-box wrapping constraints) to ensure perfect usability on small devices.

## 💻 Running the Project Locally

If you'd like to inspect the code and run it on your own machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Hannaa31/finance-dashboard.git
    cd finance-dashboard
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4. Open your browser and navigate to `http://localhost:5173`.
