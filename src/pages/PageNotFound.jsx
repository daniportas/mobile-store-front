import React from "react";
import SmartLink from "../components/layout/SmartLink";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-2">Página no encontrada</p>
      <p className="text-sm text-gray-500 mb-4">
        Lo sentimos, la página que buscas no existe.
      </p>

      <SmartLink to="/" message="Volver al inicio" />
    </div>
  );
};

export default PageNotFound;
