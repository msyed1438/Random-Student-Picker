import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.studentList.map(student => {
      this.state[student] = true;
    });
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return this.props.showSettings
      ? ReactDOM.createPortal(
          <div className="settings-modal">
            <div className="settings-window">
              <form className="student-selector">
                {this.props.studentList.map(student => {
                  return (
                    <label>
                      <input
                        name={student}
                        type="checkbox"
                        checked={this.state[student]}
                        onChange={this.handleInputChange}
                      />
                      {student}
                    </label>
                  );
                })}
              </form>
            </div>
          </div>,
          document.getElementById("app")
        )
      : null;
  }
}

export default Settings;
