import React from "react";

  const tabs = [
    { id: "general", label: "General" },
    { id: "pantalla", label: "Pantalla" },
    { id: "hardware", label: "Hardware" },
    { id: "camara", label: "Cámara" },
    { id: "conectividad", label: "Conectividad" },
  ];

const ProductTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-4 mb-4 border-b pb-1">
    {tabs?.map((tab) => (
      <button
        key={tab.id}
        className={`cursor-pointer pb-1 text-sm font-medium transition-colors ${
          activeTab === tab.id
            ? "text-blue-600"
            : "border-transparent text-gray-600 hover:text-blue-600"
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default ProductTabs;
