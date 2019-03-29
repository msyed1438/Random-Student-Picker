import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Winner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.showWinner
      ? ReactDOM.createPortal(
          <div className="winner-modal">
            <div className="winner-message">The presentation on</div>
            <div className="winner-date">{this.props.nextDay}</div>
            <div className="winner-message">will be</div>
            <div className="winner-name">{this.props.winner}</div>
          </div>,
          document.getElementById("app")
        )
      : null;
  }
}

export default Winner;
