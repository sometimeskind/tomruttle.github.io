// @flow

import styled from 'styled-components';

import { ListItem, media } from '../global.styles';

export { List, ListLink, activeClassName } from '../global.styles';

export const ListItemSideMenu = styled(ListItem)`
  padding: 0.5em 0;
`;

export const SideMenu = styled.div`
  padding: 0 1em;
  margin-bottom: 1em;

  ${media.large`
    text-align: right;
    padding-top: 3.9em;
    margin: 0;
  `}
`;

export const Header = styled.div`
  padding-top: 1em;

  ${media.large`
    display: none;
  `}
`;
