const foodData = {
  Proteins: {
    steak: {
      calories: '300',
      totalFat: '15',
      saturatedFat: '5',
      transFat: '0',
      protein: '30',
      carbohydrate: '0',
    },
    'ground beef': {
      calories: '200',
      totalFat: '10',
      saturatedFat: '4',
      transFat: '0',
      protein: '20',
      carbohydrate: '0',
    },
    chicken: {
      calories: '100',
      totalFat: '5',
      saturatedFat: '2',
      transFat: '0',
      protein: '15',
      carbohydrate: '0',
    },
    fish: {
      calories: '80',
      totalFat: '4',
      saturatedFat: '1',
      transFat: '0',
      protein: '10',
      carbohydrate: '0',
    },
    soy: {
      calories: '50',
      totalFat: '2',
      saturatedFat: '0',
      transFat: '0',
      protein: '5',
      carbohydrate: '2',
    },
  },
  Fruits: {
    orange: {
      calories: '300',
      totalFat: '1',
      saturatedFat: '0',
      transFat: '0',
      protein: '2',
      carbohydrate: '70',
    },
    banana: {
      calories: '200',
      totalFat: '1',
      saturatedFat: '0',
      transFat: '0',
      protein: '2',
      carbohydrate: '50',
    },
    pineapple: {
      calories: '100',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '1',
      carbohydrate: '25',
    },
    grapes: {
      calories: '80',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '1',
      carbohydrate: '20',
    },
    blueberries: {
      calories: '50',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '1',
      carbohydrate: '15',
    },
  },
  Vegetables: {
    romaine: {
      calories: '30',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '1',
      carbohydrate: '7',
    },
    'green beans': {
      calories: '40',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '2',
      carbohydrate: '10',
    },
    squash: {
      calories: '100',
      totalFat: '1',
      saturatedFat: '0',
      transFat: '0',
      protein: '2',
      carbohydrate: '20',
    },
    spinach: {
      calories: '50',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '5',
      carbohydrate: '8',
    },
    kale: {
      calories: '10',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '1',
      carbohydrate: '2',
    },
  },
  Dairy: {
    milk: {
      calories: '300',
      totalFat: '8',
      saturatedFat: '5',
      transFat: '0',
      protein: '8',
      carbohydrate: '12',
    },
    yoghurt: {
      calories: '200',
      totalFat: '10',
      saturatedFat: '6',
      transFat: '0',
      protein: '15',
      carbohydrate: '15',
    },
    'cheddar cheese': {
      calories: '200',
      totalFat: '16',
      saturatedFat: '10',
      transFat: '0',
      protein: '10',
      carbohydrate: '1',
    },
    'skim milk': {
      calories: '100',
      totalFat: '0',
      saturatedFat: '0',
      transFat: '0',
      protein: '10',
      carbohydrate: '12',
    },
    'cottage cheese': {
      calories: '80',
      totalFat: '2',
      saturatedFat: '1',
      transFat: '0',
      protein: '12',
      carbohydrate: '6',
    },
  },
  Grains: {
    bread: {
      calories: '200',
      totalFat: '2',
      saturatedFat: '0',
      transFat: '0',
      protein: '6',
      carbohydrate: '40',
    },
    bagel: {
      calories: '300',
      totalFat: '1',
      saturatedFat: '0',
      transFat: '0',
      protein: '11',
      carbohydrate: '60',
    },
    pita: {
      calories: '250',
      totalFat: '2',
      saturatedFat: '0',
      transFat: '0',
      protein: '8',
      carbohydrate: '50',
    },
    naan: {
      calories: '210',
      totalFat: '3',
      saturatedFat: '0',
      transFat: '0',
      protein: '5',
      carbohydrate: '40',
    },
    tortilla: {
      calories: '120',
      totalFat: '2',
      saturatedFat: '0',
      transFat: '0',
      protein: '3',
      carbohydrate: '22',
    },
  },
};
  
  export function updatevalue() {
    const categoriesValue = document.getElementById('Categories').value;
    const foodItemList = document.getElementById('Food_Items');
    foodItemList.innerHTML = '';
    for (const item_iter in foodData[categoriesValue]) {
      const item = document.createElement('option');
      item.value = item_iter;
      item.textContent = item_iter;
      foodItemList.appendChild(item);
    }
  }
  
