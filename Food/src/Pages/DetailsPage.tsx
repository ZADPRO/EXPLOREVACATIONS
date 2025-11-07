import  { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodContext } from './HomePage'; 

const DetailsPage = () => {
  const context = useContext(FoodContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { foodData } = context;

  return (
    <div>
      <h2>Details Page</h2>
      <p><strong>Name:</strong> {foodData.name}</p>
      <p><strong>Type:</strong> {foodData.type}</p>
      <p><strong>Calories:</strong> {foodData.calories}</p>
      <button onClick={() => navigate('/summary')}>Go to Summary</button>
    </div>
  );
};

export default DetailsPage;
