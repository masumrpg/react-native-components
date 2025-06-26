import { router, Stack, usePathname } from "expo-router";
import { ArrowLeft, MenuIcon } from "lucide-react-native";
import { Platform, TouchableOpacity } from "react-native";
import { useTheme } from "rnc-theme";

const nonHeaderPatshs = ['/scroll', '/qrcode-pack/qr-scanner'];


export default function UILayout() {
  const {theme} = useTheme();
  const pathName = usePathname();

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
        headerLeft: () => (
          <TouchableOpacity style={{...(Platform.OS==='web' && {marginLeft: 16})}} onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}