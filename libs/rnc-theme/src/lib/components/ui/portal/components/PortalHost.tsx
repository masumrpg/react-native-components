import React from 'react';
import { PortalHostProps } from '../types';
import { PortalProvider } from '../context/PortalContext';

export const PortalHost: React.FC<PortalHostProps & { children: React.ReactNode }> = ({
  children,
  name = 'default'
}) => {
  return <PortalProvider hostName={name}>{children}</PortalProvider>;
};