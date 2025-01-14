import axios from 'axios';
import { Nutrition } from './types';
import { useState } from 'react';

const API_URL = 'http://localhost:8080/food/nutrition';

// 전체 Nutrition 데이터를 가져오는 함수
export const getNutritionData = async (): Promise<Nutrition[]> => {
  const response = await axios.get<Nutrition[]>(API_URL);
  return response.data.sort((a, b) => {
    if (a.foodName < b.foodName) return -1;
    if (a.foodName > b.foodName) return 1;
    return 0;
  });
};

// 카테고리별 Nutrition 데이터를 가져오는 함수
export const getNutritionByCategory = async (category: string): Promise<Nutrition[]> => {
    const response = await axios.get<Nutrition[]>(`${API_URL}/category/${category}`);
    return response.data.sort((a, b) => {
        if (a.foodName < b.foodName) return -1;
        if (a.foodName > b.foodName) return 1;
        return 0;
      });
    };

export const useVisiblePosts = (initialCount: number) => {
  const [visiblePosts, setVisiblePosts] = useState(initialCount);

  // 더보기 버튼 클릭 시 게시물 수를 늘리는 함수
  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  const handleReset = (initialCounts: number) => {
    setVisiblePosts(initialCounts);
  };

  return { visiblePosts, handleLoadMore, handleReset};
};
 