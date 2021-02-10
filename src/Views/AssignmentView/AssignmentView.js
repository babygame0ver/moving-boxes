import React from "react";
import "./style.css";

class AssignmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      active: -1,
      toggle: true,
    };
  }

  componentDidMount() {
    document.title = "Assignment";
    document.addEventListener("keydown", this.startMovement);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  isMovementAllowed = (elem, direction) => {
    /* 
    Function to Compute whether the box is going out
    of the fence or not
     */
    const elementCoOrdinates = elem.getBoundingClientRect();
    const fence = document.getElementById("box-fence");
    const fenceCoOrdinates = fence.getBoundingClientRect();
    switch (direction) {
      case "up":
        return elementCoOrdinates.y - 15 > fenceCoOrdinates.y;
      case "down":
        return elementCoOrdinates.bottom + 10 < fenceCoOrdinates.bottom;
      case "left":
        return elementCoOrdinates.x - 15 > fenceCoOrdinates.x;
      case "right":
        return elementCoOrdinates.right + 10 < fenceCoOrdinates.right;
      default:
        return false;
    }
  };

  deleteElementAndSetActive = (element) => {
    /*
    Deleting Node and Setting First one as active
    */
    element.remove();
    let fence = document.getElementById("box-fence");
    if (fence.children.length > 1) {
      this.selectAndMakeDivActiveForMovement(
        parseInt(fence.children[0].id.split("-").pop())
      );
    } else {
      this.selectAndMakeDivActiveForMovement(-1);
    }
  };

  startMovement = (event) => {
    /*
    Move selected box on Keyboard press WASD
    */
    const { active, toggle } = this.state;
    if (active != -1) {
      const { key } = event;
      const element = document.getElementById(`box-id-${active}`);
      if (key == "Delete") {
        this.deleteElementAndSetActive(element);
      } else {
        if (toggle) {
          let direction = "";
          switch (key) {
            case "w":
              direction = "up";
              break;
            case "W":
              direction = "up";
              break;
            case "A":
              direction = "left";
              break;
            case "a":
              direction = "left";
              break;
            case "s":
              direction = "down";
              break;
            case "S":
              direction = "down";
              break;
            case "D":
              direction = "right";
              break;
            case "d":
              direction = "right";
              break;
          }
          let newValue = "";
          let previousValue = "";
          if (element) {
            if (this.isMovementAllowed(element, direction)) {
              switch (direction) {
                case "up":
                  previousValue = element.style.top ? element.style.top : 0;
                  newValue = `${parseInt(previousValue, 10) - 10}px`;
                  element.style.top = newValue;
                  break;
                case "down":
                  previousValue = element.style.top ? element.style.top : 0;
                  newValue = `${parseInt(previousValue, 10) + 10}px`;
                  element.style.top = newValue;
                  break;
                case "left":
                  previousValue = element.style.left ? element.style.left : 0;
                  newValue = `${parseInt(previousValue, 10) - 10}px`;
                  element.style.left = newValue;
                  break;
                case "right":
                  previousValue = element.style.left ? element.style.left : 0;
                  newValue = `${parseInt(previousValue, 10) + 10}px`;
                  element.style.left = newValue;
                  break;
              }
            }
          }
        }
      }
    }
  };

  selectAndMakeDivActiveForMovement = (index) => {
    this.setState({
      active: index,
    });
  };

  addBoxes = () => {
    const boxes = Object.assign(this.state.boxes);
    let total = boxes.length;
    boxes.push(`box-${total}`);
    this.setState({
      boxes,
    });
  };

  toggleControls = (event) => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  render() {
    const { boxes, active } = this.state;
    return (
      <div className="container">
        <input
          className="button-primary"
          type="button"
          value="Add Box"
          onClick={this.addBoxes}
        />
        <label class="switch">
          <input
            type="checkbox"
            checked={this.state.toggle}
            onChange={this.toggleControls}
          />
          <span class="slider round"></span>
        </label>
        <div id="box-fence" className="content">
          {boxes.map((box, index) => {
            return (
              <div
                id={`box-id-${index}`}
                style={{ zIndex: index }}
                key={index}
                className={active === index ? "boxes active-box" : "boxes"}
                onClick={() => this.selectAndMakeDivActiveForMovement(index)}
              >
                {active === index ? `Selected : ${index}` : index}
              </div>
            );
          })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default AssignmentView;
