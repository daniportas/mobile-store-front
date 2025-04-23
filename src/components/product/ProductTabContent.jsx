import React from "react";

const formatValue = (value) => {
  if (!value || value === "") return "-";
  return Array.isArray(value) ? value.join(", ") : value;
};

const ProductTabContent = React.memo(({ product, activeTab }) => {
  const section = {
    general: [
      ["Marca", product.brand],
      ["Modelo", product.model],
      ["Precio", product.price ? `${product.price} €` : "No disponible"],
      ["Dimensiones", formatValue(product.dimentions)],
      ["Peso", `${formatValue(product.weight)} g`],
      ["SIM", formatValue(product.sim)],
      ["Batería", formatValue(product.battery)],
    ],
    pantalla: [
      ["Tipo", formatValue(product.displayType)],
      ["Tamaño", formatValue(product.displaySize)],
      ["Resolución", formatValue(product.displayResolution)],
    ],
    hardware: [
      ["Sistema operativo", formatValue(product.os)],
      ["CPU", formatValue(product.cpu)],
      ["Chipset", formatValue(product.chipset)],
      ["GPU", formatValue(product.gpu)],
      ["RAM", formatValue(product.ram)],
      ["Almacenamiento interno", formatValue(product.internalMemory)],
      ["Almacenamiento externo", formatValue(product.externalMemory)],
    ],
    camara: [
      ["Cámara principal", formatValue(product.primaryCamera)],
      ["Cámara secundaria", formatValue(product.secondaryCmera)],
    ],
    conectividad: [
      ["Red", formatValue(product.networkTechnology)],
      ["Velocidad", formatValue(product.networkSpeed)],
      ["Wi-Fi", formatValue(product.wlan)],
      ["Bluetooth", formatValue(product.bluetooth)],
      ["GPS", formatValue(product.gps)],
      ["NFC", formatValue(product.nfc)],
      ["USB", formatValue(product.usb)],
      ["Radio", formatValue(product.radio)],
      ["Jack de audio", formatValue(product.audioJack)],
      ["Altavoz", formatValue(product.speaker)],
      ["Sensores", formatValue(product.sensors)],
    ],
  };

  const fields = section[activeTab] || [];

  return (
    <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
      {fields.map(([label, value]) => (
        <div key={label}>
          <strong>{label}:</strong> {value}
        </div>
      ))}
    </div>
  );
});

export default ProductTabContent;