// const lengthOfFoodData = Object.keys(foodData).length;

  export function moveItem() {
    var total_calories = 0;
    var total_fat=0;
    var total_sat_fat=0;
    var total_trans_fat=0;
    var total_protien=0;
    var total_carbohydrate=0

    const label_1 = document.getElementById('Calories_count');
    const label_2 = document.getElementById('Fats_count');
    const label_3 = document.getElementById('Fats_Sat_count');
    const label_4 = document.getElementById('Fats_Trans_count');
    const label_5 = document.getElementById('Fats_Protien_count');
    const label_6 = document.getElementById('Fats_Carbohydrate_count');

    const categoriesValue = document.getElementById('Categories').value;
    const foodItem = document.getElementById('Food_Items').value;
    const foodItemCalories = document.getElementById('Food_item_calories');

    //get the selected item
    const Food_item_selected = foodData[categoriesValue][foodItem];

    //move item
    const item = document.createElement('option');
    item.value = foodItem;
    item.textContent = foodItem;
    foodItemCalories.appendChild(item);

      for (let i = 0; i < foodItemCalories.options.length; i++) {
        const option = foodItemCalories.options[i].value;
        for (const category in foodData) {
          for (const item in foodData[category]) {
            if (foodData[category].hasOwnProperty(item)) {
              if (item==option) 
              {
                total_calories += parseInt(foodData[category][item]['calories'], 10);
                total_fat += parseInt(foodData[category][item]['totalFat'], 10);
                total_sat_fat += parseInt(foodData[category][item]['saturatedFat'], 10);
                total_trans_fat+= parseInt(foodData[category][item]['transFat'], 10);
                total_protien += parseInt(foodData[category][item]['protein'], 10);
                total_carbohydrate += parseInt(foodData[category][item]['carbohydrate'], 10);
            }
          }
        }
       }
    }
    label_1.textContent = total_calories;
    label_2.textContent = total_fat;
    label_3.textContent = total_sat_fat;
    label_4.textContent = total_trans_fat;
    label_5.textContent = total_protien;
    label_6.textContent = total_carbohydrate;
  }

  export function moveItemback() {

    var total_calories = 0;
    var total_fat=0;
    var total_sat_fat=0;
    var total_trans_fat=0;
    var total_protien=0;
    var total_carbohydrate=0

    const label_1 = document.getElementById('Calories_count');
    const label_2 = document.getElementById('Fats_count');
    const label_3 = document.getElementById('Fats_Sat_count');
    const label_4 = document.getElementById('Fats_Trans_count');
    const label_5 = document.getElementById('Fats_Protien_count');
    const label_6 = document.getElementById('Fats_Carbohydrate_count');

    const foodItemCalories = document.getElementById('Food_item_calories');

    const select = document.getElementById('Food_item_calories');
    const selectedOption = select.options[select.selectedIndex];
       if (selectedOption) {
         select.remove(selectedOption.index);
       }
       for (let i = 0; i < foodItemCalories.options.length; i++) {
        const option = foodItemCalories.options[i].value;
        for (const category in foodData) {
          for (const item in foodData[category]) {
            if (foodData[category].hasOwnProperty(item)) {
              if (item==option) 
              {
                total_calories += parseInt(foodData[category][item]['calories'], 10);
                total_fat += parseInt(foodData[category][item]['totalFat'], 10);
                total_sat_fat += parseInt(foodData[category][item]['saturatedFat'], 10);
                total_trans_fat+= parseInt(foodData[category][item]['transFat'], 10);
                total_protien += parseInt(foodData[category][item]['protein'], 10);
                total_carbohydrate += parseInt(foodData[category][item]['carbohydrate'], 10);
            }
          }
        }
       }
    }

    label_1.textContent = total_calories;
    label_2.textContent = total_fat;
    label_3.textContent = total_sat_fat;
    label_4.textContent = total_trans_fat;
    label_5.textContent = total_protien;
    label_6.textContent = total_carbohydrate;

  }

  export function addFoodItem() {
    const category = document.getElementById('category').value;
    const itemName = document.getElementById('itemName').value;
    const calories = document.getElementById('calories').value;
    const totalFat = document.getElementById('totalFat').value;
    const saturatedFat = document.getElementById('saturatedFat').value;
    const transFat = document.getElementById('transFat').value;
    const protein = document.getElementById('protein').value;
    const carbohydrate = document.getElementById('carbohydrate').value;

    const newItem = {
      calories,
      totalFat,
      saturatedFat,
      transFat,
      protein,
      carbohydrate,
    };

    if (!foodData.hasOwnProperty(category)) {
      foodData[category] = {};
    }

    foodData[category][itemName] = newItem;
    // var form = document.getElementById("addFoodForm");
      
    // // Reset the form
    // form.reset();
  }

  export function updateFoodItem()
  {
    const category = document.getElementById('category').value;
    const itemName = document.getElementById('itemName').value;
    const calories = document.getElementById('calories').value;
    const totalFat = document.getElementById('totalFat').value;
    const saturatedFat = document.getElementById('saturatedFat').value;
    const transFat = document.getElementById('transFat').value;
    const protein = document.getElementById('protein').value;
    const carbohydrate = document.getElementById('carbohydrate').value;
    
    foodData[category][itemName]['calories'] = calories;
    foodData[category][itemName]['totalFat'] = totalFat;
    foodData[category][itemName]['saturatedFat'] = saturatedFat;
    foodData[category][itemName]['transFat'] = transFat;
    foodData[category][itemName]['protein'] = protein;
    foodData[category][itemName]['carbohydrate'] = carbohydrate;

  }