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
  hostName?: string;
}

export const PortalProvider: React.FC<PortalProviderProps> = ({
  children,
  hostName = 'default',
}) => {
  const [portals, setPortals] = useState<PortalState>({});

  const mount = useCallback(
    (name: string, children: React.ReactNode, targetHost?: string) => {
      // Only mount if this portal belongs to this host or no specific host is specified
      if (!targetHost || targetHost === hostName) {
        setPortals((prev) => ({ ...prev, [name]: children }));
      }
    },
    [hostName]
  );

  const unmount = useCallback(
    (name: string, targetHost?: string) => {
      // Only unmount if this portal belongs to this host or no specific host is specified
      if (!targetHost || targetHost === hostName) {
        setPortals((prev) => {
          const newPortals = { ...prev };
          delete newPortals[name];
          return newPortals;
        });
      }
    },
    [hostName]
  );

  const update = useCallback(
    (name: string, children: React.ReactNode, targetHost?: string) => {
      // Only update if this portal belongs to this host or no specific host is specified
      if (!targetHost || targetHost === hostName) {
        setPortals((prev) => ({ ...prev, [name]: children }));
      }
    },
    [hostName]
  );

  const value: PortalContextType = {
    mount,
    unmount,
    update,
    hostName,
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