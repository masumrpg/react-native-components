import React from 'react';

export interface PortalProps {
  children: React.ReactNode;
  name?: string;
  hostName?: string; // Target host untuk portal ini
}

export interface PortalHostProps {
  name?: string;
}

export interface PortalContextType {
  mount: (name: string, children: React.ReactNode, targetHost?: string) => void;
  unmount: (name: string, targetHost?: string) => void;
  update: (
    name: string,
    children: React.ReactNode,
    targetHost?: string
  ) => void;
  hostName: string;
}

export interface PortalState {
  [key: string]: React.ReactNode;
}
