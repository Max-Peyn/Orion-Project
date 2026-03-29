import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfiguratorPage } from '../pages/ConfiguratorPage';
import { BrochuresPage } from '../pages/BrochuresPage';
import { FavouritesPage } from '../pages/FavouritesPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTE_PATHS } from './routesVariables';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.ROOT} element={<Layout />}>
        <Route index element={<ConfiguratorPage />} />
        <Route path={ROUTE_PATHS.CONFIGURATOR.slice(1)} element={<ConfiguratorPage />} />
        <Route path={ROUTE_PATHS.BROCHURES.slice(1)} element={<BrochuresPage />} />

        <Route path={ROUTE_PATHS.LOGIN.slice(1)} element={<LoginPage />} />
        <Route path={ROUTE_PATHS.REGISTER.slice(1)} element={<RegisterPage />} />

        <Route
          path={ROUTE_PATHS.FAVOURITES.slice(1)}
          element={
            <ProtectedRoute>
              <FavouritesPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path={ROUTE_PATHS.NOT_FOUND} element={<Navigate to={ROUTE_PATHS.ROOT} replace />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.ROOT} replace />} />
    </Routes>
  );
};
