import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Input } from 'reactstrap';
import './Categories.css'; // Import the stylesheet

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  updateData = (apiResponse) => {
    this.setState({ data: apiResponse });
  }

  fetchData = () => {
    fetch(`http://localhost:4999/Categories`)
      .then((response) => {
        if (response.status === 200) {
          return (response.json());
        } else {
          return ([["status ", response.status]]);
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
    this.fetchData();
  }

  render() {
    if (this.state.data === null || this.state.data === "")
      return (<div><p>No data returned from server</p></div>)
    else {
      const { handleCategoryChange } = this.props;
      const categories = this.state.data;
      return (
        <Input type="select" id="Categories" className="categories-select" onChange={handleCategoryChange}>
          <option value="">Select Food Category</option>
          {categories.map((name, index) => (
            <option key={index} value={name[1]}>
              {name[1]}
            </option>
          ))}
        </Input>
      )
    }
  }
}

export default Categories;