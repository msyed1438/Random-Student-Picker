import React from "react";
import ReactDOM from "react-dom";
import students from "../cohort-data/hrnyc21";
import NameItem from "./nameItem.jsx";
import ClassList from "./classList.jsx";
import RandomClassList from "./randomClassList.jsx";
import Winner from "./winner.jsx";
import Settings from "./settings.jsx";
import randomize from "./../randomizer.js";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentList: students,
      adjustedStudentList: students,
      randomizedStudents: null,
      itemToAdd: "",
      currentNumber: 1,
      showNormal: true,
      showBlock: true,
      showWinner: false,
      showSettings: false,
      randomized: false,
      winner: null,
      listKey: 0,
      nextDay: "Tuesday, 02/26/19"
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.randomizeClass = this.randomizeClass.bind(this);
    this.handleWinner = this.handleWinner.bind(this);
    this.saveWinnerToSpreadsheet = this.saveWinnerToSpreadsheet.bind(this);
    this.showWinner = this.showWinner.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.adjustStudentList = this.adjustStudentList.bind(this);
    this.resetCups = this.resetCups.bind(this);
  }

  randomizeClass() {
    this.setState({
      showBlock: false
    });
    var orderedStudents = this.state.adjustedStudentList;

    setTimeout(() => {
      this.setState({
        showNormal: false,
        showBlock: true,
        randomized: true,
        randomizedStudents: randomize(orderedStudents)
      });
    }, 1200);
  }

  handleNumberChange(e) {
    e.preventDefault();
    var newNumber = e.target.value;
    console.log("Number Selection", newNumber);
    this.setState({
      currentNumber: parseInt(newNumber)
    });
  }

  saveWinnerToSpreadsheet(winner) {
    console.log("save winner to sp called", winner);
    axios.post("/sp", {
      winner: winner
    });
  }

  toggleSettings() {
    this.setState({
      showSettings: !this.state.showSettings
    });
  }

  adjustStudentList(studentList) {
    this.setState({
      adjustedStudentList: studentList,
      listKey: this.state.listKey + 1
    });
    this.resetCups();
  }

  resetCups() {
    this.setState({
      showNormal: true,
      showBlock: true,
      randomized: false
    });
  }

  showWinner() {
    this.setState({
      showWinner: true
    });
  }

  handleWinner(ind, name) {
    if (this.state.randomized) {
      console.log("winner is", name);
      this.setState(
        {
          winner: name
        },
        () => {
          // this.saveWinnerToSpreadsheet(this.state.winner);
        }
      );
      setTimeout(() => {
        this.showWinner();
      }, 750);
    }
  }

  render() {
    // let copy = this.state.studentList.slice();
    // let randomList = randomize(copy);

    // if (this.state.showWinner) {
    //   return (
    //     <div>
    //       PRESENTER IS {this.state.winner} ON {this.state.nextDay}
    //     </div>
    //   );
    // }
    return (
      <div className="container">
        <button className="settings-button" onClick={this.toggleSettings}>
          S
        </button>
        <h1 className="title">Random Student Picker</h1>
        {/* <div className="pickNumber">
            <select value={this.state.value} onChange={this.handleNumberChange}>
              {students.map((name, ind) => {
                return <option value={ind + 1}>{ind + 1}</option>;
              })}
            </select> */}
        <Winner
          showWinner={this.state.showWinner}
          winner={this.state.winner}
          nextDay={this.state.nextDay}
        />

        <Settings
          showSettings={this.state.showSettings}
          studentList={this.state.studentList}
          adjustStudentList={this.adjustStudentList}
          toggleSettings={this.toggleSettings}
        />

        {this.state.showNormal ? (
          <ClassList
            key={this.state.listKey}
            showBlock={this.state.showBlock}
            students={this.state.adjustedStudentList}
            handleWinner={this.handleWinner}
          />
        ) : (
          <RandomClassList
            key={this.state.listKey}
            showBlock={this.state.showBlock}
            students={this.state.randomizedStudents}
            handleWinner={this.handleWinner}
          />
        )}
        <button className="button" onClick={this.randomizeClass}>
          Randomize Class
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
