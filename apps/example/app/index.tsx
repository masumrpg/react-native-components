import { router, Stack } from 'expo-router';
import {
  Avatar,
  Button,
  ButtonText,
  Center,
  Typography,
  useTheme,
} from 'rnc-theme';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTitleStyle: {
            color: theme.colors.text,
          },
        }}
      />
      <Center themed style={{ flex: 1, gap: 24, marginTop: -64 }}>
        <Avatar
          source={{ uri: 'https://github.com/masumrpg.png' }}
          style={{ width: 220, height: 220, borderRadius: 999 }}
          imageStyle={{ width: 200, height: 200 }}
          fallbackText="XL"
          variant="primary"
        />
        <Typography variant="h1" style={{ fontFamily: theme.typography.title.fontFamily }}>
          Welcome to RNC Theme
        </Typography>

        <Button onPress={() => router.push('/ui')} style={{ marginTop: 24 }}>
          <ButtonText>Get Started</ButtonText>
        </Button>
      </Center>
    </>
  );
}
