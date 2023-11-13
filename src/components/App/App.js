import { useState, useEffect } from 'react';
import './App.css';
import { getOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

function App() {
  const dummyOrders = [
    {
      id: 1,
      name: 'Pat',
      ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'],
    },
    {
      id: 2,
      name: 'Johann',
      ingredients: [
        'sofritas',
        'lettuce',
        'carnitas',
        'queso fresco',
        'jalapeno',
      ],
    },
    {
      id: 3,
      name: 'Nicole',
      ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'],
    },
  ];

  function postOrder(newOrder) {
    return fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .catch(error => setError(error.message));
  }

  useEffect(() => {
    getOrders()
      .then(data => setOrders(data.orders))
      .catch(error => setError(error.message));
  }, []);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  function addOrder(newOrder) {
    postOrder(newOrder).then(data => setOrders([...orders, data]));
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>
      {error ? <p>Error:{error}</p> : <Orders orders={orders} />}
    </main>
  );
}

export default App;
