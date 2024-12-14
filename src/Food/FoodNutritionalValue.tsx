import React, { useEffect, useState } from "react";
import { Nutrition } from "../ts/types";
import CategoryFilter from "./CategoryFilter";
import NutritionTable from "./NutritionTable";
import {
  getNutritionByCategory,
  getNutritionData,
} from "./nutritionService";
import "./FoodNutritionalValue.css"; // MyInch.css 파일 추가

const FoodNutritionalValue: React.FC = () => {
  const [data, setData] = useState<Nutrition[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const nutritionData = await getNutritionData();

      setData(nutritionData); //처음 진입시 전체조회

      // 카테고리 리스트 추출
      const uniqueCategories = Array.from(
        new Set(nutritionData.map((item) => item.category))
      );
      setCategories(uniqueCategories);
    };

    fetchData();
  }, []);

  const handleFilter = async (category: string) => {
    if (category === "") {
      const nutritionData = await getNutritionData();
      setData(nutritionData);
    } else {
      const filteredData = await getNutritionByCategory(category);
      setData(filteredData);
    }
  };

  return (
    <div className="container">
      {/* <h1>식품 영향 성분</h1> */}
      <CategoryFilter categories={categories} onFilter={handleFilter} />
      <NutritionTable data={data} />
    </div>
  );
};

export default FoodNutritionalValue;
