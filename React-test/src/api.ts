import axios from 'axios';

const API_BASE_URL = '/fruits'; // Base URL for the backend

// Fetch the list of fruits
export const fetchFruits = async () => {
  const response = await axios.get(API_BASE_URL);
  return Array.isArray(response.data) ? response.data : [];
};

// Add a new fruit
export const addFruit = async (name: string) => {
  const response = await axios.post(API_BASE_URL, { name });
  return response.data.name;
};


// import { fetchFruits, addFruit } from './api'; // Import API functions
// import './App.css';

// function App() {
//   const [fruits, setFruits] = useState<string[]>([]);
//   const [newFruit, setNewFruit] = useState('');

//   useEffect(() => {
//     fetchFruits()
//       .then(setFruits)
//       .catch(error => console.error('Error fetching fruits:', error));
//   }, []);

//   const handleAddFruit = () => {
//     if (newFruit.trim() === '') return;

//     addFruit(newFruit)
//       .then((name) => {
//         setFruits([...fruits, name]);
//         setNewFruit('');
//       })
//       .catch(error => console.error('Error adding fruit:', error));
//   };