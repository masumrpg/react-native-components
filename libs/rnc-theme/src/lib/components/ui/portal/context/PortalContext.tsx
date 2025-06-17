import React, { createContext, useContext, useState, useCallback } from 'react';
import { PortalContextType, PortalState } from '../types';

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

interface PortalProviderProps {
  children: React.ReactNode;
}

export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const [portals, setPortals] = useState<PortalState>({});

  const mount = useCallback((name: string, children: React.ReactNode) => {
    setPortals(prev => ({ ...prev, [name]: children }));
  }, []);

  const unmount = useCallback((name: string) => {
    setPortals(prev => {
      const newPortals = { ...prev };
      delete newPortals[name];
      return newPortals;
    });
  }, []);

  const update = useCallback((name: string, children: React.ReactNode) => {
    setPortals(prev => ({ ...prev, [name]: children }));
  }, []);

  const value: PortalContextType = {
    mount,
    unmount,
    update,
  };

  return (
    <PortalContext.Provider value={value}>
      {children}
      {Object.entries(portals).map(([name, portal]) => (
        <React.Fragment key={name}>{portal}</React.Fragment>
      ))}
    </PortalContext.Provider>
  );
};