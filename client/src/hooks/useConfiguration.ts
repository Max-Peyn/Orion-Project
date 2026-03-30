import { useAppStore } from '../stores/appStore';

export const useConfiguration = () => {
  const {
    currentVehicle,
    activeWheels,
    vehicleColor,
    accessories,
    isLoading,
    showWheels,
    setCurrentVehicle,
    setActiveWheels,
    setVehicleColor,
    toggleAccessory,
    setAccessory,
    setShowWheels,
    setLoading,
    resetConfiguration
  } = useAppStore();

  const isPickup = currentVehicle === 'pickup';
  const isSprinter = currentVehicle === 'sprinter';

  const switchVehicle = (vehicle: 'pickup' | 'sprinter') => {
    if (vehicle !== currentVehicle) {
      setCurrentVehicle(vehicle);
      Object.keys(accessories).forEach(key => {
        setAccessory(key as keyof typeof accessories, false);
      });
    }
  };

  const switchWheels = (wheels: 'v1' | 'v2' | null) => {
    setActiveWheels(wheels);
    setShowWheels(wheels !== null);
  };

  const getCurrentConfiguration = () => ({
    vehicle: currentVehicle,
    wheels: activeWheels,
    color: vehicleColor,
    accessories: Object.entries(accessories)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name)
  });

  return {
    currentVehicle,
    activeWheels,
    vehicleColor,
    accessories,
    isLoading,
    showWheels,
    isPickup,
    isSprinter,

    switchVehicle,
    switchWheels,
    setVehicleColor,
    toggleAccessory,
    setAccessory,
    setShowWheels,
    setLoading,
    resetConfiguration,
    getCurrentConfiguration
  };
};