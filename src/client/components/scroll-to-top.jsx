// @flow

import { Component } from 'react';

type ScrollToTopProps = {
  location?: string,
};

export default class ScrollToTop extends Component {
  props: ScrollToTopProps

  static defaultProps = {
    location: '',
  }

  componentDidUpdate(prevProps: ScrollToTopProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}
