import React from "react";
import { Routes, Route } from "react-router-dom";
import PageProductList from "../pages/PageProductList";
import ProductDetail from "../pages/PageProductDetail";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PageProductList />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
