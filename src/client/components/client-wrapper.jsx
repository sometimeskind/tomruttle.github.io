// @flow

import { Component } from 'react';

import type { Node } from 'react';

type Props = {
  children: Node,
  logException: (error: mixed, info: mixed) => void,
};

type State = {
  hasError: boolean,
};

export default class ClientWrapper extends Component<Props, State> {
  componentDidCatch(error: mixed, info: mixed) {
    const { logException } = this.props;

    logException(error, info);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render = () => {
    const { children } = this.props;

    return children;
  }
}
