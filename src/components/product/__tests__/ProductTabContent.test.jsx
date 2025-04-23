import { render, screen } from "@testing-library/react";
import ProductTabContent from "../ProductTabContent";
import { describe, it, expect } from "vitest";

const mockProduct = {
  brand: "Samsung",
  model: "Galaxy S21",
  price: "799",
  dimentions: "151.7 x 71.2 x 7.9 mm",
  weight: "169",
  sim: "Dual SIM",
  battery: "4000mAh",
  displayType: "AMOLED",
  displaySize: "6.2 inches",
  displayResolution: "2400x1080",
  os: "Android 11",
  cpu: "Exynos 2100",
  chipset: "Exynos",
  gpu: "Mali-G78",
  ram: "8GB",
  internalMemory: "128GB",
  externalMemory: "No",
  primaryCamera: "12 MP",
  secondaryCmera: "10 MP",
  networkTechnology: "5G",
  networkSpeed: "1.2Gbps",
  wlan: "Wi-Fi 802.11 a/b/g/n/ac/6",
  bluetooth: "5.0",
  gps: "Yes",
  nfc: "Yes",
  usb: "USB Type-C",
  radio: "",
  audioJack: "No",
  speaker: "Stereo",
  sensors: ["Fingerprint", "Accelerometer"],
};

describe("ProductTabContent", () => {
  it("renders general tab content", () => {
    render(<ProductTabContent product={mockProduct} activeTab="general" />);
    expect(screen.getByText(/Marca:/)).toBeInTheDocument();
    expect(screen.getByText(/Samsung/)).toBeInTheDocument();
    expect(screen.getByText(/Modelo:/)).toBeInTheDocument();
    expect(screen.getByText(/Galaxy S21/)).toBeInTheDocument();
  });

  it("renders pantalla tab content", () => {
    render(<ProductTabContent product={mockProduct} activeTab="pantalla" />);
    expect(screen.getByText(/Tipo:/)).toBeInTheDocument();
    expect(screen.getByText(/AMOLED/)).toBeInTheDocument();
  });

  it("renders hardware tab content", () => {
    render(<ProductTabContent product={mockProduct} activeTab="hardware" />);
    expect(screen.getByText(/CPU:/)).toBeInTheDocument();
    expect(screen.getByText(/Exynos 2100/)).toBeInTheDocument();
  });

  it("renders camara tab content", () => {
    render(<ProductTabContent product={mockProduct} activeTab="camara" />);
    expect(screen.getByText(/Cámara principal:/)).toBeInTheDocument();
    expect(screen.getByText(/12 MP/)).toBeInTheDocument();
  });

  it("renders conectividad tab content", () => {
    render(
      <ProductTabContent product={mockProduct} activeTab="conectividad" />
    );
    expect(screen.getByText(/Wi-Fi:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Wi-Fi 802.11 a\/b\/g\/n\/ac\/6/)
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        return (
          element?.tagName.toLowerCase() === "div" &&
          element.textContent === "Radio: -"
        );
      })
    ).toBeInTheDocument();
  });
});
