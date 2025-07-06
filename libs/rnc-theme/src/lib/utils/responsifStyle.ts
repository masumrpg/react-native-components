// TODO Bikin responsif utils besok kalo sempat!
// import { Platform, Dimensions, ScaledSize } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// // Get window dimensions
// const { width, height }: ScaledSize = Dimensions.get('window');

// // --- PLATFORM CHECKS ---
// export const isWeb: boolean = Platform.OS === 'web';
// export const isAndroid: boolean = Platform.OS === 'android';
// export const isIOS: boolean = Platform.OS === 'ios';

// // --- DEVICE TYPE CHECKS ---
// export const isTablet: boolean = width >= 768 && width < 1024;
// export const isMobile: boolean = width < 768;
// export const isDesktop: boolean = width >= 1024;

// // --- RESPONSIVE DIMENSIONS ---
// export const widthPercent = (percent: string): number => wp(percent);
// export const heightPercent = (percent: string): number => hp(percent);

// // --- BREAKPOINTS ---
// export const breakpoints = {
//   mobile: 0,
//   tablet: 768,
//   desktop: 1024,
// };

// // --- BREAKPOINT DETECTION ---
// export const isBreakpoint = {
//   mobile: width < breakpoints.tablet,
//   tablet: width >= breakpoints.tablet && width < breakpoints.desktop,
//   desktop: width >= breakpoints.desktop,
// };

// // --- TYPE FOR RESPONSIVE STYLE ---
// type BreakpointStyles<T> = {
//   mobile?: T;
//   tablet?: T;
//   desktop?: T;
// };

// // --- RESPONSIVE STYLE HELPER ---
// export function responsiveStyle<T>(
//   stylesByBreakpoint: BreakpointStyles<T>
// ): T | {} {
//   if (isBreakpoint.mobile && stylesByBreakpoint.mobile) {
//     return stylesByBreakpoint.mobile;
//   } else if (isBreakpoint.tablet && stylesByBreakpoint.tablet) {
//     return stylesByBreakpoint.tablet;
//   } else if (isBreakpoint.desktop && stylesByBreakpoint.desktop) {
//     return stylesByBreakpoint.desktop;
//   }
//   return {};
// }
