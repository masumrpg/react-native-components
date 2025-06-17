import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { RNCProvider } from 'rnc-theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const nonHeaderPatshs = ['/scroll', '/qrcode-pack/qr-scanner'];

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

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathName = usePathname();

  const isNonHeaderPath = nonHeaderPatshs.includes(pathName);

  const formattedTitle =
    pathName === '/'
      ? 'Masumdev'
      : pathName
          .replace(/^\//, '')
          .replace(/\./g, '')
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

  return (
    <RNCProvider
      defaultTheme="system"
      toast={{ maxToasts: 4, position: 'top' }}
    >
      <StatusBar style={pathName === '/scroll-to-hide' ? 'light' : 'dark'} />
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            title: formattedTitle,
            headerTitleAlign: 'center',
            headerBackTitle: 'Back',
            headerShown: isNonHeaderPath ? false : true,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </GestureHandlerRootView>
    </RNCProvider>
  );
}
