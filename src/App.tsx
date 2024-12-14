import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 추가
import MyInch from "./Exercise/MyInch";
import ExerciseDataList from "./Exercise/ExerciseDataList";
import ExerciseRoutineList from "./Exercise/ExerciseRoutineList";
import Footer from "./Footer";
import "./App.css"; // App.css 파일 추가
import FoodNutritionalValue from "./Food/FoodNutritionalValue";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [weekday, setWeekday] = useState("");

  // const [colorIndex, setColorIndex] = useState(0); // 색상을 변경할 인덱스 상태
  // const colors = ["red", "green", "blue", "yellow"]; // 사용할 색상 배열
  // const [colorIndex1, setColorIndex1] = useState(0); // 색상을 변경할 인덱스 상태
  // const colors1 = ["red", "green", "blue", "yellow"]; // 사용할 색상 배열

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const optionsWeek: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };
    setDate(today.toLocaleDateString("ko-KR", options)); // 오늘 날짜를 'YYYY년 MM월 DD일' 형식으로 표시
    setWeekday(today.toLocaleDateString("ko-KR", optionsWeek)); // 오늘 날짜를 'YYYY년 MM월 DD일' 형식으로 표시
  }, []);
  // const handleClick = () => {
  //   setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // 색상 인덱스를 순차적으로 변경
  // };
  // const handleClick1 = () => {
  //   setColorIndex1((prevIndex) => (prevIndex + 1) % colors1.length); // 색상 인덱스를 순차적으로 변경
  // };
  return (
    <Router>
      <div className="app-container">
        {/* <div style={{ display: "flex" }}>
          <div
            onClick={handleClick}
            style={{
              backgroundColor: colors[colorIndex],
              padding: "20px",
              marginBottom: "10px",
              textAlign: "center",
              cursor: "pointer",
              flex: 1,
            }}
          >
            첫 번째 div
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: colors1[colorIndex1 + 1],
              padding: "20px",
              marginBottom: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleClick1}
          >
            두 번째 div
          </div>
        </div> */}
        {/* 네비게이션 바 */}
        <Navbar
          bg="light"
          expand="lg"
          sticky="top"
          className="navbar-container"
        >
          <Container fluid className="px-0">
            {" "}
            {/* 패딩을 제거 */}
            <Navbar.Brand
              href="/"
              style={{ fontWeight: "bold", color: "#4093f1", fontSize: "25px" }}
            >
              💪건강하게 운동하자
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="w-100 d-flex justify-content-center">
                <NavLink
                  to="/"
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  홈
                </NavLink>
                <NavLink
                  to="/foodList"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  식품
                </NavLink>
                <NavLink
                  to="/routine"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  루틴
                </NavLink>
                <NavLink
                  to="/exerciseList"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  운동
                </NavLink>
              </Nav>
              <div
                className="ms-auto my-auto"
                style={{
                  fontSize: "16px",
                  color: "#4093f1",
                  fontWeight: "bold",
                  width: "35%",
                  textAlign: "right",
                }}
              >
                {date} {/* 오늘 날짜를 오른쪽에 표시 */} <br />
                {weekday}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* 메인 콘텐츠 */}
        <div className="main-content">
          <Container className="content-container">
            <Routes>
              <Route path="/" element={<MyInch />} />
              <Route path="/foodList" element={<FoodNutritionalValue />} />
              <Route path="/routine" element={<ExerciseRoutineList />} />
              <Route path="/exerciseList" element={<ExerciseDataList />} />
            </Routes>
          </Container>
        </div>

        {/* 푸터 */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
