/* eslint-disable react-hooks/rules-of-hooks */

import { useMediaQuery } from 'react-responsive';

export const isPc = useMediaQuery({ query: '(min-width: 1024px)' });
export const isMobile = useMediaQuery({ query: '(min-width: 768px)' });
