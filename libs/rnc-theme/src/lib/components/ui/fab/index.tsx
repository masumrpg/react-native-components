import { StyleProp, View, ViewStyle, Text } from 'react-native';
import React, { useMemo } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';

/** Item type for Clustered FAB variant with label */
type FabClusteredItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  icon: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
  /** Label text to display next to the FAB */
  label: string;
};

/** Props for Clustered FAB component */
type FabClusteredProps = {
  /** Array of 1-3 FAB items to be displayed in clustered layout */
  items: [FabClusteredItem, FabClusteredItem?, FabClusteredItem?];
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Item type for Doted FAB variant */
type FabDotedItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  icon: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
};

/** Props for Doted FAB component */
type FabDotedProps = {
  /** Array of 1-3 FAB items to be displayed in doted layout */
  items: [FabDotedItem, FabDotedItem?, FabDotedItem?];
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Item type for Extended FAB variant with label */
type FabExtendedItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  icon: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
  /** Label text to display next to the FAB */
  label: string;
};

/** Props for Extended FAB component */
type FabExtendedProps = {
  /** Array of 1-3 FAB items to be displayed in extended layout */
  items: [FabExtendedItem, FabExtendedItem?, FabExtendedItem?];
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Props for Single FAB component */
type FabSingleProps = {
  /** Optional icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  icon?: React.ReactNode;
  /** Optional callback function when FAB is pressed */
  onPress?: () => void;
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
};

/** Item type for Stacked FAB variant */
type FabStackedItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  icon: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
};

