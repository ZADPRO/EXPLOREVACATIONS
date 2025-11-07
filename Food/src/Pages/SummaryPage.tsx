// src/pages/SummaryPage.js
import  { useContext } from 'react';
import { FoodContext } from './HomePage'; 
import { useNavigate } from 'react-router-dom';

const SummaryPage = () => {
  const context = useContext(FoodContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Loading...</div>; // or throw an error
  }

  const { foodData } = context;
  return (
    <div>
      <h2>Summary Page</h2>
      <p><strong>Name:</strong> {foodData.name}</p>
      <p><strong>Type:</strong> {foodData.type}</p>
      <p><strong>Calories:</strong> {foodData.calories}</p>
    </div>
  );
};

export default SummaryPage;
