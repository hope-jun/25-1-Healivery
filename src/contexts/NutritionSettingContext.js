import React, { createContext, useContext, useState } from "react";

const NutritionSettingContext = createContext();

const defaultSetting = {
  calories: 600,
  protein: 30,
  fat: 25,
  carbs: 60,
  sodium: 600,
};

export function NutritionSettingProvider({ children }) {
  const [setting, setSetting] = useState(() => {
    const saved = localStorage.getItem("nutritionSetting");
    return saved ? JSON.parse(saved) : defaultSetting;
  });

  const updateSetting = (newSetting) => {
    setSetting(newSetting);
    localStorage.setItem("nutritionSetting", JSON.stringify(newSetting));
  };

  return (
    <NutritionSettingContext.Provider value={{ setting, updateSetting }}>
      {children}
    </NutritionSettingContext.Provider>
  );
}

export function useNutritionSetting() {
  return useContext(NutritionSettingContext);
} 