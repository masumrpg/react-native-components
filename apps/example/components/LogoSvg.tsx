import Svg, { SvgProps, G, Rect, Text, TSpan } from 'react-native-svg';
const LogoSvg = (props: SvgProps) => (
  <Svg
    viewBox="0 0 999.64 999.64"
    {...props}
  >
    <G data-name="Layer 2">
      <G data-name="Layer 1">
        <Rect
          width={999.64}
          height={999.64}
          rx={499.82}
          fill={'#2e8555'}
        />
        <Text
            fill={'#fff'}
            fontFamily='Phosphate-Inline,Phosphate'
            fontSize='483.3px'
          transform="translate(186.03 663.02)"
        >
          <TSpan>{'{   }'}</TSpan>
        </Text>
        <Text
          fontSize="369.07px"
          fill="#fff"
          fontFamily="Phosphate-Inline,Phosphate"
          transform="translate(379.19 631.06)"
        >
          {'v'}
        </Text>
      </G>
    </G>
  </Svg>
);
export {LogoSvg};
