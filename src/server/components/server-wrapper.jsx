// @flow

import { Component } from 'react';
import PropTypes from 'prop-types';

import type { Element } from 'react';

export default class ContextWrapper extends Component {
  props: {
    children: Element<*>,
    css: Set<string>,
  }

  static childContextTypes = {
    insertCss: PropTypes.func,
  }

  getChildContext() {
    const css = this.props.css;

    return {
      insertCss(...styles: Array<{ _getCss: Function }>) { return styles.forEach(style => css.add(style._getCss())); },
    };
  }

  render() {
    return this.props.children;
  }
}
