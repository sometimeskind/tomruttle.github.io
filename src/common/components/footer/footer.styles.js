// @flow

import styled from 'styled-components';

import { media } from '../global.styles';

export { TwitterButton, GithubButton } from '../global.styles';

export const PaddedFooter = styled.footer`
  padding: 1em 1em 0 0;
  text-align: right;

  ${media.large`
    padding: 1em 2em 0 0;
  `}
`;
