import { StyleSheet, View } from 'react-native';
import Color from 'color';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { useTheme } from '../../../context/RNCProvider';
import { CircleCheckBig } from 'lucide-react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

type SelectableTagContainerListProps = {

} & ViewProps;

type SelectableTagProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const TimingConfig = {
  duration: 150,
};

const SelectableTagContainerList: React.FC<SelectableTagContainerListProps> = ({
  children,
  ...props
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 14,
        paddingRight: 16,
      }}
      {...props}
    >
      {children}
    </View>
  );
};

const SelectableTag: React.FC<SelectableTagProps> = ({
  label,
  checked,
  onPress,
}) => {
  const {theme} = useTheme();
  const styles = useThemedStyles(createStylesSelectableTag);
  const fadedActiveColor = Color(theme.colors.primary).alpha(0.1).toString();

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? fadedActiveColor : 'transparent',
        TimingConfig
      ),
      borderColor: withTiming(
        checked ? theme.colors.primary : theme.colors.border,
        TimingConfig
      ),
      paddingLeft: 20,
      paddingRight: !checked ? 20 : 14,
    };
  }, [checked]);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? theme.colors.primary : theme.colors.text, TimingConfig),
    };
  }, [checked]);

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.8)}
      style={[styles.container, rContainerStyle]}
      onTouchEnd={onPress}
    >
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
          style={{
            marginLeft: 8,
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
            width: 20,
          }}
        >
          <CircleCheckBig size={20} color={theme.colors.primary} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

const createStylesSelectableTag = (theme: Theme) => StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.components.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
  },
});

export { SelectableTag, SelectableTagContainerList };
export type { SelectableTagProps, SelectableTagContainerListProps };