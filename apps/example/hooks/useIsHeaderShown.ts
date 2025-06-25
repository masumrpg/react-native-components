import { useState, useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';

export function useIsHeaderShown() {
  const state = useNavigationState((state: any) => state); // Hook harus dipanggil di sini
  const [isHeaderShown, setIsHeaderShown] = useState(true);

  useEffect(() => {
    if (state) {
      const currentRoute = state.routes[state.index];
      setIsHeaderShown(
        currentRoute?.name ? currentRoute.name !== 'HiddenHeaderScreen' : true
      );
    }
  }, [state]);

  return isHeaderShown;
}
