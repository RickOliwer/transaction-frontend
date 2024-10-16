import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="m-auto max-w-[1800px] px-4 lg:px-20 py-20 dark bg-background">
        <App />
      </main>
    </QueryClientProvider>
  </StrictMode>
);
