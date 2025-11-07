import React, { createContext, useState } from 'react';

export interface FoodForm {
  name: string;
  type: string;
  calories: string;
}

interface FoodContextType {
  foodData: FoodForm;
  setFoodData: React.Dispatch<React.SetStateAction<FoodForm>>;
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
