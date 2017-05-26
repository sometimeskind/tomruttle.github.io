// @flow

import { Component } from 'react';
import PropTypes from 'prop-types';

import type { Element } from 'react';

export default class ClientWrapper extends Component {
  props: {
    css: Set<string>,
    children: Element<*>,
  }

  static childContextTypes = {
    insertCss: PropTypes.func,
  }

  getChildContext() {
    const css = this.props.css;

    return {
      insertCss(...styles: Array<{ _insertCss: Function }>) { return styles.forEach(style => css.add(style._insertCss())); },
    };
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return this.props.children;
  }
}
