import { SelectProps } from "antd";

export const AmenitiesSelectOptions: SelectProps["options"] = [
  "Leather Chairs",
  "Wi-fi",
  "Mini Fridge",
  "Coffee Machine",
  "Stage",
  "Microphone",
  "Air Conditioning",
  "Podium",
  "Projector",
  "Whiteboard",
  "Computers",
  "Workbenches",
  "Tools",
  "Conference Phone",
  "Soft Lighting",
  "Comfortable Sofa",
].map((amenity) => ({ label: amenity, value: amenity }));
