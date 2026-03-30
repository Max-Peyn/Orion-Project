export const VEHICLE_TYPES = {
  PICKUP: 'pickup',
  SPRINTER: 'sprinter'
} as const;

export const WHEEL_TYPES = {
  V1: 'v1',
  V2: 'v2'
} as const;

export const ACCESSORY_TYPES = {
  TENT: 'tent',
  ROOF_RACK: 'roofRack',
  ADDITIONAL_LIGHT: 'additionalLight'
} as const;

export const DEFAULT_COLORS = [
  '#ffffff',
  '#000000',
  '#ff0000',
  '#0000ff',
  '#00ff00',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#808080',
  '#800000',
];

export const MODEL_PATHS = {
  PICKUP: '/models/PickUp/PickUpWithoutBagaznic.glb',
  SPRINTER: '/models/mersedes/SprinterOptimized.glb',
  WHEELS_V1: '/models/Wheels/v1/tuner_wheel.glb',
  WHEELS_V2: '/models/Wheels/v2/scene.gltf',
  TENT: '/models/Tent/tentv2.glb',
  ROOF_RACK: '/models/RoofRack/simple_generic_roofbox.glb',
  ADDITIONAL_LIGHT: '/models/lights/sunstrip_led_bar/scene.gltf'
} as const;

export const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';

export const API_CONFIG = {
  BASE_URL: 'https://threed-configurator-qrxl.onrender.com/api',
  TIMEOUT: 10000
} as const;