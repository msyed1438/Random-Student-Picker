import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

class NameItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showName: this.props.showName,
      showCup: false,
      reveal: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showCup: true
      });
      console.log("key:", this.props.key);
      // this.props.handleWinner(this.props.keyInd, this.props.item);
    }, this.props.wait);
  }

  handleClick() {
    this.setState(
      {
        reveal: true,
        showName: true
      },
      this.props.handleWinner(this.props.key, this.props.item)
    );
  }

  render() {
    console.log("key in render:", this.props.key);

    if (!this.state.showCup)
      return (
        <div className="name-item">
          <span className="cup-holder" />
          <div className="name-text">
            {this.state.showName ? this.props.item : " "}
          </div>
        </div>
      );
    else {
      return (
        <CSSTransition
          in={this.props.showBlock}
          classNames="block"
          unmountOnExit
          timeout={5000}
          onExited={() => {
            this.setState({
              showValidationButton: true
            });
          }}
        >
          <React.Fragment>
            {/* <div className="name-item">
          {!this.state.showName ? null : this.props.item}
        </div> */}

            <div className="name-item">
              <span
                className={!this.state.reveal ? "cup slideDown" : "cup slideUp"}
                onClick={this.handleClick}
              />
              <div
                className={
                  this.state.showName ? "name-text" : "name-text-hidden"
                }
              >
                <span>{this.props.item}</span>
              </div>
            </div>
          </React.Fragment>
        </CSSTransition>
      );
    }
  }
}

export default NameItem;
