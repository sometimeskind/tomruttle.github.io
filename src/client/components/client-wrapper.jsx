// @flow

import { Component } from 'react';

import type { Element } from 'react';

export default class ClientWrapper extends Component {
  props: {
    children: Element<*>,
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return this.props.children;
  }
}
