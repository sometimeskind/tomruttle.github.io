// @flow

import styled from 'styled-components';

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
