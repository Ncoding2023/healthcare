import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button, Card, Nav, Navbar } from "react-bootstrap";
import ExerciseRoutineCreate from "./ExerciseRoutineCreate";
import ExerciseRoutineUpdate from "./ExerciseRoutineUpdate";

interface ExerciseRoutine {
  routineNo: number;
  routineCd: string;
  exerciseCd: string;
  routineName: string;
  exerciseName: string;
  routineDescription: string;
  exerciseSet: number;
  exerciseNum: number;
  regdate: string;
  updatedate: string;
}

const ExerciseRoutineList = () => {
  // const [routines, setRoutines] = useState<ExerciseRoutine[]>([]);
  const [groupedRoutinesByName, setGroupedRoutinesByName] = useState<
    Record<string, ExerciseRoutine[]>
  >({});
  // const [groupedRoutinesByCd, setGroupedRoutinesByCd] = useState<Record<string, ExerciseRoutine[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRoutineName, setSelectedRoutineName] = useState<string | null>(
    null
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const routineNames = [
    "가슴운동루틴",
    "등운동루틴",
    "어깨운동루틴",
    "팔운동루틴",
    "다리운동루틴",
  ];
  // const [sortedRoutines, setSortedRoutines] = useState<ExerciseRoutine[]>([]);
  const [sortedGroupedRoutines, setSortedGroupedRoutines] = useState<
    Record<string, ExerciseRoutine[]>
  >({});
  const [filterRoutineCd, setFilterRoutineCd] = useState<string>("all");

  // let filterRoutineCd; //정렬 버튼 색상 변환
  const handleSort = (filter: string) => {
    let filteredRoutines;
    setFilterRoutineCd(filter);
    console.log(filterRoutineCd === filter);
    console.log(filterRoutineCd === "B" ? "primary" : "outline-primary");
    if (filter === "all") {
      filteredRoutines = { ...groupedRoutinesByName }; // 전체 데이터 사용
    } else {
      // filter 값이 'B' 또는 'C'인 경우 routineCd가 해당 값인 데이터만 필터링
      filteredRoutines = Object.keys(groupedRoutinesByName).reduce(
        (acc, routineName) => {
          const routines = groupedRoutinesByName[routineName].filter(
            (routine) => routine.routineCd === filter
          );
          if (routines.length > 0) {
            acc[routineName] = routines;
          }
          return acc;
        },
        {} as Record<string, ExerciseRoutine[]>
      );
    }

    setSortedGroupedRoutines(filteredRoutines);
  };

  // 초기 로딩 시 전체 루틴 데이터 설정
  useEffect(() => {
    setSortedGroupedRoutines(groupedRoutinesByName);
  }, [groupedRoutinesByName]);
  // 압축시 분할 기능 않됨
  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get<ExerciseRoutine[]>(
        "http://localhost:8080/exerciseRoutines"
      );
      // setRoutines(response.data);
      // setSortedRoutines(response.data); // 초기값 설정
      groupRoutinesByRoutineName(response.data);
      groupRoutinesByRoutineCd(response.data);
      setLoading(false);
    } catch (err) {
      setError("데이터를 불러오는데 실패했습니다.");
      setLoading(false);
    }
  };

  const groupRoutinesByRoutineName = (routines: ExerciseRoutine[]) => {
    const grouped = routines.reduce((acc, routine) => {
      if (!acc[routine.routineName]) {
        acc[routine.routineName] = [];
      }
      acc[routine.routineName].push(routine);
      return acc;
    }, {} as Record<string, ExerciseRoutine[]>);
    setGroupedRoutinesByName(grouped);
  };

  const groupRoutinesByRoutineCd = (routines: ExerciseRoutine[]) => {
    // const grouped =
    routines.reduce((acc, routine) => {
      if (!acc[routine.routineCd]) {
        acc[routine.routineCd] = [];
      }
      acc[routine.routineCd].push(routine);
      return acc;
    }, {} as Record<string, ExerciseRoutine[]>);
    // setGroupedRoutinesByCd(grouped);
  };

  const handleShowModal = (routineName: string) => {
    setSelectedRoutineName(routineName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoutineName(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setShowUpdateModal(false);
  };

  const handleRoutineCreated = () => {
    fetchRoutines(); // 루틴 생성 후 목록 갱신
    window.location.reload();
  };

  const routineRemove = async (routineName: string) => {
    const confirmReset = window.confirm("정말로 삭제 하시겠습니까?");
    if (confirmReset) {
      try {
        await axios.delete(
          `http://localhost:8080/exerciseRoutines/Del/${routineName}`
        );
        // fetchRoutines(); // 삭제 후 목록 갱신
        window.location.reload();
      } catch (error) {
        console.error("운동 루틴 삭제 실패:", error);
      }
    }
  };

  // const handleSort = (filter: string) => {
  //   let sorted: ExerciseRoutine[];

  //   if (filter === 'all') {
  //     sorted = [...routines]; // 전체 데이터
  //   } else {
  //     sorted = routines.filter(routine => routine.routineCd === filter); // B 또는 C로 필터링
  //   }
  //   setSortedRoutines(sorted); // 정렬된 루틴 상태 업데이트
  //   groupRoutinesByRoutineName(routines);

  // };

  return (
    // <Container>
    <div className="container">
      {/* <div style={{maxWidth:'100%'}}> */}
      {/* <h1>Exercise Routines</h1> */}

      {showCreateModal && (
        <ExerciseRoutineCreate
          onClose={handleCloseCreateModal}
          onCreated={handleRoutineCreated}
        />
      )}

      <div>
        <Navbar
          bg="light"
          // expand="lg"
          style={{
            justifyContent: "end",
          }}
        >
          {/* <Navbar.Brand href="#">카테고리</Navbar.Brand> */}
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
              variant={
                filterRoutineCd === "all" ? "primary" : "outline-primary"
              }
              onClick={() => handleSort("all")}
            >
              전체
            </Button>
            <Button
              variant={filterRoutineCd === "B" ? "primary" : "outline-primary"}
              onClick={() => handleSort("B")}
            >
              기본 루틴
            </Button>
            <Button
              variant={filterRoutineCd === "C" ? "primary" : "outline-primary"}
              onClick={() => handleSort("C")}
            >
              나만의 루틴
            </Button>
            <Button variant="success" onClick={handleOpenCreateModal}>
              루틴 생성
            </Button>
          </Nav>
        </Navbar>
      </div>

      {Object.keys(sortedGroupedRoutines).map((routineName) => (
        <Card
          className="mb-3"
          key={routineName}
          style={{ cursor: "pointer", width: "100%" }}
        >
          <Card.Body onClick={() => handleShowModal(routineName)}>
            <Card.Title className="fw-bold">{routineName}</Card.Title>
            <Card.Text className="listRoutineDescription">
              {sortedGroupedRoutines[routineName][0]?.routineDescription ||
                "설명 없음"}
            </Card.Text>
          </Card.Body>
          {sortedGroupedRoutines[routineName][0]?.routineCd === "C" && (
            <Button variant="danger" onClick={() => routineRemove(routineName)}>
              삭제
            </Button>
          )}
        </Card>
      ))}
      {/* 선택한 루틴에 대한 모달 */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedRoutineName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoutineName &&
            groupedRoutinesByName[selectedRoutineName] && (
              <>
                <pre className="mb-4" style={{ whiteSpace: "preWrap" }}>
                  {groupedRoutinesByName[selectedRoutineName][0]
                    ?.routineDescription || "설명 없음"}
                </pre>
                {/* <p className="mb-4">
                </p> */}
                <div className="d-flex flex-column">
                  {groupedRoutinesByName[selectedRoutineName].map((routine) => (
                    <div
                      key={routine.routineNo}
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                    >
                      {/* {routine.routineNo}(임시) */}
                      <div className="col-md-6 ">
                        <strong> {routine.exerciseName}</strong>
                      </div>
                      <div>
                        <strong>{routine.exerciseSet}</strong> set
                      </div>
                      <div>
                        <strong>{routine.exerciseNum}</strong> 회
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
        </Modal.Body>
        <Modal.Footer>
          {(selectedRoutineName &&
            routineNames.includes(selectedRoutineName)) || (
            <Button variant="warning" onClick={handleOpenUpdateModal}>
              수정
            </Button>
          )}
          {showUpdateModal && (
            <ExerciseRoutineUpdate
              onClose={handleCloseCreateModal}
              onCreated={handleRoutineCreated}
              ifRoutineName={selectedRoutineName}
            />
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* // </Container> */}
    </div>
  );
};

export default ExerciseRoutineList;
