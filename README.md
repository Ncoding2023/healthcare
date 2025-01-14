# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```
src/ ├── assets/ # 이미지 및 기타 리소스 ├── components/ # 재사용 가능한 컴포넌트들 │ ├── Exercise/ # 운동 관련 컴포넌트들 │ │ ├── ExerciseDataList.tsx # 운동 데이터 리스트 컴포넌트 │ │ ├── ExerciseForm.tsx # 운동 폼 컴포넌트 │ │ ├── ExerciseList.css # 운동 리스트 스타일 │ │ ├── ExerciseRoutineCreate.tsx # 운동 루틴 생성 폼 │ │ ├── ExerciseRoutineList.tsx # 운동 루틴 목록 │ │ ├── ExerciseRoutineUpdate.tsx # 운동 루틴 수정 폼 │ │ └── MyComponent.tsx # 기타 운동 관련 컴포넌트 │ ├── Food/ # 음식 관련 컴포넌트들 │ │ ├── CategoryFilter.css # 카테고리 필터 스타일 │ │ ├── CategoryFilter.tsx # 카테고리 필터 컴포넌트 │ │ ├── FoodNutritionalValue.css # 음식 영양소 정보 스타일 │ │ ├── FoodNutritionalValue.tsx # 음식 영양소 정보 컴포넌트 │ │ ├── nutritionService.ts # 음식 관련 서비스 (API 통신 등) │ │ └── NutritionTable.tsx # 영양소 테이블 컴포넌트 ├── styles/ # 전역 스타일 (CSS, SCSS) │ ├── Mylnch.css # Mylnch 관련 스타일 ├── App.tsx # 최상위 컴포넌트 └── main.tsx # 애플리케이션 진입점

js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
