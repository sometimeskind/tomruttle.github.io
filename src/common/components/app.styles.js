import styled from 'styled-components';

import { containerMinWidth, containerWidth, media } from './global.styles.js';

export { baseStyles } from './global.styles';

export const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.7em;
  color: #555;
  max-width: ${containerWidth};
  min-width: ${containerMinWidth};
  min-height: 100vh;

  ${media.large`
    font-size: 16px;
  `}

  ${media.larger`
    font-size: 18px;
  `}
`;

export const Outer = styled.div`
  padding: 1em 2em 2em;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Inner = styled.div`
  flex: 1;
`;
