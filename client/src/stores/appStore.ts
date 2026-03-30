import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppState {
  currentVehicle: 'pickup' | 'sprinter' | null;
  activeWheels: 'v1' | 'v2' | null;
  vehicleColor: string;

  accessories: {
    tent: boolean;
    roofRack: boolean;
    additionalLight: boolean;
  };

  isLoading: boolean;
  showWheels: boolean;

  setCurrentVehicle: (vehicle: 'pickup' | 'sprinter' | null) => void;
  setActiveWheels: (wheels: 'v1' | 'v2' | null) => void;
  setVehicleColor: (color: string) => void;
  toggleAccessory: (accessory: keyof AppState['accessories']) => void;
  setAccessory: (accessory: keyof AppState['accessories'], enabled: boolean) => void;
  setShowWheels: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  resetConfiguration: () => void;
}

const initialState = {
  currentVehicle: null,
  activeWheels: null,
  vehicleColor: '#ffffff',
  accessories: {
    tent: false,
    roofRack: false,
    additionalLight: false
  },
  isLoading: false,
  showWheels: true
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentVehicle: (vehicle) => {
        set({ currentVehicle: vehicle });
      },

      setActiveWheels: (wheels) => {
        set({ activeWheels: wheels });
      },

      setVehicleColor: (color) => {
        set({ vehicleColor: color });
      },

      toggleAccessory: (accessory) => {
        const current = get().accessories[accessory];
        set((state) => ({
          accessories: {
            ...state.accessories,
            [accessory]: !current
          }
        }));
      },

      setAccessory: (accessory, enabled) => {
        set((state) => ({
          accessories: {
            ...state.accessories,
            [accessory]: enabled
          }
        }));
      },

      setShowWheels: (show) => {
        set({ showWheels: show });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      resetConfiguration: () => {
        set({
          ...initialState,
          currentVehicle: get().currentVehicle
        });
      }
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        currentVehicle: state.currentVehicle,
        activeWheels: state.activeWheels,
        vehicleColor: state.vehicleColor,
        accessories: state.accessories,
        showWheels: state.showWheels
      })
    }
  )
);