// @flow

import { Component } from 'react';

import type { Element } from 'react';

type Props = {
  children: Element<*>,
  logException: (error: mixed, info: mixed) => void,
};

type State = {
  hasError: boolean,
};

export default class ClientWrapper extends Component<Props, State> {
  state = {
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
