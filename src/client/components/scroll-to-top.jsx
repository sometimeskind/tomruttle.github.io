// @flow

import { Component } from 'react';

import type { Element } from 'react';

type ScrollToTopProps = {
  children: Element<*>,
};

export default class ScrollToTop extends Component {
  props: ScrollToTopProps

  static defaultProps = {
    location: '',
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return this.props.children;
  }
}
