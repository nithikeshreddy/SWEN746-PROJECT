import React, { useState } from 'react';

const RecipeSharing = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleAddRecipe = () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      alert('Please fill out all fields.');
      return;
    }

    setRecipes((prevRecipes) => [
      ...prevRecipes,
      { ...newRecipe, id: Date.now(), favorite: false },
    ]);
    setNewRecipe({ title: '', ingredients: '', instructions: '' });
  };

  const toggleFavorite = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recipe Sharing</h1>
      <div style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={handleInputChange}
          style={styles.input}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          style={styles.textarea}
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          style={styles.textarea}
        />
        <button onClick={handleAddRecipe} style={styles.addButton}>
          Add Recipe
        </button>
      </div>

      <div style={styles.recipeList}>
        {recipes.length === 0 ? (
          <p style={styles.noRecipes}>No recipes added yet.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} style={styles.recipeCard}>
              <h2 style={styles.recipeTitle}>{recipe.title}</h2>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                style={{
                  ...styles.favoriteButton,
                  backgroundColor: recipe.favorite ? '#ff0000' : '#28a745',
                }}
              >
                {recipe.favorite ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  title: { fontSize: '28px', marginBottom: '20px', textAlign: 'center' },
  form: { marginBottom: '30px', textAlign: 'center' },
  input: {
    width: '80%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '80%',
    height: '60px',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#ff5900',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  recipeList: { marginTop: '20px' },
  noRecipes: { textAlign: 'center', fontSize: '18px', color: '#777' },
  recipeCard: {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  recipeTitle: { fontSize: '20px', color: '#ff5900' },
  favoriteButton: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default RecipeSharing;