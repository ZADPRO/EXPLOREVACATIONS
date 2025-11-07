
import React, { createContext, useContext, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import HeroBanner from '../Components/03-HeroBanner/HeroBanner';
import FeatureSection from '../Components/00-FeatureSection/FeatureSection'
// -------------------
// Context + Types
// -------------------

interface FoodForm {
  name: string;
  type: string;
  calories: string;
}

interface FoodContextType {
  foodData: FoodForm;
  setFoodData: React.Dispatch<React.SetStateAction<FoodForm>>;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foodData, setFoodData] = useState<FoodForm>({
    name: '',
    type: '',
    calories: '',
  });

  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
};

// -------------------
// HomePage Component
// -------------------

const HomePage: React.FC = () => {
  const context = useContext(FoodContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<FoodForm>({
    name: '',
    type: '',
    calories: '',
  });

  if (!context) {
    return <div>Error: FoodContext not found.</div>;
  }

  const { setFoodData } = context;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFoodData(form);
    navigate('/details');
  };

  return (
    <>
    <HeroBanner />
    <section className="hero-banner1">
  <div className="hero-container1">
   
    <div className="hero-content1">
      <p className="tagline">CRISPY, EVERY BITE TASTE</p>
      <h1 className="headline">
        NEED BOOKING? <br /> RESERVE YOUR TABLE?
      </h1>
      <div className="bubble">
        <span>24/7 Support center</span><br />
        <strong>+1718-904-4450</strong>
      </div>
    </div>

    {/* Right Side: Form */}
    <div className="hero-form1">
      <h2>Enter Food Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Food Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Food Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <input
          placeholder="Calories"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
        />
        <button type="submit">Go to Details</button>
      </form>
    </div>
  </div>
</section>

    <FeatureSection />
    </>
  );
};

// -------------------
// Export Both
// -------------------

export { FoodContext, FoodProvider };
export default HomePage;
