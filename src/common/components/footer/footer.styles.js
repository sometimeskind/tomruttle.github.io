// @flow

import styled from 'styled-components';

import { media, hiddenText } from '../global.styles';

export const SocialButton = styled.a.attrs({
  target: '_blank',
  rel: 'me noopener noreferrer',

  href(props) {
    if (props.twitter) { return 'https://twitter.com/tomruttle'; }
    if (props.github) { return 'https://github.com/tomruttle'; }
    return '';
  },
})`
  ${hiddenText}

  width: 2em;
  height: 2em;
  display: inline-block;
  margin-left: 1em;
  background: ${(props) => {
    let url = '';
    if (props.twitter) { url = '/images/twitter.405a3.svg'; }
    if (props.github) { url = '/images/github.f1d11.svg'; }
    return `transparent url('${url}') no-repeat 0 0`;
  }};
`;


export const PaddedFooter = styled.footer`
  padding: 1em 1em 0 0;
  text-align: right;

  ${media.large`
    padding: 1em 2em 0 0;
  `}
`;
