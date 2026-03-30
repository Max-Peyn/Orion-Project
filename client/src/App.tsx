import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider, RouteProvider } from './providers';
import { AppRouter } from './routes';
import './styles/index.css';

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <RouteProvider>
          <AppRouter />
        </RouteProvider>
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;