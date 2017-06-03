import styled from 'styled-components';

import { media } from '../global.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${media.large`
    flex-direction: row-reverse;
  `}
`;

export const Container = styled.div`
  position: relative;
  padding: 0 1em;

  ${media.large`
    padding: 0 2em;
  `}
`;

/* Protected names for CSSTransitionGroup animation */

// .enter {
//   opacity: 0.01;
//   position: absolute;
// }
//
// .enterActive {
//   opacity: 1;
//   transition: opacity 0.2s ease-in 0.1s;
// }
//
// .leave {
//   opacity: 1;
//   position: absolute;
// }
//
// .leaveActive {
//   transition: opacity 0.1s ease-out;
//   opacity: 0.01;
// }

/* End protected animation names */
