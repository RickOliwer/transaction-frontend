import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Transactions from "./components/transactions";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    </>
  );
}

export default App;
