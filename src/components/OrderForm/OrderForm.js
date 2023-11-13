import { useState } from 'react';

function OrderForm({ addOrder }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');

  function handleIngredientClick(ingredient, event) {
    event.preventDefault();
    setIngredients([...ingredients, ingredient]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      id: Date.now(),
      name: name,
      ingredients: ingredients,
    };
    if (!name || ingredients.length === 0) {
      setError('Please enter your name and select at least one ingredient');
      return;
    }
    addOrder(newOrder);
    clearInputs();
    setError('');
  }

  function clearInputs() {
    setName('');
    setIngredients([]);
  }

  const possibleIngredients = [
    'beans',
    'steak',
    'carnitas',
    'sofritas',
    'lettuce',
    'queso fresco',
    'pico de gallo',
    'hot sauce',
    'guacamole',
    'jalapenos',
    'cilantro',
    'sour cream',
  ];
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={event => handleIngredientClick(ingredient, event)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      {ingredientButtons}

      <p>Order: {ingredients.join(', ') || 'Nothing selected'}</p>
      {error && <p className="error">{error}</p>}

      <button onClick={event => handleSubmit(event)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
