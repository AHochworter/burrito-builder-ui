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

  useEffect(() => {
    getOrders()
      .then(data => setOrders(data.orders))
      .catch(error => setError(error.message));
  }, []);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>
      {error ? <p>Error:{error}</p> : <Orders orders={orders} />}
    </main>
  );
}

export default App;
