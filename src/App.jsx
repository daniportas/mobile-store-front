import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 pt-25">
          <AppRoutes />
        </main>
      </div>
    </>
  );
};

export default App;
