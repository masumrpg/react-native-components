import { Stack, usePathname, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Platform, TouchableOpacity } from 'react-native';
import { useTheme } from 'rnc-theme';

const nonHeaderPatshs = ['/scroll', '/qrcode-pack/qr-scanner'];

export default function UILayout() {
  const { theme } = useTheme();
  const pathName = usePathname();
  const router = useRouter();

  const isNonHeaderPath = nonHeaderPatshs.includes(pathName);

  const formattedTitle =
    pathName === '/'
      ? 'Masumdev'
      : pathName
          .split('/')
          .filter(Boolean)
          .slice(-1)[0]
          .replace(/\./g, '')
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

  return (
    <Stack
      screenOptions={{
        title: formattedTitle,
        headerTitleAlign: 'center',
        headerBackTitle: 'Back',
        headerShown: isNonHeaderPath ? false : true,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerBackButtonDisplayMode: 'minimal',
        headerLeft: () => (
          <TouchableOpacity
            style={{ ...(Platform.OS === 'web' && { marginLeft: 16 }) }}
            onPress={() => {
              // Check if we can go back in history
              if (router.canGoBack()) {
                router.back();
              } else {
                // If we can't go back, navigate to root
                router.push('/');
              }
            }}
          >
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
