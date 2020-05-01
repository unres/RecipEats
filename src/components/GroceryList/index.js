import React from 'react';
import {Button, Modal, Form} from 'semantic-ui-react';


import '../GroceryList/grocery.css'

class GroceryList extends React.Component{

  constructor(props) {
    super(props);

    this.state = { ingredientList: [], addIngredient: "", showModal : false };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    this.setState({ showModal: false })
      var temp = this.state.ingredientList.concat(this.state.addIngredient) 
      this.setState({ ingredientList : temp})
  };


render(){
  const { showModal} = this.state;
  console.log(this.state.ingredientList)
  return(  <div className='grocery'>
    <Modal trigger={<Button onClick={() => this.setState({ showModal: true })}>Add Item</Button>} closeIcon open={showModal}>
      <Modal.Content>
        <Form onSubmit={this.onSubmit}>
          <Form.Input name="addIngredient" onChange={this.onChange} label="Ingredient" placeholder="Ingredient" /> 
          <Button type='submit' onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Modal.Content> 
    </Modal>
  <h1>Grocery List</h1>
</div>)
}


}

export default GroceryList;