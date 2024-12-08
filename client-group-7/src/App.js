import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Container, Col, Row,Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Categories from './Categories.js';
import Food_Items from './Food.js';


function App() {
  const [temp, settemp] = useState(0);
  const [globalArray, setGlobalArray] = useState([]);
  const [myList, setMyList] = useState([]);
  const [foodCategory, setFoodCategory] = useState('');
  const [food_item, setfood_item] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [total_fat, setTotalFats] = useState(0);
  const [total_sat_fat, setTotalFats_sat] = useState(0);
  const [total_trans_fat, setTotalFats_trans] = useState(0);
  const [total_protien, setTotalProtien] = useState(0);
  const [total_carbohydrate, setTotalCarbohydrate] = useState(0);
  const [itemselectback, setitemselectback] = useState('');
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);

  const toggleModal1 = () => setModal1(!modal1);
  const toggleModal2 = () => setModal2(!modal2);
  const toggleModal3 = () => setModal3(!modal3);
  const toggleModal4 = () => setModal4(!modal4);
  const toggleModal5 = () => setModal5(!modal5);
  const toggleModal6 = () => setModal6(!modal6);
  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [add_category, setadd_category] = useState('');
  const [delete_category, setdelete_category] = useState('');
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [calories, setCalories] = useState('');
  const [totalFat, setTotalFat] = useState('');
  const [saturatedFat, setSaturatedFat] = useState('');
  const [transFat, setTransFat] = useState('');
  const [protein, setProtein] = useState('');
  const [carbohydrate, setCarbohydrate] = useState('');
  const [goal_calories, setGoal] = useState(2000);
  const [goal_fat, setFat] = useState(2000);
  const [goal_sfat, setsFat] = useState(2000);
  const [goal_tfat, settFat] = useState(2000);
  const [goal_protein, setProt] = useState(2000);
  const [goal_carbohy, setCarbohy] = useState(2000);

  const handleUpdateGoalClick = (event) => {
    event.preventDefault();
    setGoal(goal_calories);
    setFat(goal_fat);
    setsFat(goal_sfat);
    settFat(goal_tfat);
    setProt(goal_protein);
    setCarbohy(goal_carbohy);
    toggleModal4();
  }

  const handleAddCategoryClick = (event) => {
    event.preventDefault();
    const newCategory = {
      add_category: add_category
    };
    fetch('http://localhost:4999/Add_Category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        this.fetchData();
        this.setState({
          add_category: ''
        });
        toggleModal1();
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
    toggleModal1();
  }

  const handleDeleteCategoryClick = (event) => {
    event.preventDefault();
    const newCategory1 = {
      delete_category: delete_category
    };
    fetch('http://localhost:4999/Delete_Category', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'delete_category': newCategory1.delete_category,
      },
      body: JSON.stringify(newCategory1),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        this.fetchData();
        this.setState({
          delete_category: ''
        });
        toggleModal2();
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
    toggleModal2();
  }
  

  const handleAddFoodItemClick = (event) => {
    event.preventDefault();
    const newFoodItem = {
      category: category,
      itemName: itemName,
      calories: calories,
      totalFat: totalFat,
      saturatedFat: saturatedFat,
      transFat: transFat,
      protein: protein,
      carbohydrate: carbohydrate
    };
  
    fetch('http://localhost:4999/Change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFoodItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        this.fetchData();
        this.setState({
          category: '',
          itemName: '',
          calories: '',
          totalFat: '',
          saturatedFat: '',
          transFat: '',
          protein: '',
          carbohydrate: ''
        });
        toggleModal3();
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
    toggleModal3();
  };

  const handleUpdateFoodItemClick = (event) => {
    event.preventDefault();

    const newFoodItem = {
      category: category,
      itemName: itemName,
      calories: calories,
      totalFat: totalFat,
      saturatedFat: saturatedFat,
      transFat: transFat,
      protein: protein,
      carbohydrate: carbohydrate
    };
  
    fetch('http://localhost:4999/Update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFoodItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        this.fetchData();
        this.setState({
          category: '',
          itemName: '',
          calories: '',
          totalFat: '',
          saturatedFat: '',
          transFat: '',
          protein: '',
          carbohydrate: ''
        });
        toggleModal4();
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
    toggleModal4();
  };
 
  const handleDeleteFoodItemClick = (event) => {
    event.preventDefault();

    const newFoodItem = {
      itemName1: itemName
    };
  
    fetch('http://localhost:4999/Delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'itemName': newFoodItem.itemName1,
      },
      body: JSON.stringify(newFoodItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        this.fetchData();
        this.setState({
          category: '',
          itemName: ''
        });
        toggleModal5();
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
    toggleModal5();
  };

  const handleCategoryChange = (event) => {
    setFoodCategory(event.target.value);
  };

  const SelectItemClick=(event)=> {
    setfood_item(event.target.value);
  };

  const addToGlobalArray = (rows) => {
    setGlobalArray((prevArray) => [...prevArray, ...rows]);
  };

  const processGlobalArray = (array) => {
    let cumulativeCalories = 0;
    let cumulativeFats = 0;
    let cumulativeFatsSat = 0;
    let cumulativeFatsTrans = 0;
    let cumulativeProtein = 0;
    let cumulativeCarbohydrate = 0;
    const updatedList = [];
    for (let i = 1; i < array.length; i += 9) {
      const newItem = array[i];
      cumulativeCalories += parseInt(array[i + 2], 10);
      if (cumulativeCalories <= goal_calories)
      {
        cumulativeFats += parseInt(array[i + 3], 10);
        cumulativeFatsSat += parseInt(array[i + 4], 10);
        cumulativeFatsTrans += parseInt(array[i + 5], 10);
        cumulativeProtein += parseInt(array[i + 6], 10);
        cumulativeCarbohydrate += parseInt(array[i + 7], 10);
        updatedList.push(newItem);
      }
      else
      {
        cumulativeCalories -= parseInt(array[i + 2], 10);
      }
      
      

    }
   
    return {
      
      updatedList,
      cumulativeCalories,
      cumulativeFats,
      cumulativeFatsSat,
      cumulativeFatsTrans,
      cumulativeProtein,
      cumulativeCarbohydrate,
    };
  };
  
  const handleMoveItemClick = () => {
    if (food_item.length !== 0)
    {
    setMyList([]);
    const dataArray = food_item.split(',');
    const updatedList = [];
    for (let i = 0; i < dataArray.length; i += 8) {
      const row = dataArray.slice(i, i + 8);
      addToGlobalArray(row);
    }
    const {
      updatedList: newList,
      cumulativeCalories,
      cumulativeFats,
      cumulativeFatsSat,
      cumulativeFatsTrans,
      cumulativeProtein,
      cumulativeCarbohydrate,
    } = processGlobalArray(globalArray);
    setTotalCalories(cumulativeCalories);
    setTotalFats(cumulativeFats);
    setTotalFats_sat(cumulativeFatsSat);
    setTotalFats_trans(cumulativeFatsTrans);
    setTotalProtien(cumulativeProtein);
    setTotalCarbohydrate(cumulativeCarbohydrate);
    setMyList(newList);
  }
  };
  
  useEffect(() => {
    setMyList([]);
    const {
      updatedList,
      cumulativeCalories,
      cumulativeFats,
      cumulativeFatsSat,
      cumulativeFatsTrans,
      cumulativeProtein,
      cumulativeCarbohydrate,
    } = processGlobalArray(globalArray);
    setTotalCalories(cumulativeCalories);
    setTotalFats(cumulativeFats);
    setTotalFats_sat(cumulativeFatsSat);
    setTotalFats_trans(cumulativeFatsTrans);
    setTotalProtien(cumulativeProtein);
    setTotalCarbohydrate(cumulativeCarbohydrate);
    setMyList(updatedList);
  }, [globalArray]);

  const handleMoveItembackClick = () => {
    setMyList((prevList) => {
      const updatedList = [...prevList];
      let j = 1;
      for (let columnIndex = 0; columnIndex < globalArray.length / 9; columnIndex++) {
        if (globalArray[j] === itemselectback) {
          const cal = totalCalories - parseInt(globalArray[j + 2], 10);
          const fats = total_fat - parseInt(globalArray[j + 3], 10);
          const sat_fats = total_sat_fat - parseInt(globalArray[j + 4], 10);
          const fats_trans = total_trans_fat - parseInt(globalArray[j + 5], 10);
          const proteins_total = total_protien - parseInt(globalArray[j + 6], 10);
          const carbo = total_carbohydrate - parseInt(globalArray[j + 7], 10);
          setTotalCalories(cal);
          setTotalFats(fats);
          setTotalFats_sat(sat_fats);
          setTotalFats_trans(fats_trans);
          setTotalProtien(proteins_total);
          setTotalCarbohydrate(carbo);
          const indexToRemove = updatedList.findIndex((item) => item === itemselectback);
          if (indexToRemove !== -1) {
            updatedList.splice(indexToRemove, 1);
            setitemselectback('');
          }
        }
        j = j + 9;
      }

      return updatedList;

    });
  };
  const handleremoveItemonclick  =  (e) => {
    setitemselectback(e.target.value);
    
  };

  return (
    <Container>
      <Row xs="1" sm="1" md="1" lg="1">
        <Col>
        <h1 style={{textAlign:"center"}}>NutriKit Food Planner</h1>
        <h3 style={{textAlign:"center"}}>NutriKit allows you to select your groceries and track your nutritional progress</h3>
        </Col>
        </Row>
      <Row xs="1" sm="1" md="3" lg="3" style={{ marginBottom: '10px' }}>
        <Col>
        </Col>
      <Col>
          <Button id="button1" color="primary" style={{ width: '35%' }} onClick={handleMoveItemClick}> &gt;&gt; </Button>
          </Col>
          <Col>
          <Button id="button2" color="primary" style={{ width: '35%' }} onClick={handleMoveItembackClick}>&lt;&lt;</Button>
      </Col>
      </Row>

      <Row  xs="1" sm="1" md="3" lg="3">
      <Col className="my-3">
          <Categories style={{ backgroundColor: '#808000' }} handleCategoryChange={handleCategoryChange}></Categories> 
        </Col>
      <Col>
      <Food_Items Food_item={foodCategory} SelectItemClick ={SelectItemClick}></Food_Items>
      </Col>
      <Col>
      <Input type="select" size="5" id="Food_Items" style={{ backgroundColor: '#AF9B60' }} value={itemselectback}  onClick={(e) => handleremoveItemonclick(e)}>
        {myList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </Input>
      </Col>
      </Row>
      <Row xs="1" sm="1" md="6" lg="6" style={{ marginBottom: '20px', marginTop: '20px' }}>
      <Col>
<div style={{ marginLeft: '1%' }}>
<Button color="primary" onClick={toggleModal1}>Add Food Category</Button>
 <Modal isOpen={modal1} toggle={toggleModal1}>
   <ModalHeader toggle={toggleModal1}>Category Details</ModalHeader>
   <ModalBody>
   <Form>
       <FormGroup>
         <Label for="category">Category:</Label>
         <Input type="text" id="add_category" name="add_category" placeholder="Enter category name" value={add_category} onChange={(e) => setadd_category(e.target.value)} required />
       </FormGroup>
       </Form>
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={handleAddCategoryClick}>Add Category</Button>{' '}
         <Button color="secondary" onClick={toggleModal1}>Cancel</Button>
       </ModalFooter>
     </Modal>
     </div>
     </Col>
     <Col>
<div style={{ marginLeft: '1%' }}>
<Button color="primary" onClick={toggleModal2}>Delete Category</Button>
 <Modal isOpen={modal2} toggle={toggleModal2}>
   <ModalHeader toggle={toggleModal2}>Category Details</ModalHeader>
   <ModalBody>
   <Form>
       <FormGroup>
         <Label for="delete_category">Category:</Label>
         <Input type="text" id="delete_category" name="delete_category" placeholder="Enter category name" value={delete_category} onChange={(e) => setdelete_category(e.target.value)} required />
       </FormGroup>
       </Form>
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={handleDeleteCategoryClick}>Delete Category</Button>{' '}
         <Button color="secondary" onClick={toggleModal2}>Cancel</Button>
       </ModalFooter>
     </Modal>
     </div>
     </Col>
<Col>
<div style={{ marginLeft: '1%' }}>
<Button color="primary" onClick={toggleModal3}>Add New Food</Button>
 <Modal isOpen={modal3} toggle={toggleModal3}>
   <ModalHeader toggle={toggleModal3}>Food Item Details</ModalHeader>
   <ModalBody>
   <Form>
       <FormGroup>
         <Label for="category">Category:</Label>
         <Input type="text" id="category" name="category" placeholder="Enter category (e.g., Proteins)" value={category} onChange={(e) => setCategory(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="itemName">Item Name:</Label>
         <Input type="text" id="itemName" name="itemName" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="calories">Calories:</Label>
         <Input type="text" id="calories" name="calories" placeholder="Enter calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="totalFat">Total Fat:</Label>
         <Input type="text" id="totalFat" name="totalFat" placeholder="Enter total fat" value={totalFat} onChange={(e) => setTotalFat(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="saturatedFat">Saturated Fat:</Label>
         <Input type="text" id="saturatedFat" name="saturatedFat" placeholder="Enter saturated fat" value={saturatedFat} onChange={(e) => setSaturatedFat(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="transFat">Trans Fat:</Label>
         <Input type="text" id="transFat" name="transFat" placeholder="Enter trans fat" value={transFat} onChange={(e) => setTransFat(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="protein">Protein:</Label>
         <Input type="text" id="protein" name="protein" placeholder="Enter protein"  value={protein} onChange={(e) => setProtein(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="carbohydrate">Carbohydrate:</Label>
         <Input type="text" id="carbohydrate" name="carbohydrate" placeholder="Enter carbohydrate"  value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} required />
       </FormGroup>
       </Form>
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={handleAddFoodItemClick}>Add Food Item</Button>{' '}
         <Button color="secondary" onClick={toggleModal3}>Cancel</Button>
       </ModalFooter>
     </Modal>
     </div>
     </Col>
     <Col>
     <div style={{ marginLeft: '1%' }}>
<Button color="primary" onClick={toggleModal4}>Update Food</Button>{' '}
 <Modal isOpen={modal4} toggle={toggleModal4}>
   <ModalHeader toggle={toggleModal4}>Food Item Details</ModalHeader>
   <ModalBody>
   <Form>
       <FormGroup>
         <Label for="category">Category:</Label>
         <Input type="text" id="category" name="category" placeholder="Enter category (e.g., Proteins)" value={category} onChange={(e) => setCategory(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="itemName">Item Name:</Label>
         <Input type="text" id="itemName" name="itemName" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="calories">Calories:</Label>
         <Input type="text" id="calories" name="calories" placeholder="Enter calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="totalFat">Total Fat:</Label>
         <Input type="text" id="totalFat" name="totalFat" placeholder="Enter total fat" value={totalFat} onChange={(e) => setTotalFat(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="saturatedFat">Saturated Fat:</Label>
         <Input type="text" id="saturatedFat" name="saturatedFat" placeholder="Enter saturated fat" value={saturatedFat} onChange={(e) => setSaturatedFat(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="transFat">Trans Fat:</Label>
         <Input type="text" id="transFat" name="transFat" placeholder="Enter trans fat" value={transFat} onChange={(e) => setTransFat(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="protein">Protein:</Label>
         <Input type="text" id="protein" name="protein" placeholder="Enter protein"  value={protein} onChange={(e) => setProtein(e.target.value)} required />
       </FormGroup>
       <FormGroup>
         <Label for="carbohydrate">Carbohydrate:</Label>
         <Input type="text" id="carbohydrate" name="carbohydrate" placeholder="Enter carbohydrate"  value={carbohydrate} onChange={(e) => setCarbohydrate(e.target.value)} required />
       </FormGroup>
       </Form>
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={handleUpdateFoodItemClick}>Add Food Item</Button>{' '}
         <Button color="secondary" onClick={toggleModal4}>Cancel</Button>
       </ModalFooter>
     </Modal>
     </div>
     </Col>
     
     <Col>
     <div style={{ marginLeft: '1%' }}>
<Button color="primary" onClick={toggleModal5}>Delete Food</Button>{' '}
 <Modal isOpen={modal5} toggle={toggleModal5}>
   <ModalHeader toggle={toggleModal5}>Food Item Details</ModalHeader>
   <ModalBody>
   <Form>
       <FormGroup>
         <Label for="itemName">Item Name:</Label>
         <Input type="text" id="itemName" name="itemName" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
       </FormGroup>
       </Form>
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={handleDeleteFoodItemClick}>Delete Food Item</Button>{' '}
         <Button color="secondary" onClick={toggleModal5}>Cancel</Button>
       </ModalFooter>
     </Modal>
     </div>
     </Col>
     <Col>
     <div style={{ marginLeft: '1%' }}>
<Button color="primary" onClick={toggleModal6}>Nutrition Goal</Button>{' '}
 <Modal isOpen={modal6} toggle={toggleModal6}>
   <ModalHeader toggle={toggleModal6}>Set Maximum Calories</ModalHeader>
   <ModalBody>
   <Form>
       <FormGroup>
         <Label for="goal_1" style={{color:'red'}}>Maximum Calories (Caution-- Diabetes patient should not set Calories goal more than 2000):</Label>
         <Label for="goal_1">Maximum Calories:</Label>
         <Input type="text" id="goal_1" name="goal_1" placeholder="Enter max calories" value={goal_calories} onChange={(e) => setGoal(e.target.value)} required />
         <Label for="goal_2" style={{color:'red'}}>Maximum Fats (Caution-- Heart patients should not set Fats goal more than 2000):</Label>
         <Input type="text" id="goal_2" name="goal_2" placeholder="Enter max fats" value={goal_fat} onChange={(e) => setFat(e.target.value)} required />
         <Label for="goal_3">Maximum Saturated Fats:</Label>
         <Input type="text" id="goal_3" name="goal_3" placeholder="Enter max saturated fats" value={goal_sfat} onChange={(e) => setsFat(e.target.value)} required />
         <Label for="goal_4">Maximum TransFats:</Label>
         <Input type="text" id="goal_4" name="goal_4" placeholder="Enter max transfats" value={goal_tfat} onChange={(e) => settFat(e.target.value)} required />
         <Label for="goal_5" style={{color:'red'}}>Maximum Proteins (Caution-- Kidney patients should not set Proteins goal more than 2000):</Label>
         <Input type="text" id="goal_5" name="goal_5" placeholder="Enter max proteins" value={goal_protein} onChange={(e) => setProt(e.target.value)} required />
         <Label for="goal_6">Maximum Carbohydrates:</Label>
         <Input type="text" id="goal_6" name="goal_6" placeholder="Enter max carbohydrates" value={goal_carbohy} onChange={(e) => setCarbohy(e.target.value)} required />
       </FormGroup>
       </Form>
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={handleUpdateGoalClick}>Update Goal</Button>{' '}
         <Button color="secondary" onClick={toggleModal6}>Cancel</Button>
       </ModalFooter>
     </Modal>
     </div>
     </Col>
  </Row>

  <Row  xs="1" sm="1" md="3" lg="3">
    <Col></Col>
    <Col></Col>
  <Col style={{ backgroundColor: '#FF0000' }} className="d-flex justify-content-left ml-auto">
    <label>Total Calories:</label>
    <label id="Calories_count">{totalCalories}</label>
  </Col>
</Row>
  <Row xs="1" sm="1" md="3" lg="3">
  <Col></Col>
    <Col></Col>
  <Col style={{ backgroundColor: '#CCFB5D' }} className="d-flex justify-content-left ml-auto">
  <label>Total Fats:</label>
  <label id="Fats_count">{total_fat}</label>
  </Col>
</Row>
  <Row  xs="1" sm="1" md="3" lg="3">
  <Col></Col>
    <Col></Col>
  <Col style={{ backgroundColor: '#665D1E' }} className="d-flex justify-content-left ml-auto">
  <label>Total Saturated Fats:</label>
  <label id="Fats_Sat_count">{total_sat_fat}</label>
  </Col>
</Row>
  <Row  xs="1" sm="1" md="3" lg="3">
  <Col></Col>
    <Col></Col>
  <Col style={{ backgroundColor: '#835C3B' }} className="d-flex justify-content-left ml-auto">
  <label>Total TransFats:</label>
  <label id="Fats_Trans_count">{total_trans_fat}</label>
  </Col>
</Row>
  <Row  xs="1" sm="1" md="3" lg="3">
  <Col></Col>
    <Col></Col>
  <Col style={{ backgroundColor: '#C36241' }} className="d-flex justify-content-left ml-auto">
  <label>Total Proteins:</label>
  <label id="Fats_Protien_count">{total_protien}</label>
  </Col>
</Row>
  <Row  xs="1" sm="1" md="3" lg="3">
  <Col></Col>
    <Col></Col>
  <Col style={{ backgroundColor: '#FF5F1F' }} className="d-flex justify-content-left ml-auto">
  <label>Total Carbohydrate:</label>
  <label id="Fats_Carbohydrate_count">{total_carbohydrate}</label>
</Col>
</Row>
<Row xs="1" sm="1" md="6" lg="6">

</Row>
<Row  xs="1" sm="1" md="1" lg="1">
<label style={{ fontWeight: 'bold' }}>Goal Progress</label>
<label>Calories: </label>
<Progress id="progress" value={totalCalories} max={goal_calories} style={{backgroundColor: 'red'}} />
<label>Fats: </label>
<Progress id="progress" value={total_fat} max={goal_fat} style={{ backgroundColor: '#CCFB5D' }}/>
<label>Saturated Fats: </label>
<Progress id="progress" value={total_sat_fat} max={goal_sfat} style={{ backgroundColor: '#665D1E' }} />
<label>TransFats: </label>
<Progress id="progress" value={total_trans_fat} max={goal_tfat} style={{ backgroundColor: '#835C3B' }}/>
<label>Proteins: </label>
<Progress id="progress" value={total_protien} max={goal_protein} style={{ backgroundColor: '#C36241' }}/>
<label>Carbohydrates: </label>
<Progress id="progress" value={total_carbohydrate} max={goal_carbohy} style={{ backgroundColor: '#FF5F1F' }}/>
</Row>
</Container>
    
  );
}

export default App;

 