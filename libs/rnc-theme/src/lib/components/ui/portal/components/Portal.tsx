import React, { useEffect, useRef } from 'react';
import { PortalProps } from '../types';
import { usePortal } from '../context/PortalContext';

let portalCounter = 0;

export const Portal: React.FC<PortalProps> = ({ children, name }) => {
  const { mount, unmount, update } = usePortal();
  const portalName = useRef(name || `portal-${++portalCounter}`).current;
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mount(portalName, children);
      mounted.current = true;
    } else {
      update(portalName, children);
    }

    return () => {
      unmount(portalName);
      mounted.current = false;
    };
  }, [children, mount, unmount, update, portalName]);

  return null;
};