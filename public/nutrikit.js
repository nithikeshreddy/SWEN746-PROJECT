document.addEventListener("DOMContentLoaded", function() {
    // Food data 
  
    const foodCategories = document.getElementById("foodCategories");
    const foodItems = document.getElementById("foodItems");
    const selectedItems = document.getElementById("selectedItems");
    const totalCaloriesDisplay = document.getElementById("totalCalories");
    const addItemButton = document.getElementById("addItemButton");
    const removeItemButton = document.getElementById("removeItemButton");
  
    let selectedCategory = null;
  
    // Function to populate the food items based on the selected category
    foodCategories.addEventListener("change", function() {
      selectedCategory = foodCategories.value;
      populateFoodItems();
    });
  
    function populateFoodItems() {
      foodItems.innerHTML = "";
      const items = foodData[selectedCategory];
      items.forEach(item => {
        const option = document.createElement("option");
        option.text = `${item.name} - ${item.calories} calories`;
        option.value = item.name;
        foodItems.add(option);
      });
    }
  
    // Add and remove items functionality
    addItemButton.addEventListener("click", function() {
      const selectedFood = foodItems.options[foodItems.selectedIndex];
      if (selectedFood) {
        const option = document.createElement("option");
        option.text = selectedFood.text;
        option.value = selectedFood.value;
        selectedItems.add(option);
        updateTotalCalories();
      }
    });
  
    removeItemButton.addEventListener("click", function() {
      const selectedOption = selectedItems.options[selectedItems.selectedIndex];
      if (selectedOption) {
        selectedItems.removeChild(selectedOption);
        updateTotalCalories();
      }
    });

    selectedItems.addEventListener("change", updateTotalCalories);
  
    function updateTotalCalories() {
      let totalCalories = 0;
      const selectedOptions = [...selectedItems.options];
      selectedOptions.forEach(option => {
        totalCalories += getCaloriesByName(option.value);
      });
      totalCaloriesDisplay.textContent = totalCalories;
    }
  
    function getCaloriesByName(name) {
      const items = foodData[selectedCategory];
      const selected = items.find(item => item.name === name);
      return selected ? selected.calories : 0;
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const foodCategory = document.getElementById('foodCategory');
    const foodList = document.getElementById('foodList');
    const selectedItems = document.getElementById('selectedItems');
    const totalCalories = document.getElementById('totalCalories');
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');
  
    const foodData = {
      proteins: [
        { name: 'steak', calories: 300 },
        { name: 'ground beef', calories: 200 },
        { name: 'chicken', calories: 100 },
        { name: 'fish', calories: 80 },
        { name: 'soy', calories: 50 }
      ],
      fruits: [
        { name: 'orange', calories: 300 },
        { name: 'banana', calories: 200 },
        { name: 'pineapple', calories: 100 },
        { name: 'grapes', calories: 80 },
        { name: 'blueberries', calories: 50 }
      ],
      vegetables: [
        { name: 'romaine', calories: 30 },
        { name: 'green beans', calories: 40 },
        { name: 'squash', calories: 100 },
        { name: 'spinach', calories: 50 },
        { name: 'kale', calories: 10 }
      ],
      dairy: [
        { name: 'milk', calories: 300 },
        { name: 'yoghurt', calories: 200 },
        { name: 'cheddar cheese', calories: 200 },
        { name: 'skim milk', calories: 100 },
        { name: 'cottage cheese', calories: 80 }
      ],
      grains: [
        { name: 'bread', calories: 200 },
        { name: 'bagel', calories: 300 },
        { name: 'pita', calories: 250 },
        { name: 'naan', calories: 210 },
        { name: 'tortilla', calories: 120 }
      ]
    };

    function populateFoodList(category) {
      foodList.innerHTML = '';
      foodData[category].forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        foodList.appendChild(option);
      });
    }
  
    function calculateTotalCalories() {
      let calories = 0;
      Array.from(selectedItems.options).forEach(option => {
        const selectedItem = foodData[foodCategory.value].find(food => food.name === option.value);
        if (selectedItem) {
          calories += selectedItem.calories;
        }
      });
      return calories;
    }
  
    function updateTotalCalories() {
      totalCalories.textContent = calculateTotalCalories();
    }
  
    foodCategory.addEventListener('change', function() {
      const selectedCategory = foodCategory.value;
      populateFoodList(selectedCategory);
      updateTotalCalories();
    });
  
    addButton.addEventListener('click', function() {
      Array.from(foodList.selectedOptions).forEach(option => {
        selectedItems.appendChild(document.createElement('option')).text = option.text;
      });
      updateTotalCalories();
    });
  
    removeButton.addEventListener('click', function() {
      Array.from(selectedItems.selectedOptions).forEach(option => {
        option.remove();
      });
      updateTotalCalories();
    });
  });
    
  
