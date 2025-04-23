import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <CartProvider>
      <ProductProvider>
        <>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-4 pt-25">
              <AppRoutes />
            </main>
          </div>
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        </>
      </ProductProvider>
    </CartProvider>
  );
};

export default App;
