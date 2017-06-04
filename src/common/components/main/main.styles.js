// @flow

import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';

import { media } from '../global.styles';

export const Wrapper = styled.div`
  display: flex !important; /* TODO: How to increase specificity and remove this !important flag? */
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

const transitionName = 'fade';
const transitionEnterTimeout = 200;
const transitionLeaveTimeout = 100;

function toS(ms) {
  return `${ms / 1000}s`;
}

export const TransitionAnimation = styled(CSSTransitionGroup).attrs({ transitionName, transitionEnterTimeout, transitionLeaveTimeout })`
  .${transitionName}-enter {
    opacity: 0.01;
    position: absolute; /* TODO: Is there a way to do this with flexbox? */
  }

  .${transitionName}-enter-active {
    opacity: 1;
    transition: opacity ${toS(transitionEnterTimeout)} ease-in ${toS(transitionLeaveTimeout)};
  }

  .${transitionName}-leave {
    opacity: 1;
    position: absolute;
  }

  .${transitionName}-leave-active {
    transition: opacity ${toS(transitionLeaveTimeout)} ease-out;
    opacity: 0.01;
  }
`;
