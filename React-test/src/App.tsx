import { useState, useEffect } from 'react'; // Import React hooks
import axios from 'axios'; // Import Axios for HTTP requests
import './App.css'; // Import CSS for styling

function App() {
  // Estado para almacenar la lista de frutas
  const [fruits, setFruits] = useState<{ id: number; name: string }[]>([]);
  // Estado para almacenar el valor del campo de entrada (input)
  const [newFruit, setNewFruit] = useState('');


  // useEffect se activa al cargar el componente para obtener la lista de frutas
  useEffect(() => {
    axios.get('http://localhost:3000/fruits') // Hace un get a la Api para obtener la lista de frutas
      .then(response => {
        // Se asegura de que la respuesta sea un array, si no , muestra un array vacio
        setFruits(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error('Error fetching fruits:', error));// Errores 
  }, []); // Vacio para que se ejecute solo una vez al cargar el componente

  // Funcion para añadir nuevas frutas
  const addFruit = () => {
    if (newFruit.trim() === '') {
      alert('Please enter a fruit name.'); // Mensaje si el input está vacío
      return;
    }

    axios.post('http://localhost:3000/fruits', { name: newFruit }) // Hace un POST a la API
      .then(response => {
        if (response.data.success) {
          setFruits([...fruits, response.data.data]); // Añade la nueva fruta a la lista
          setNewFruit(''); // Limpia el input
          alert(response.data.message); // Mensaje de éxito
        } else {
          alert(response.data.message); // Muestra el mensaje de error del backend
        }
      })
      .catch(error => {
        console.error('Error adding fruit:', error);
        alert('An error occurred while adding the fruit.'); // Mensaje de error genérico
      });
  };

  return (
    <div className="App">
      <h1>Fruit List</h1> 
      <div>
        <input
          type="text"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)} // Actualiza el estado del input al cambiar
          placeholder="Enter a fruit" 
        />
        <button onClick={addFruit}>Add Fruit</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th> 
            <th>Fruit</th> 
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruit, index) => (
            <tr key={fruit.id}>
              <td>{index + 1}</td> 
              <td>{fruit.name}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