/** Props for Stacked FAB component */
type FabStackedProps = {
  /** Array of 1-3 FAB items to be displayed in stacked layout */
  items: [FabStackedItem, FabStackedItem?, FabStackedItem?];
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Available FAB variants */
type FabVariant = 'clustered' | 'doted' | 'extended' | 'single' | 'stacked';

/** Union type of all FAB variant props */
type FabProps =
  | ({ variant: 'clustered' } & FabClusteredProps)
  | ({ variant: 'doted' } & FabDotedProps)
  | ({ variant: 'extended' } & FabExtendedProps)
  | ({ variant: 'single' } & FabSingleProps)
  | ({ variant: 'stacked' } & FabStackedProps);

// Centralized StyleSheet for all FAB variants
const createFabStyles = (theme: Theme) => ({
  // Base styles
  container: {
    flex: 1,
  },

  // Common positioning and shadow styles
  baseContentContainer: {
    position: 'absolute' as const,
    bottom: 30,
    right: 30,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Clustered specific styles
  clusteredContentContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  },

  // Extended specific styles
  extendedFabContainer: {
    overflow: 'hidden' as const,
  },

  extendedContentContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  },

  // Common icon container
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  // Single variant specific icon container
  singleIconContainer: {
    borderRadius: 50,
  },

  // Common icon styles
  icon: {
    width: 26,
    height: 26,
  },

  // Text styles
  text: {
    color: 'white' as const,
    fontSize: 18,
    marginLeft: 10,
  },

  // Theme backgrounds
  background: {
    backgroundColor: theme.colors.primary as ViewStyle['backgroundColor'],
  },

  // Single variant container
  singleContainer: {
    position: 'absolute' as const,
    bottom: 30,
    right: 30,
    borderRadius: 50,
    width: 60,
    height: 60,
    shadowColor: '#000' as const,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Single variant touchable
  singleTouchable: {
    width: '100%' as const,
    height: '100%' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  // Wrapper container for main Fab component
  wrapperContainer: {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

const FabClustered = ({
  items,
  style,
  containerStyle,
  isOpen: setIsOpen,
  plusIcon,
}: FabClusteredProps) => {
  const styles = useThemedStyles(createFabStyles);

  const [firstValue, secondValue, thirdValue] = [
    useSharedValue(30),
    useSharedValue(30),
    useSharedValue(30),
  ];

  const [firstWidth, secondWidth, thirdWidth] = [
    useSharedValue(60),
    useSharedValue(60),
    useSharedValue(60),
  ];

  const [isOpen, opacity] = [useSharedValue(false), useSharedValue(0)];

  const progress = useDerivedValue(() => {
    'worklet';
    return isOpen.value ? withTiming(1) : withTiming(0);
  });

  const config = useMemo(
    () => ({
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    }),
    []
  );

  const handlePress = () => {
    if (isOpen.value) {
      firstWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        'worklet';
        if (finish) {
          firstValue.value = withTiming(30, config);
        }
      });

      secondWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        'worklet';
        if (finish) {
          secondValue.value = withDelay(50, withTiming(30, config));
        }
      });

      thirdWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        'worklet';
        if (finish) {
          thirdValue.value = withDelay(100, withTiming(30, config));
        }
      });

      opacity.value = withTiming(0, { duration: 100 });
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
      thirdValue.value = withSpring(290);

      firstWidth.value = withDelay(1200, withSpring(200));
      secondWidth.value = withDelay(1100, withSpring(200));
      thirdWidth.value = withDelay(1000, withSpring(200));

      opacity.value = withDelay(1200, withSpring(1));
    }

    isOpen.value = !isOpen.value;
    setIsOpen?.(!isOpen.value);
  };

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const firstWidthStyle = useAnimatedStyle(() => ({
    width: firstWidth.value,
  }));

  const secondWidthStyle = useAnimatedStyle(() => ({
    width: secondWidth.value,
  }));

  const thirdWidthStyle = useAnimatedStyle(() => ({
    width: thirdWidth.value,
  }));

  const firstIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      firstValue.value,
      [30, 130],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      bottom: firstValue.value,
      transform: [{ scale }],
    };
  });

  const secondIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      secondValue.value,
      [30, 210],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      bottom: secondValue.value,
      transform: [{ scale }],
    };
  });

  const thirdIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      thirdValue.value,
      [30, 290],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      bottom: thirdValue.value,
      transform: [{ scale }],
    };
  });

  const plusIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 45}deg` }],
  }));

  const sampleItems = useMemo(
    () => [
      {
        animate: firstIconStyle,
        width: firstWidthStyle,
      },
      {
        animate: secondIconStyle,
        width: secondWidthStyle,
      },
      {
        animate: thirdIconStyle,
        width: thirdWidthStyle,
      },
    ],
    [
      firstIconStyle,
      secondIconStyle,
      thirdIconStyle,
      firstWidthStyle,
      secondWidthStyle,
      thirdWidthStyle,
    ]
  );

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        {
          shadowColor: '#000' as const,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    >
      {items.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.baseContentContainer,
            styles.clusteredContentContainer,
            sampleItems[index].animate,
            sampleItems[index].width,
            styles.background,
            style,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              item?.onPress();
              handlePress();
            }}
            style={[styles.iconContainer, style]}
          >
            {item?.icon}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              item?.onPress();
              handlePress();
            }}
          >
            <Animated.Text style={[styles.text, opacityStyle]}>
              {item?.label}
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Pressable
        style={[
          styles.baseContentContainer,
          styles.clusteredContentContainer,
          styles.background,
        ]}
        onPress={handlePress}
      >
        <Animated.View style={[styles.iconContainer, plusIconStyle, style]}>
          {plusIcon ?? <Plus size={35} color={'white'} strokeWidth={2} />}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const FabDoted = ({
  items,
  style,
  containerStyle,
  isOpen: setIsOpen,
  plusIcon,
}: FabDotedProps) => {
  const styles = useThemedStyles(createFabStyles);

  const [firstValue, secondValue, thirdValue, isOpen] = [
    useSharedValue(30),
    useSharedValue(30),
    useSharedValue(30),
    useSharedValue(false),
  ];

  const progress = useDerivedValue(() => {
    'worklet';
    return isOpen.value ? withTiming(1) : withTiming(0);
  });

  const config = useMemo(
    () => ({
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    }),
    []
  );

  const handlePress = () => {
    if (isOpen.value) {
      firstValue.value = withTiming(30, config);
      secondValue.value = withDelay(50, withTiming(30, config));
      thirdValue.value = withDelay(100, withTiming(30, config));
    } else {
      firstValue.value = withDelay(200, withSpring(110));
      secondValue.value = withDelay(100, withSpring(100));
      thirdValue.value = withSpring(110);
    }

    isOpen.value = !isOpen.value;
    setIsOpen?.(!isOpen.value);
  };

  const firstAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      firstValue.value,
      [30, 110],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { right: firstValue.value, transform: [{ scale }] };
  });

  const secondAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      secondValue.value,
      [30, 100],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      bottom: secondValue.value,
      right: secondValue.value,
      transform: [{ scale }],
    };
  });

  const thirdAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      thirdValue.value,
      [30, 110],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: thirdValue.value, transform: [{ scale }] };
  });

  const plusAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    return { transform: [{ rotate: `${progress.value * 45}deg` }] };
  });

  const animatedStyles = useMemo(
    () => ({
      first: firstAnimatedStyle,
      second: secondAnimatedStyle,
      third: thirdAnimatedStyle,
      plus: plusAnimatedStyle,
    }),
    [
      firstAnimatedStyle,
      secondAnimatedStyle,
      thirdAnimatedStyle,
      plusAnimatedStyle,
    ]
  );

  const sampleItems = useMemo(
    () => [
      { animate: animatedStyles.first },
      { animate: animatedStyles.second },
      { animate: animatedStyles.third },
    ],
    [animatedStyles]
  );

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {items.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.baseContentContainer,
            sampleItems[index].animate,
            styles.background,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              item?.onPress();
              handlePress();
            }}
            style={[styles.iconContainer, animatedStyles.plus, style]}
          >
            {item?.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Pressable
        style={[styles.baseContentContainer, styles.background]}
        onPress={handlePress}
      >
        <Animated.View
          style={[styles.iconContainer, animatedStyles.plus, style]}
        >
          {plusIcon ?? <Plus size={35} color={'white'} strokeWidth={2} />}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const FabExtended = ({
  items,
  style,
  containerStyle,
  isOpen: setIsOpen,
  plusIcon,
}: FabExtendedProps) => {
  const styles = useThemedStyles(createFabStyles);

  const [width, height, borderRadius, isOpen] = [
    useSharedValue(60),
    useSharedValue(60),
    useSharedValue(50),
    useSharedValue(false),
  ];

  const progress = useDerivedValue(() => {
    'worklet';
    return isOpen.value ? withTiming(1) : withTiming(0);
  });

  const config = useMemo(
    () => ({
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    }),
    []
  );

  const handlePress = () => {
    if (isOpen.value) {
      width.value = withTiming(60, config);
      height.value = withTiming(60, config);
      borderRadius.value = withTiming(50, config);
    } else {
      width.value = withSpring(200);
      height.value = withSpring(250);
      borderRadius.value = withSpring(10);
    }

    isOpen.value = !isOpen.value;
    setIsOpen?.(!isOpen.value);
  };

  const animatedStyles = {
    container: useAnimatedStyle(() => ({
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
    })),
    plus: useAnimatedStyle(() => ({
      transform: [{ rotate: `${progress.value * 45}deg` }],
    })),
  };

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        {
          shadowColor: '#000' as const,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.baseContentContainer,
          styles.extendedFabContainer,
          animatedStyles.container,
          styles.background,
          style,
        ]}
      >
        <Pressable style={styles.iconContainer} onPress={handlePress}>
          <Animated.View
            style={[styles.iconContainer, animatedStyles.plus, style]}
          >
            {plusIcon ?? <Plus size={35} color={'white'} strokeWidth={2} />}
          </Animated.View>
        </Pressable>

        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.extendedContentContainer}
            onPress={() => {
              item?.onPress();
              handlePress();
            }}
          >
            <View style={styles.iconContainer}>{item?.icon}</View>
            <Text style={[styles.text, { color: styles.text.color }]}>
              {item?.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const FabSingle = ({ icon: component, onPress, style }: FabSingleProps) => {
  const styles = useThemedStyles(createFabStyles);

  return (
    <Animated.View style={[styles.singleContainer, styles.background, style]}>
      <TouchableOpacity style={styles.singleTouchable} onPress={onPress}>
        {component ?? <Plus />}
      </TouchableOpacity>
    </Animated.View>
  );
};

const FabStacked = ({
  items,
  style,
  containerStyle,
  isOpen: setIsOpen,
  plusIcon,
}: FabStackedProps) => {
  const styles = useThemedStyles(createFabStyles);

  const [firstValue, secondValue, thirdValue, isOpen] = [
    useSharedValue(30),
    useSharedValue(30),
    useSharedValue(30),
    useSharedValue(false),
  ];

  const progress = useDerivedValue(() => {
    'worklet';
    return isOpen.value ? withTiming(1) : withTiming(0);
  });

  const config = useMemo(
    () => ({
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    }),
    []
  );

  const handlePress = () => {
    if (isOpen.value) {
      firstValue.value = withTiming(30, config);
      secondValue.value = withDelay(50, withTiming(30, config));
      thirdValue.value = withDelay(100, withTiming(30, config));
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
      thirdValue.value = withSpring(290);
    }

    isOpen.value = !isOpen.value;
    setIsOpen?.(!isOpen.value);
  };

  const firstAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      firstValue.value,
      [30, 130],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: firstValue.value, transform: [{ scale }] };
  });

  const secondAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      secondValue.value,
      [30, 210],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: secondValue.value, transform: [{ scale }] };
  });

  const thirdAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      thirdValue.value,
      [30, 290],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: thirdValue.value, transform: [{ scale }] };
  });

  const plusAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    return { transform: [{ rotate: `${progress.value * 45}deg` }] };
  });

  const animatedStyles = useMemo(
    () => ({
      first: firstAnimatedStyle,
      second: secondAnimatedStyle,
      third: thirdAnimatedStyle,
      plus: plusAnimatedStyle,
    }),
    [
      firstAnimatedStyle,
      secondAnimatedStyle,
      thirdAnimatedStyle,
      plusAnimatedStyle,
    ]
  );

  const sampleItems = useMemo(
    () => [
      { animate: animatedStyles.first },
      { animate: animatedStyles.second },
      { animate: animatedStyles.third },
    ],
    [animatedStyles]
  );

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {items.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.baseContentContainer,
            sampleItems[index].animate,
            styles.background,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              item?.onPress();
              handlePress();
            }}
            style={[styles.iconContainer, animatedStyles.plus, style]}
          >
            {item?.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Pressable
        style={[styles.baseContentContainer, styles.background]}
        onPress={handlePress}
      >
        <Animated.View
          style={[styles.iconContainer, animatedStyles.plus, style]}
        >
          {plusIcon ?? <Plus size={35} color={'white'} strokeWidth={2} />}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const Fab = (props: FabProps) => {
  const styles = useThemedStyles(createFabStyles);

  return (
    <View style={styles.wrapperContainer}>
      {(() => {
        switch (props.variant) {
          case 'clustered':
            return <FabClustered {...props} />;
          case 'doted':
            return <FabDoted {...props} />;
          case 'extended':
            return <FabExtended {...props} />;
          case 'single':
            return <FabSingle {...props} />;
          case 'stacked':
            return <FabStacked {...props} />;
          default:
            return <FabSingle {...(props as FabSingleProps)} />;
        }
      })()}
    </View>
  );
};

export { Fab };
export type {
  FabVariant,
  FabClusteredProps,
  FabDotedProps,
  FabExtendedProps,
  FabSingleProps,
};
