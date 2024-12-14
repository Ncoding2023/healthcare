import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

interface ExerciseRoutineUpdateProps {
  onClose: () => void;
  onCreated: () => void;
  ifRoutineName: string | null;
}

// interface ExerciseUpdate {
//   exerciseNo: string;
//   exerciseCd: string;
//   exerciseMainArea: string | any;
//   exerciseName: string;
// }

interface ExerciseUpdate {
  exerciseNo : number;
  selectedMainArea: string;
  exerciseName: string;
  exerciseSet: number;
  exerciseNum: number;
}


const ExerciseRoutineUpdate: React.FC<ExerciseRoutineUpdateProps> = ({ ifRoutineName, onClose }) => {
  const [exerciseData, setExerciseData] = useState([]);
  const [saveRoutine, setSaveRoutine] = useState<ExerciseUpdate[]>([]);
  // const [saveRoutine, setSaveRoutine] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [saveRoutineFix, setSaveRoutineFix] = useState({
    routineNoFix: "",
    routineNameFix: "",
    routineDescriptionFix: "",
  });

  // 운동 데이터 가져오기
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/exerciseData");
        setExerciseData(response.data);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };
    fetchExerciseData();
  }, []);

  // 루틴 데이터 가져오기
  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        if (ifRoutineName) {
          const response = await axios.get(
            `http://localhost:8080/exerciseRoutines/name/${ifRoutineName}`
          );
          const routineData = response.data;
          // console.log("routineData",routineData);
          if (Array.isArray(routineData)) {
            const matchedRoutines:any = routineData.map((routine) => {
              const matchedExercise:any = exerciseData.find(
                (exercise:any) =>
                  exercise.exerciseName.trim() === routine.exerciseName.trim()
              );
              // const mainArea = matchedExercise
              //   ? matchedExercise.exerciseMainArea
              //   : "";

              // 에러가 갑자기 발생해서 수정
              //const mainArea = matchedExercise!.exerciseMainArea;

              let mainArea = "";
              if (matchedExercise) {
                mainArea = matchedExercise.exerciseMainArea;
              }
              return {
                selectedMainArea: mainArea,
                routineNo: routine.routineNo,
                routineCd: routine.routineCd,
                routineName: routine.routineName,
                exerciseNo: routine.routineNo,
                exerciseName: routine.exerciseName,
                routineDescription: routine.routineDescription,
                exerciseSet: routine.exerciseSet,
                exerciseNum: routine.exerciseNum,
              };
            });

            setSaveRoutine(matchedRoutines);
            setExerciseCount(matchedRoutines.length);

            // 루틴 수정 상태 초기화
            setSaveRoutineFix({
              routineNoFix: matchedRoutines[0]?.routineNo,
              routineNameFix: matchedRoutines[0]?.routineName,
              routineDescriptionFix: matchedRoutines[0]?.routineDescription,
            });
          } else {
            console.error("routineData가 배열이 아닙니다:", routineData);
          }
        }
      } catch (error) {
        console.error("Error fetching routine data:", error);
      }
    };
    fetchRoutineData();
  }, [ifRoutineName, exerciseData]);

  // 운동 추가 함수
  const handleAddExercise = () => {
    if (exerciseCount < 8) {
      setExerciseCount(exerciseCount + 1);
      setSaveRoutine((prev) => [
        ...prev,
        {
          exerciseNo: 0,  //interface 때문에 추가
          selectedMainArea: "",
          exerciseName: "",
          exerciseSet: 4,
          exerciseNum: 12,
        },
      ]);
    }
  };

  // 운동 삭제 함수
  const handleRemoveExercise = (index:any) => {
    const updatedExercises:never[] | any = [...saveRoutine];
    updatedExercises.splice(index, 1);
    setSaveRoutine(updatedExercises);
    setExerciseCount(updatedExercises.length);
  };

  // 입력 값 변경 처리
  const handleInputChange = (e:any, index:any, field:any) => {
    const { value } = e.target;
    const updatedExercises = [...saveRoutine];

    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };

    setSaveRoutine(updatedExercises);
  };

  // 루틴 수정 요청 함수
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {

      const errors = validateRoutine(saveRoutineFix, saveRoutine);

// 유효성 검사 결과 처리
if (errors.length > 0) {
  // 오류가 있을 경우, 오류 메시지를 처리하거나 화면에 표시
  alert("유효성 검사 실패:"+("\n")+errors.join("\n")); // 배열의 각 항목을 개행문자로 구분하여 하나의 문자열로 연결
} else {
  // 유효성 검사 성공, 데이터 저장
  const routineNo = saveRoutineFix.routineNoFix; // 루틴 번호
  
  const routinePayload = {
    routineNo: routineNo,
    routineCd: "C",
    routineName: saveRoutineFix.routineNameFix,
    routineDescription: saveRoutineFix.routineDescriptionFix,
    exercises: saveRoutine.map((routine) => ({
      // selectedMainArea: routine.selectedMainArea,
      exerciseNo: routine.exerciseNo,
      exerciseName: routine.exerciseName,
      exerciseSet: routine.exerciseSet,
      exerciseNum: routine.exerciseNum,
    })),
  };
  
  const confirmReset = window.confirm("정말로 수정을 하시겠습니까?");
  if (confirmReset) {
          // PUT 요청으로 수정된 루틴 데이터 전송
  const response = await axios.put(
    `http://localhost:8080/exerciseRoutines/No/${routineNo}`,
    routinePayload
    );
    
  // console.log('루틴 수정 성공:', response.data);
  onClose(); // 모달 닫기
    if (response)  window.location.reload();
  }
  // console.log("저장된 루틴:", routinePayload);
}
      

    } catch (error) {
      console.error("루틴 수정 오류:", error);
    }
  };


  const validateRoutine = (saveRoutineFix:any, saveRoutine:any) => {
    // 유효성 검사 결과
    let errors = [];
  console.log("length",saveRoutineFix.routineDescriptionFix.length);
    // routineName과 routineDescription이 비어 있으면 오류
    if (!saveRoutineFix.routineNameFix || saveRoutineFix.routineNameFix.trim() === "") {
      errors.push("루틴 이름은 필수 입력입니다.");
    }
    if (!saveRoutineFix.routineDescriptionFix || saveRoutineFix.routineDescriptionFix.trim() === "") {
      errors.push("루틴 설명은 필수 입력입니다.");
    }
       if (saveRoutineFix.routineDescriptionFix.length > 255) {
        errors.push("Routine Description은 최대 255자를 초과할 수 없습니다.");
        // return;
      }
  
    // exercises 배열의 각 항목에 대해 유효성 검사
    saveRoutine.forEach((routine:any, index:any) => {
      // exerciseName이 비어 있으면 오류
      if (!routine.exerciseName || routine.exerciseName.trim() === "") {
        errors.push(`운동 이름이 비어 있습니다. (운동 ${index + 1})`);
      }
  
      // exerciseSet과 exerciseNum이 숫자이고 유효한 값인지 확인
      if (isNaN(routine.exerciseSet) || routine.exerciseSet <= 0) {
        errors.push(`세트 수는 1 이상의 숫자여야 합니다. (운동 ${index + 1})`);
      }
      if (isNaN(routine.exerciseNum) || routine.exerciseNum <= 0) {
        errors.push(`반복 횟수는 1 이상의 숫자여야 합니다. (운동 ${index + 1})`);
      }
    });
  
    // 유효성 검사 결과 반환 (오류가 없으면 빈 배열)
    return errors;
  };
  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>운동 루틴 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="routineName">
            <Form.Label>루틴명</Form.Label>
            <Form.Control
              type="text"
              maxLength={20}
              defaultValue={saveRoutineFix.routineNameFix}
              onChange={(e) =>
                setSaveRoutineFix({
                  ...saveRoutineFix,
                  routineNameFix: e.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="routineDescription">
            <Form.Label>루틴 설명</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              maxLength={255}
              defaultValue={saveRoutineFix.routineDescriptionFix}
              onChange={(e) =>
                setSaveRoutineFix({
                  ...saveRoutineFix,
                  routineDescriptionFix: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          {Array.from({ length: exerciseCount }).map((_, index) => (
            <Row key={index} className="mb-3">
              <Col md={3}>
                <Form.Group controlId={`selectedMainArea${index}`}>
                  <Form.Label>부위 선택 {index + 1}</Form.Label>
                  <Form.Select
                    value={saveRoutine[index]?.selectedMainArea || ""}
                    onChange={(e) =>
                      handleInputChange(e, index, "selectedMainArea")
                    }
                  >
                    <option value="">부위를 선택하세요</option>
                    {Array.from(
                      new Set(
                        exerciseData.map(
                          (exercise:any) => exercise.exerciseMainArea
                        )
                      )
                    ).map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId={`exerciseName${index}`}>
                  <Form.Label>운동 선택 {index + 1}</Form.Label>
                  <Form.Select
                    value={saveRoutine[index]?.exerciseName || ""}
                    onChange={(e) =>
                      handleInputChange(e, index, "exerciseName")
                    }
                  >
                    <option value="">
                      {saveRoutine[index]?.exerciseName || "운동을 선택하세요"}
                    </option>
                    {exerciseData
                      .filter(
                        (exercise:any) =>
                          exercise.exerciseMainArea.trim() ===
                          saveRoutine[index]?.selectedMainArea.trim()
                      )
                      .map((exercise:any) => (
                        <option
                          key={exercise.exerciseNo}
                          value={exercise.exerciseName}
                        >
                          {exercise.exerciseName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
{saveRoutine[index]?.selectedMainArea === "유산소" ? (
null
):(
              <Col md={3}>
                <Form.Group controlId={`exerciseSet${index}`}>
                  <Form.Label>세트 {index + 1}</Form.Label>
                  <Form.Control
                    type="number"
                    value={saveRoutine[index]?.exerciseSet || 4}
                    onChange={(e) => handleInputChange(e, index, "exerciseSet")}
                    min={1}
                  />
                </Form.Group>
              </Col>
)}
              
              {saveRoutine[index]?.selectedMainArea === "유산소" ? (
                <Col md={6}>
                <Form.Group controlId={`exerciseNum${index}`}>
                  <Form.Label>시간(분)</Form.Label>
                  <Form.Control
                    type="number"
                    value={saveRoutine[index]?.exerciseNum || 12}
                    onChange={(e) => handleInputChange(e, index, "exerciseNum")}
                    min={1}
                  />
                </Form.Group>
              </Col>
):(
<Col md={3}>
                <Form.Group controlId={`exerciseNum${index}`}>
                  <Form.Label>횟수 {index + 1}</Form.Label>
                  <Form.Control
                    type="number"
                    value={saveRoutine[index]?.exerciseNum || 12}
                    onChange={(e) => handleInputChange(e, index, "exerciseNum")}
                    min={1}
                  />
                </Form.Group>
              </Col>
)}
              
              <Row className="mb-3">
                <Col md={12}>
                  <Button
                    style={{ width: "100%" }}
                    variant="danger"
                    onClick={() => handleRemoveExercise(index)}
                  >
                    삭제
                  </Button>
                </Col>
              </Row>
            </Row>
          ))}
          <Button
            variant="primary"
            onClick={handleAddExercise}
            className="mt-3"
          >
            운동 추가
          </Button>
          <Button
            variant="success"
            type="submit"
            className="mt-3"
            style={{ width: "100%" }}
          >
            루틴 수정
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExerciseRoutineUpdate;
