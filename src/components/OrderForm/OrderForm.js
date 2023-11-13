import { useState } from 'react';

function OrderForm({ orders }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  function handleIngredientClick(ingredient) {
    if (ingredients.includes(ingredient)) {
      // If ingredient already exists, remove it
      const newIngredients = ingredients.filter(item => item !== ingredient);
      setIngredients(newIngredients);
    } else {
      // else, add ingredient
      setIngredients([...ingredients, ingredient]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    clearInputs();
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
        onClick={() => handleIngredientClick(ingredient)}
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

      <button onClick={e => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
