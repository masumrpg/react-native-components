import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { utils, RNCProvider } from 'rnc-theme';
import { i18nConfig } from '@/config';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Font config
const fontConfig = utils.createExpoFontConfig({
  'Poppins-Regular': Poppins_400Regular,
  'Poppins-Medium': Poppins_500Medium,
  'Poppins-SemiBold': Poppins_600SemiBold,
  'Poppins-Bold': Poppins_700Bold,
});

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') as FontSource,
  //   ...FontAwesome.font,
  // });

  const [fontsLoaded, error] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  const handleFontLoadError = (error: string) => {
    console.warn('Font loading error:', error);
    // You could show a toast notification or handle the error as needed
  };

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <RNCProvider
        defaultTheme="system"
        toast={{ maxToasts: 4, position: 'bottom' }}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        i18nConfig={i18nConfig}
        scrollToHideProps={{
          headerHeight: 100,
        }}
        fontConfig={fontConfig}
        fontsLoaded={fontsLoaded}
        onFontLoadError={handleFontLoadError}
        showLoadingSplash={true}
        splashDuration={200}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </RNCProvider>
    </GestureHandlerRootView>
  );
}
