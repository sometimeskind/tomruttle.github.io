import styled, { injectGlobal } from 'styled-components';
import { NavLink } from 'react-router-dom';

import pureStyles from 'purecss/build/pure.css';
import pureGrids from 'purecss/build/grids-responsive.css';
import pureOffsets from '../../../assets/css/offsets.css';

export const containerWidth = '80rem';
export const containerMinWidth = '16rem';
export const highlightColor = 'OrangeRed';
export const activeClassName = 'list-link-selected';

export const media = {
  large(...args) {
    return styled.css`
      @media screen and (min-width: 48rem) {
        ${styled.css(...args)}
      }
    `;
  },

  larger(...args) {
    return styled.css`
      @media screen and (min-width: 64rem){
        ${styled.css(...args)}
      }
    `;
  },
};

export const hiddenText = `
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

const SocialButton = styled.a.attrs({ target: '_blank', rel: 'me noopener noreferrer' })`
  ${hiddenText}

  width: 2em;
  height: 2em;
  display: inline-block;
  margin-left: 1em;
`;

export const TwitterButton = styled(SocialButton).attrs({ href: 'https://twitter.com/tomruttle' })`
  background: transparent url('/images/twitter.405a3.svg') no-repeat 0 0;
`;

export const GithubButton = styled(SocialButton).attrs({ href: 'https://github.com/tomruttle' })`
  background: transparent url('/images/github.f1d11.svg') no-repeat 0 0;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  position: relative;
  padding: 0;
  margin: 0;
  height: 100%;
  vertical-align: middle;
`;

export const ListLink = styled(NavLink).attrs({ activeClassName })`
  color: #777;
  display: block;
  text-decoration: none;

  &:hover {
    color: ${highlightColor};
  }

  &.${activeClassName} {
    color: ${highlightColor};
  }
`;

export function baseStyles() {
  return injectGlobal`
    ${pureStyles}
    ${pureGrids}
    ${pureOffsets}

    .pure-g div,
    .pure-g section,
    .pure-g aside {
      box-sizing: border-box;
    }

    hr {
      border-top: 1px solid #efefef;
    }
  `;
}
