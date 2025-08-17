import { useMediaQuery } from 'react-responsive';

export function useBreakpoints() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  return { isMobile, isTablet };
}

