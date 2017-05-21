import { Component } from 'react';

import type { Element } from 'react';

export default class ScrollToTop extends Component {
  props: {
    location: string,
    children: Element<*>,
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}
