import React, { useEffect, useRef } from 'react';
import { PortalProps } from '../types';
import { usePortal } from '../context/PortalContext';

let portalCounter = 0;

export const Portal: React.FC<PortalProps> = ({ children, name, hostName }) => {
  const { mount, unmount, update } = usePortal();
  const portalName = useRef(name || `portal-${++portalCounter}`).current;
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mount(portalName, children, hostName);
      mounted.current = true;
    } else {
      update(portalName, children, hostName);
    }

    return () => {
      unmount(portalName, hostName);
      mounted.current = false;
    };
  }, [children, mount, unmount, update, portalName, hostName]);

  return null;
};