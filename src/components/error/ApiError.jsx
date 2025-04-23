import React from "react";
import SmartLink from "../layout/SmartLink";

const ApiError = ({ message }) => (
  <div className="flex flex-col justify-center items-center h-64 text-center px-4">
    <svg
      data-testid="error-icon"
      className="w-48 h-48 text-red-500 mb-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.658-1.14 1.105-2.037L13.105 4.063c-.526-.89-1.684-.89-2.21 0L3.977 16.963c-.553.897.051 2.037 1.105 2.037z"
      />
    </svg>
    <p className="text-red-500 mb-2">{message}</p>
    <SmartLink message="Actualizar" to="/" />
  </div>
);

export default ApiError;
