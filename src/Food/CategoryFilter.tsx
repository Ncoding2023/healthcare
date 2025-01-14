// import React, { useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import "../css/CategoryFilter.css"; // App.css 파일 추가
import { useVisiblePosts } from "../ts/nutritionService";

interface CategoryFilterProps {
  categories: string[];
  onFilter: (category: string) => void;
}
let selectedCategory:any = "";// 선택된 카테고리 상태

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilter,
}) => {
  const sortedCategories = [...categories].sort((a, b) =>
    a < b ? -1 : a > b ? 1 : 0
  ); // 배열 복사 후 정렬

  const {handleReset } = useVisiblePosts(5);
  const handleCategoryClick = (category: string) => {
    selectedCategory = category;
    onFilter(category);
    handleReset(5);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Nav
          className="mr-auto"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            flexWrap: "wrap", // 버튼들이 넘칠 경우 자동으로 줄 바꿈
          }}
        >
          <Button
            variant={selectedCategory === "" ? "primary":"outline-primary"}
            onClick={() => handleCategoryClick("")}
            style={{ whiteSpace: "nowrap" }} // 텍스트가 줄 바뀌지 않도록 처리
          >
            전체
          </Button>
          {sortedCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary":"outline-primary"}
              onClick={() => handleCategoryClick(category)}
              style={{ whiteSpace: "nowrap" }} // 텍스트가 줄 바뀌지 않도록 처리
            >
              {category}
            </Button>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
};

export default CategoryFilter;
