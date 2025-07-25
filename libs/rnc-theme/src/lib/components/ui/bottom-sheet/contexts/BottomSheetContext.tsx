import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { View, BackHandler, Platform, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ListRenderItem } from 'react-native';
import BottomSheetScrollView from '../components/BottomSheetScrollView';
import BottomSheetFlatList from '../components/BottomSheetFlatList';
import {
  BottomSheetContextType,
  BottomSheetMethods,
  BottomSheetProviderProps,
} from '../types';

// Create Context with Default Value
const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

/**
 * BottomSheetProvider component that manages the bottom sheet state and behavior.
 * Now supports both ScrollView and FlatList variants.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BottomSheetProvider = <T = any,>({
  children,
  defaultSnapTo = '70%',
  maxSnapTo = Platform.OS === 'web' ? '0%' : '100%',
  backgroundColor = '#FFFFFF',
  backDropColor = 'rgba(0,0,0,0.5)',
  lineBackgroundColor = '#000000',
  borderTopLeftRadius = 25,
  borderTopRightRadius = 25,
  isBorderBottomTitleVisible = false,
  onStateChange,
  variant = 'scroll',
  flatListProps,
}: BottomSheetProviderProps<T>) => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setSheetTitle] = useState<ReactNode>(null);
  const [snapTo, setSnapTo] = useState<string>(defaultSnapTo);
  const [maxSnapToValue, setMaxSnapToValue] = useState<string>(maxSnapTo);
  const [sheetVariant, setSheetVariant] = useState<'scroll' | 'flatlist'>(
    variant
  );

  const [listData, setListData] = useState<T[]>([]);
  const [renderItem, setRenderItem] = useState<ListRenderItem<T> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const navigation = useNavigation();

  // Remove isLoading state which causes delays and unnecessary re-renders

  // Expand method with optional snapTo parameter
  const expand = useCallback((snapToValue?: string) => {
    if (snapToValue) {
      setSnapTo(snapToValue);
    }

    // Use requestAnimationFrame to avoid Reanimated warnings
    // and ensure the state is updated before expanding
    requestAnimationFrame(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.expand();
      }
    });
  }, []);

  // Close method
  const close = useCallback(() => {
    requestAnimationFrame(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.close();
      }
    });
  }, []);

  // Handler for State Change from Bottom Sheet
  const handleStateChange = useCallback(
    (state: boolean) => {
      setIsOpen(state);
      onStateChange?.(state);

      // Reset title when bottom sheet is closed
      if (!state) {
        setSheetTitle('');
        setContent(null);
      }
    },
    [onStateChange]
  );

  // Toggle bottom sheet with optional snapTo parameter
  const toggle = useCallback(
    (snapToValue?: string) => {
      if (isOpen) {
        close();
      } else {
        expand(snapToValue);
      }
    },
    [isOpen, close, expand]
  );

  // Content setting functions with useCallback to prevent recreating functions
  const handleSetContent = useCallback((newContent: ReactNode) => {
    setContent(newContent);
  }, []);

  const handleSetSheetTitle = useCallback((newTitle: ReactNode) => {
    setSheetTitle(newTitle);
  }, []);

  const handleSetMaxTo = useCallback((newValue: string) => {
    setMaxSnapToValue(newValue);
  }, []);

  const handleSetVariant = useCallback((newVariant: 'scroll' | 'flatlist') => {
    setSheetVariant(newVariant);
  }, []);

  const handleSetListData = useCallback((data: T[]) => {
    setListData(data); // Add null check to prevent empty data
  }, []);

  const handleSetRenderItem = useCallback((renderer: ListRenderItem<T>) => {
    // Wrap the provided renderer with null checks
    const safeRenderer: ListRenderItem<T> = (info) => {
      // If info or info.item is null/undefined, return null or a placeholder
      // if (!info || info.item === null || info.item === undefined) { // before
      //   return null;
      // }
      if (info.item === null || info.item === undefined) {
        return null;
      }
      // Otherwise use the original renderer
      return renderer(info);
    };

    setRenderItem(() => safeRenderer);
  }, []);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isOpen) {
          close();
          return true; // Prevents default back behavior
        }
        return false; // Allows default back behavior
      }
    );

    return () => backHandler.remove();
  }, [isOpen, close]);

  // Handle iOS back gesture using React Navigation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useFocusEffect(
    useCallback(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const unsubscribe = navigation.addListener(
        'beforeRemove',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => {
          if (!isOpen) return; // Don't handle if sheet is not open

          // Prevent immediate navigation
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          e.preventDefault();

          // Close bottom sheet
          close();

          // Allow parent removal only when bottom sheet closes
          const timeout = setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            if (navigation.isFocused()) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              navigation.dispatch(e.data.action);
            }
          }, 300); // Give enough time for sheet to close

          return () => clearTimeout(timeout);
        }
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return unsubscribe;
    }, [navigation, isOpen, close])
  );

  // Value provided by Context
  const contextValue: BottomSheetContextType<T> = {
    isOpen,
    expand,
    close,
    toggle,
    setContent: handleSetContent,
    setSheetTitle: handleSetSheetTitle,
    setMaxTo: handleSetMaxTo,
    variant: sheetVariant,
    setVariant: handleSetVariant,
    setListData: handleSetListData,
    setRenderItem: handleSetRenderItem,
    isLoading: false,
  };

  // Title container component
  const TitleContainer = () =>
    title ? (
      <View
        style={{
          paddingBottom: 12,
          borderBottomWidth: isBorderBottomTitleVisible ? 0.3 : 0,
          borderBottomColor: lineBackgroundColor,
          alignItems: 'center',
          backgroundColor: backgroundColor,
        }}
      >
        {/* <Text style={{ fontSize: 20, fontWeight: '600' }}>{title}</Text> */}
        {typeof title === 'string' ? (
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
    ) : null;

  // Add safeguard for renderItem in case it's still null
  const safeRenderItem =
    renderItem ??
    (() => (
      <Text style={{ padding: 20 }}>
        No item renderer provided
      </Text>
    ));

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
      {(isOpen || content) &&
        (sheetVariant === 'scroll' ? (
          <BottomSheetScrollView
            ref={bottomSheetRef}
            snapTo={snapTo}
            maxSnapTo={maxSnapToValue}
            backgroundColor={backgroundColor}
            backDropColor={backDropColor}
            lineBackgroundColor={lineBackgroundColor}
            borderTopLeftRadius={borderTopLeftRadius}
            borderTopRightRadius={borderTopRightRadius}
            onStateChange={handleStateChange}
            stickyHeaderIndices={title ? [0] : []}
          >
            <TitleContainer />
            <View style={{ padding: 20 }}>{content}</View>
          </BottomSheetScrollView>
        ) : (
          <BottomSheetFlatList
            ref={bottomSheetRef}
            snapTo={snapTo}
            maxSnapTo={maxSnapToValue}
            backgroundColor={backgroundColor}
            backDropColor={backDropColor}
            lineBackgroundColor={lineBackgroundColor}
            borderTopLeftRadius={borderTopLeftRadius}
            borderTopRightRadius={borderTopRightRadius}
            onStateChange={handleStateChange}
            data={listData}
            renderItem={safeRenderItem}
            ListHeaderComponent={<TitleContainer />}
            stickyHeaderIndices={title ? [0] : []}
            contentContainerStyle={{ paddingBottom: 20, backgroundColor }}
            {...flatListProps}
          />
        ))}
    </BottomSheetContext.Provider>
  );
};

/**
 * Custom hook to access the Bottom Sheet Context.
 * Supports both ScrollView and FlatList variants.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useBottomSheet = <T = any,>(): BottomSheetContextType<T> => {
  const context = useContext(BottomSheetContext);

  if (context === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  return context as BottomSheetContextType<T>;
};
