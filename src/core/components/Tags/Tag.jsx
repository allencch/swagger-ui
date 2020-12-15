import React from 'react';
import PropTypes from "prop-types"
import { escapeDeepLinkPath } from "core/utils"

export default class Tag extends React.Component {
  static defaultProps = {
    tag: ''
  }
  static propTypes = {
    tag: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { tag } = this.props;
    const isShownKey = ["operations-tag", tag];
    const id = isShownKey.map(v => escapeDeepLinkPath(v)).join('-');
    const elem = document.querySelector(`#${id}`);
    if (!elem) return;

    elem.scrollIntoView(true);
  }

  render() {
    const { tag } = this.props
    return (
      <div style={{ cursor: 'pointer' }} onClick={this.onClick}>
        <h5>{tag}</h5>
      </div>
    )
  }
}
