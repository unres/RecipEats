import React from 'react';
import Modal from "../Modal";
import { Button } from 'semantic-ui-react';

const INITIAL_STATE = {
  show: false,
  msg: "Show Modal"
};

class Recipe extends React.Component{
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE};
  }

  showModal = event => {
    this.setState({
      show: !this.state.show
    });
    if (this.state.show === false)
      this.setState({
        msg: "Hide Modal"
      });
    else
      this.setState({
        msg: "Show Modal"
      });
  };

  render() {
    return (
      <div className="recipe">
        <h1>Recipe</h1>
        <Button onClick={e => {
          this.showModal();
        }}
        > 
          {this.state.msg}
        </Button>
        <Modal onClose={this.showModal} show={this.state.show}>
          peepeepoopoo
        </Modal>
      </div>
    );
  }
}

export default Recipe;