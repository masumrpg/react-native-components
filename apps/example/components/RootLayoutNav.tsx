import { i18nConfig } from "@/config";
import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RNCProvider } from "rnc-theme";

export default function RootLayoutNav({ children }: { children: ReactNode }) {
  return (
    <RNCProvider
      defaultTheme="system"
      toast={{ maxToasts: 4, position: 'bottom' }}
      i18nConfig={i18nConfig}
    >
      <GestureHandlerRootView>{children}</GestureHandlerRootView>
    </RNCProvider>
  );
}
