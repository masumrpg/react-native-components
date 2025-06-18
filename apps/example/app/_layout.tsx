// Polyfills required to use Intl with Hermes engine - order matters!
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
// Use polyfill-force for better performance in React Native
import '@formatjs/intl-pluralrules/polyfill-force';
// Add locale data for supported languages
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/id';
import '@formatjs/intl-pluralrules/locale-data/es';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-numberformat/polyfill';
// Add locale data for NumberFormat
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/id';
import '@formatjs/intl-numberformat/locale-data/es';
import '@formatjs/intl-numberformat/locale-data/fr';
import '@formatjs/intl-relativetimeformat/polyfill';
// Add locale data for RelativeTimeFormat
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/id';
import '@formatjs/intl-relativetimeformat/locale-data/es';
import '@formatjs/intl-relativetimeformat/locale-data/fr';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { I18nProvider, RNCProvider } from 'rnc-theme';
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
      toast={{ maxToasts: 4, position: 'bottom' }}
    >
      <I18nProvider options={{ fallbackLng: 'en', debug: false }}>
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
      </I18nProvider>
    </RNCProvider>
  );
}
