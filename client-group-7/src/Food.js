import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect, useState } from 'react';
import { Input, Button, Form, FormGroup, Label, Col } from 'reactstrap';
import './Food.css'; // Import the stylesheet
import Categories from './Categories';
import Navbar from './Navbar'; // Import the Navbar component

class Food_Items extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  updateData = (apiResponse) => {
    this.setState({ data: apiResponse });
  }

  fetchData = (Food_item) => {
    fetch(`http://localhost:4999/Food_items/${Food_item}`)
      .then((response) => {
        if (response.status === 200) {
          return (response.json());
        } else {
          return ([[" "]]);
        }
      })
      .then((jsonOutput) => {
        this.updateData(jsonOutput);
      })
      .catch((error) => {
        console.log(error);
        this.updateData("");
      });
  }

  componentDidMount() {
    this.fetchData(this.props.Food_item);
  }

  componentDidUpdate(prevProps) {
    if (this.props.Food_item !== prevProps.Food_item) {
      this.fetchData(this.props.Food_item);
    }
  }

  render() {
    if (this.state.data === null || this.state.data === "")
      return (<div><p>No data returned from server</p></div>)
    else {
      const { SelectItemClick } = this.props;
      const items = this.state.data;
      return (
        <Input type="select" size="5" id="Food_Items" className="food-items-select" onClick={SelectItemClick}>
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item[1]}
            </option>
          ))}
        </Input>
      )
    }
  }
}

const AddFoodItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    calories: '',
    totalFat: '',
    saturatedFat: '',
    transFat: '',
    protein: '',
    carbohydrate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4999/Change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Food item added:', data);
      })
      .catch(error => {
        console.error('Error adding food item:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="food-form">
      <FormGroup row>
        <Label for="itemName" sm={2}>Item Name</Label>
        <Col sm={10}>
          <Input type="text" name="itemName" id="itemName" value={formData.itemName} onChange={handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="category" sm={2}>Category</Label>
        <Col sm={10}>
          <Input type="text" name="category" id="category" value={formData.category} onChange={handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="calories" sm={2}>Calories</Label>
        <Col sm={10}>
          <Input type="number" name="calories" id="calories" value={formData.calories} onChange={handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="totalFat" sm={2}>Total Fat</Label>
        <Col sm={10}>
          <Input type="number" name="totalFat" id="totalFat" value={formData.totalFat} onChange={handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="saturatedFat" sm={2}>Saturated Fat</Label>
        <Col sm={10}>
          <Input type="number" name="saturatedFat" id="saturatedFat" value={formData.saturatedFat} onChange={handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="transFat" sm={2}>Trans Fat</Label>
        <Col sm={10}>
          <Input type="number" name="transFat" id="transFat" value={formData.transFat} onChange={handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="protein" sm={2}>Protein</Label>
        <Col sm={10}>
          <Input type="number" name="protein" id="protein" value={formData.protein} onChange={handleChange} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="carbohydrate" sm={2}>Carbohydrate</Label>
        <Col sm={10}>
          <Input type="number" name="carbohydrate" id="carbohydrate" value={formData.carbohydrate} onChange={handleChange} />
        </Col>
      </FormGroup>
      <Button type="submit" color="primary">Add Food Item</Button>
    </Form>
  );
};

const Food = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleItemClick = (e) => {
    setSelectedItem(e.target.value);
  };

  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <div className="food-container">
        <h1>Food Management</h1>
        <Categories handleCategoryChange={handleCategoryChange} />
        <Food_Items Food_item={selectedCategory} SelectItemClick={handleItemClick} />
        <AddFoodItem />
      </div>
    </div>
  );
};

export default Food;