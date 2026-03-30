// Vehicle types
export const VEHICLE_TYPES = {
  PICKUP: 'pickup',
  SPRINTER: 'sprinter'
} as const;

// Wheel types
export const WHEEL_TYPES = {
  V1: 'v1',
  V2: 'v2'
} as const;

// Accessory types
export const ACCESSORY_TYPES = {
  TENT: 'tent',
  ROOF_RACK: 'roofRack',
  ADDITIONAL_LIGHT: 'additionalLight'
} as const;

// Default colors
export const DEFAULT_COLORS = [
  '#ffffff', // White
  '#000000', // Black
  '#ff0000', // Red
  '#0000ff', // Blue
  '#00ff00', // Green
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#808080', // Gray
  '#800000', // Maroon
];

// Model paths
export const MODEL_PATHS = {
  PICKUP: '/models/PickUp/PickUpWithoutBagaznic.glb',
  SPRINTER: '/models/mersedes/SprinterOptimized.glb',
  WHEELS_V1: '/models/Wheels/v1/tuner_wheel.glb',
  WHEELS_V2: '/models/Wheels/v2/scene.gltf',
  TENT: '/models/Tent/tentv2.glb',
  ROOF_RACK: '/models/RoofRack/simple_generic_roofbox.glb',
  ADDITIONAL_LIGHT: '/models/lights/sunstrip_led_bar/scene.gltf'
} as const;

// DRACO decoder path
export const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';

// API configuration
export const API_CONFIG = {
  BASE_URL: 'https://threed-configurator-qrxl.onrender.com/api',
  TIMEOUT: 10000
} as const;