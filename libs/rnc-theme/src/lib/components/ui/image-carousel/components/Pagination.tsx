import { StyleSheet, View } from 'react-native';
import { Dot } from './Dot';
import { PaginationProps } from '../types';

const Pagination = ({
  data,
  x,
  size,
  position = 'bottom',
  style,
  dotStyle,
  activeDotStyle,
}: PaginationProps) => {
  return (
    <View
      style={[
        styles.paginationContainer,
        position === 'overlay' && styles.overlay,
        position === 'overlay' && { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
        style,
      ]}
    >
      {data.map((_, i) => {
        return (
          <Dot
            key={i}
            x={x}
            index={i}
            size={size}
            dotStyle={[dotStyle, position === 'overlay' && styles.overlayDot]}
            activeDotStyle={activeDotStyle}
          />
        );
      })}
    </View>
  );
};

export { Pagination };

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  overlayDot: {
    backgroundColor: 'white',
  },
});
