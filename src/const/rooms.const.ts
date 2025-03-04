import { SelectProps } from "antd";

export const AmenitiesSelectOptions: SelectProps["options"] = Array.from(
  new Set([
    "Leather Chairs",
    "Wi-fi",
    "Mini Fridge",
    "Coffee Machine",
    "Stage",
    "Microphone",
    "Large TV Screen",
    "Podium",
    "Projector",
    "Whiteboard",
    "Computers",
    "Workbenches",
    "Tools",
    "Conference Phone",
    "Soft Lighting",
    "Comfortable Sofa",
    "High-Speed Wi-Fi",
    "Ergonomic Chairs",
    "State-of-the-Art Sound System",
    "Catering Kitchen",
    "Stage",
    "Ambient Lighting",
    "Round Tables",
    "Lounge Area",
    "Restrooms",
    "Stage Area",
    "Multiple Projection Screens",
    "Sound System",
    "Theater-Style Seating",
    "Modular Furniture",
    "Writable Walls",
    "Digital Whiteboard",
    "Bean Bags",
    "Kitchenette",
    "Refreshments",
    "Air Conditioning",
    "Laptop Charging Stations",
    "Flat-Screen TV",
    "Movable Partitions",
    "PA System",
    "Digital Signage",
    "Catering Area",
    "Restrooms",
    "Loading Dock",
    "Overhead Projector",
    "Projector",
    "Sound System",
    "Writable Walls",
    "Flip Chart",
    "Flexible Seating",
    "Natural Light",
    "High-speed WiFi",
    "Desk Lamps",
    "Comfortable Seating",
    "Power Outlets",
    "Whiteboard",
    "High-End Gaming PCs",
    "VR Headsets", "Digital Screen", "Projector", "Advanced Sound System", "Podium", "Tiered Seating", "Microphone",
"LED Lighting",
    "Surround Sound System",
    "Ergonomic Gaming Chairs",
    "Bookshleves and Storage",
    "Stationery Supplies",
    "Noise-Cancelling Headphones",
    "Printing and Scanning Facilities",
    "Ergonomic Desks and Chairs",
    "Snack Bar",
    "Adjustable Lighting",
    "Green Screen",
    "Adjustable Lighting",
    "Professional Cameras",
    "Movable Partitions", "PA System", "Digital Signage", "Catering Area", "Restrooms", "Loading Dock",
    "Backdrops",
    "Editing Workstations",
    "Soundproofing",
    "On-site Catering Services",
    "Secure Parking",
    "Video Conferencing Equipment",
  ])
).map((amenity) => ({ label: amenity, value: amenity }));
