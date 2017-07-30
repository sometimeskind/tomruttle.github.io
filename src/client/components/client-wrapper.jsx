// @flow

import { Component } from 'react';

import type { Element } from 'react';

export default class ClientWrapper extends Component {
  props: {
    children: Element<*>,
    logException: (error: mixed, info: mixed) => void,
  }

  state: { hasError: boolean } = {
    hasError: false,
  }

  componentDidCatch(error: mixed, info: mixed) {
    this.setState({ hasError: true });
    this.props.logException(error, info);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return this.props.children;
  }
}
