import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BetProvider } from "./ContextAndHooks/BetContext";
import { AuthProvider } from "./ContextAndHooks/AuthContext";
import App from "./App";
import "./other.css";
import "./styles.css";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <BetProvider>
          <App />
        </BetProvider>
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={true}
      closeOnClick
      draggable
      pauseOnHover
      theme="colored"
      transition={Flip}
    />
  </StrictMode>
);
