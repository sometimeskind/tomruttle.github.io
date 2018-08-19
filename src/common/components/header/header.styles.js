// @flow

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  media, List, ListItem, ListLink,
} from '../global.styles';

export { activeClassName } from '../global.styles';

export const PaddedHeader = styled.header`
  padding: 0 1em;

  ${media.large`
    padding: 0 2em;
  `}
`;

export const TitleLink = styled(Link)`
  color: #111;
  text-decoration: none;
  font-weight: bold;
`;

export const HeaderList = styled(List)`
  width: 100%;
  white-space: nowrap;
  padding: 0;
  margin: 0;
`;

export const HeaderListItem = styled(ListItem)`
  display: inline-block;
`;

export const HeaderListLink = styled(ListLink)`
  padding: 0.5em 2em 0.5em 0;
`;
