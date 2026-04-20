import React, { useRef, useState } from 'react';

import { useAuth, useConfiguration } from '../../hooks';
import { useVehicleModels } from '../../hooks/useVehicleModels';
import { useModalsState } from '../../hooks/useModalsState';
import { useControlsState } from '../../hooks/useControlsState';
// import { Canvas3D } from '../Canvas/Canvas3D';
import { UIHeader } from '../ui/UIHeader';
import { ControlsPanel } from '../controls/ControlsPanel';
import { ModalsSection } from '../modals/ModalsSection';
import type { FavouriteModel } from '../../types/managers';
import {SceneModels} from '../../three/init/sceneModels'


export const Configurator: React.FC = () => {
    const sceneRef = useRef<any>(null);
    const { user } = useAuth();
    const {
        currentVehicle,
        activeWheels,
        vehicleColor,
        switchVehicle,
        switchWheels,
        setVehicleColor,
        toggleAccessory
    } = useConfiguration();


    const [colors, setColors] = useState('')
    const [vehicle, setVehicle] = useState<'left' | 'right'>('left')
    console.log("Поточний стан:", vehicle, "Тип даних:", typeof vehicle);
    const modalsState = useModalsState();
    const controlsState = useControlsState();

    const { modelLoadersRef, modelsRef } = useVehicleModels({
        sceneRef,
        currentVehicle,
        activeWheels,
        vehicleColor,
        controlsVisible: controlsState.controlsVisible,
    });

    const handleColorChange = (color: string) => {
        setVehicleColor(color);

        if (currentVehicle === 'sprinter' && modelsRef.current.sprinter) {
            modelLoadersRef.current.sprinter.setColor(modelsRef.current.sprinter, color);
        } else if (currentVehicle === 'pickup' && modelsRef.current.pickup) {
            modelLoadersRef.current.pickup.setColor(modelsRef.current.pickup, color);
        }
    };

    const handleVehicleSwitch = (direction: 'left' | 'right') => {
        const newVehicle = direction === 'right' ? 'pickup' : 'sprinter';
        switchVehicle(newVehicle);
    };

    const handleWheelsChange = (wheelsType: 'v1' | 'v2' | null) => {
        switchWheels(wheelsType);
    };

    const handleFavouriteSelect = (favourite: FavouriteModel) => {
        if (favourite.name !== currentVehicle) {
            switchVehicle(favourite.name as 'pickup' | 'sprinter');
        }
        handleColorChange(favourite.color);
        if (favourite.wheels && favourite.wheels !== 'standard') {
            switchWheels(favourite.wheels as 'v1' | 'v2');
        }
    };

    const handleCategorySelect = (category: string) => {
        controlsState.handleCategorySelect(category, currentVehicle, toggleAccessory);
    };

    return (
        <div className="configurator">
            {/* <Canvas3D onSceneReady={(ref) => { sceneRef.current = ref.current; }} /> */}
            <SceneModels color={colors} currentVehicle={vehicle}/>
            {currentVehicle && (
                <>
                    <UIHeader
                        user={user}
                        currentVehicle={currentVehicle}
                        vehicleColor={vehicleColor}
                        activeWheels={activeWheels}
                        onAuthClick={modalsState.openAuthModal}
                        onBrochuresClick={modalsState.openBrochures}
                        onFavouritesClick={modalsState.openFavourites}
                        onNavigate={setVehicle}
                    />

                    <ControlsPanel
                        currentVehicle={currentVehicle}
                        controlsVisible={controlsState.controlsVisible}
                        onCategorySelect={handleCategorySelect}
                        onColorChange={setColors}
                        onWheelsChange={handleWheelsChange}
                    />
                </>
            )}

            <ModalsSection
                authModalOpen={modalsState.authModalOpen}
                authModalPage={modalsState.authModalPage}
                brochuresOpen={modalsState.brochuresOpen}
                favouritesOpen={modalsState.favouritesOpen}
                onAuthClose={modalsState.closeAuthModal}
                onAuthSuccess={modalsState.closeAuthModal}
                onBrochuresClose={modalsState.closeBrochures}
                onFavouritesClose={modalsState.closeFavourites}
                onFavouriteSelect={handleFavouriteSelect}
            />
        </div>
    );
};
