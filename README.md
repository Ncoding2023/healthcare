# healthcare_frontend
#  React + TypeScript + Vite

# 프로젝트 개요

healthcare는 **React**, **TypeScript**, **Vite**를 사용하여 개발한 헬스케어 웹 애플리케이션입니다. 사용자에게 건강 관련 정보를 제공하고, 건강 데이터를 시각적으로 표현하며, 사용자가 직접 건강 기록을 관리할 수 있는 기능을 제공합니다.

# 주요 기술 스택

Frontend : React, TypeScript, Vite
개발 도구: VS
...
src/
├── Exercise/                       # 운동 관련 컴포넌트들
│   ├── ExerciseDataList.tsx        # 운동 데이터 리스트 컴포넌트
│   ├── ExerciseForm.tsx            # 운동 폼 컴포넌트
│   ├── ExerciseRoutineCreate.tsx   # 운동 루틴 생성 폼
│   ├── ExerciseRoutineList.tsx     # 운동 루틴 목록
│   ├── ExerciseRoutineUpdate.tsx   # 운동 루틴 수정 폼
│   ├── MyComponent.tsx             # 나의 신체 수치 관련 컴포넌트
│
├── Food/                           # 음식 관련 컴포넌트들
│   ├── CategoryFilter.tsx          # 카테고리 필터 컴포넌트
│   ├── FoodNutritionalValue.tsx    # 음식 영양소 정보 컴포넌트
│   └── NutritionTable.tsx          # 영양소 테이블 컴포넌트
│
├── ts/             		# 유틸리티 전역 함수
│   ├── types.ts          # 식품관련으로 interface 선언
│   ├── setProxy.ts             # proxy로  스프링부트 연동
│   ├── nutritionService.ts         # 음식 관련 서비스 (API 통신 등)
│   ├── Waiting-img-src.ts          # 저작권 없는 이미지 준비중 url 및 크기
│
├── css/             		# 유틸리티 전역 함수
│   ├── ExerciseList.css            # 운동 리스트 스타일 (CSS 파일은 제외됨)
│   ├── CategoryFilter.css          # 카테고리 필터 스타일 (CSS 파일은 제외됨)
│   ├── FoodNutritionalValue.css    # 음식 영양소 정보 스타일 (CSS 파일은 제외됨)
│   ├── types.ts          # 식품관련으로 interface 선언
│   ├── setProxy.ts             # proxy로  스프링부트 연동
│   └── Mylnch.css                  # Mylnch 관련 스타일
│
├── App.tsx                # 최상위 컴포넌트
├── App.css               # 최상위 컴포넌트 스타일 (CSS)
├── Footer.tsx                 # 유틸리티 함수들
├── index.css               # 유틸리티 함수들
└── main.tsx               # 애플리케이션 진입
└── vite-env.d.ts               # Vite 환경 파일
...
#  주요 기능
- **건강 데이터 관리**: 사용자는 자신이 입력한 건강 데이터를 관리하고 시각화할 수 있습니다.
- **식단 관리**: 사용자는 자신이 먹은 식단에 대한 정보를 입력하고, 해당 식단의 영양소 정보를 확인할 수 있습니다.
- **운동 기록**: 운동에 대한 기록을 입력하고 분석할 수 있습니다.
- **시각화**: 입력된 데이터를 차트를 사용하여 직관적으로 보여줍니다.

개발 환경
운영체제: Windows10
React 버전: 18.3.3
TypeScript 버전: 5.5.3
Vite 버전: 5.4.1
Templates 버전 : bootstrap.min.css

문의
개발자: [남상원]
이메일: [ncoding1@gmail.com]
tel : 010 2900 6103

피드백로 알려주시면 주의 깊게 새겨듣겠습니다.

#	감사합니다
