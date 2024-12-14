import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface ExerciseData {
  exerciseNo: string;
  exerciseCd: string;
  exerciseMainArea: string;
  exerciseName: string;
}

interface ModalProps {
  onClose: () => void;
  onCreated: () => void; 
}

const ExerciseRoutineCreate: React.FC<ModalProps> = ({ onClose }) => {
  const [exerciseData, setExerciseData] = useState<ExerciseData[]>([]);
  const [exerciseCount, setExerciseCount] = useState(4); // 초기 운동 개수
  const [newRoutine, setNewRoutine] = useState({
    routineName: '',
    routineDescription: '',
    exercises: Array(4).fill({ selectedMainArea: '', selectedExerciseName: '', exerciseSet: 4, exerciseNum: 12 }),
  });

  useEffect(() => {
    // 운동 데이터 가져오기
    axios.get('http://localhost:8080/exerciseData')
      .then(response => {
        setExerciseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercise data:', error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number, field: string) => {
    const { value } = e.target;
    const updatedExercises = [...newRoutine.exercises];

    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };

    setNewRoutine((prev) => ({ ...prev, exercises: updatedExercises }));
  };

  const handleAddExercise = () => {
    if (exerciseCount < 8) { // 최대 8개까지
      setExerciseCount(exerciseCount + 1);
      setNewRoutine((prev) => ({
        ...prev,
        exercises: [...prev.exercises, { selectedMainArea: '', selectedExerciseNo: '', exerciseSet: 4, exerciseNum: 12 }],
      }));
    }
  };

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = [...newRoutine.exercises];
    updatedExercises.splice(index, 1);
    
    setNewRoutine((prev) => ({
      ...prev,
      exercises: updatedExercises,
    }));
    setExerciseCount(exerciseCount - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = validateRoutine(newRoutine) || []; 
    // const errors: string[] = validateRoutine(newRoutine);

    // 유효성 검사 결과 처리
    if (errors.length > 0 ) {
      // 오류가 있을 경우, 오류 메시지를 처리하거나 화면에 표시
      alert("유효성 검사 실패:"+("\n")+errors.join("\n")); // 배열의 각 항목을 개행문자로 구분하여 하나의 문자열로 연결
    } else {
      // 유효성 검사 성공, 데이터 저장
      const routinePayload = {
        routineCd: "C",
        routineName: newRoutine.routineName,
        routineDescription: newRoutine.routineDescription,
        exercises: newRoutine.exercises.map((exercise) => ({
          exerciseName: exercise.selectedExerciseName,
          exerciseSet: exercise.exerciseSet,
          exerciseNum: exercise.exerciseNum,
        })),
      };
      const confirmReset = window.confirm("운동 루틴을 생성 하시겠습니까?");
      if (confirmReset) {
        // 루틴 생성 API 호출
         axios.post('http://localhost:8080/exerciseRoutines', routinePayload)
        .then(response => {
          if(response)  window.location.reload();
        onClose(); // 루틴 생성 후 모달 닫기
      })
      .catch(error => {
        console.error('루틴 생성 중 오류 발생:', error);
      });
      }
    }
    
    
    
  };

  const validateRoutine = (newRoutine: any) => {
    let errors = [];
  
    // 새로운 변수명에 맞게 유효성 검사
    if (!newRoutine.routineName || newRoutine.routineName.trim() === "") {
      errors.push("루틴 이름은 필수 입력입니다.");
    }
    if (!newRoutine.routineDescription || newRoutine.routineDescription.trim() === "") {
      errors.push("루틴 설명은 필수 입력입니다.");
    }
    if (newRoutine.routineDescription.length > 255) {
      errors.push("Routine Description은 최대 255자를 초과할 수 없습니다.");
      return;
    }
  
    newRoutine.exercises.forEach((exercise:any, index:any) => {
      if (!exercise.selectedExerciseName || exercise.selectedExerciseName.trim() === "") {
        errors.push(`운동 이름이 비어 있습니다. (운동 ${index + 1})`);
      }
  
      if (isNaN(exercise.exerciseSet) || exercise.exerciseSet <= 0) {
        errors.push(`세트 수는 1 이상의 숫자여야 합니다. (운동 ${index + 1})`);
      }
      if (isNaN(exercise.exerciseNum) || exercise.exerciseNum <= 0) {
        errors.push(`반복 횟수는 1 이상의 숫자여야 합니다. (운동 ${index + 1})`);
      }
    });
  
    return errors;
  };


  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>운동 루틴 생성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="routineName">
            <Form.Label>루틴명</Form.Label>
            <Form.Control
              type="text"
              maxLength={20}
              value={newRoutine.routineName}
              onChange={(e) => setNewRoutine({ ...newRoutine, routineName: e.target.value })}
              placeholder="루틴명을 입력해주세요."
              required
            />
          </Form.Group>
          <Form.Group controlId="routineDescription">
            <Form.Label>루틴 설명</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              maxLength={255}
              value={newRoutine.routineDescription}
              onChange={(e) => setNewRoutine({ ...newRoutine, routineDescription: e.target.value })}
              placeholder="루틴 설명을 입력해주세요."
              required
            />
          </Form.Group>

          {Array.from({ length: exerciseCount }).map((_, index) => (
            <React.Fragment key={index}>
              <Row className="mb-12">
                <Col md={3}>
                  <Form.Group controlId={`selectedMainArea_${index}`}>
                    <Form.Label>부위 선택 {index + 1}</Form.Label>
                    <Form.Select
                      value={newRoutine.exercises[index].selectedMainArea}
                      onChange={(e) => handleInputChange(e, index, 'selectedMainArea')}
                    >
                      <option value="">부위를 선택하세요</option>
                      {Array.from(new Set(exerciseData.map(exercise => exercise.exerciseMainArea))).map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId={`selectedExerciseName_${index}`}>
                    <Form.Label>운동 선택 {index + 1}</Form.Label>
                    <Form.Select
                      value={newRoutine.exercises[index].selectedExerciseName}
                      onChange={(e) => handleInputChange(e, index, 'selectedExerciseName')}
                    >
                      <option value="">운동을 선택하세요</option>
                      {exerciseData
                        .filter(exercise => exercise.exerciseMainArea === newRoutine.exercises[index].selectedMainArea)
                        .map((exercise) => (
                          <option key={exercise.exerciseNo} value={exercise.exerciseName}>
                            {exercise.exerciseName}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                {newRoutine.exercises[index].selectedMainArea === "유산소" ? (null) :
                 (<Col md={3}>
                  <Form.Group controlId={`exerciseSet_${index}`}>
                    <Form.Label>세트 {index + 1}</Form.Label>
                    <Form.Control
                      type="number"
                      name={`exerciseSet_${index}`}
                      value={newRoutine.exercises[index].exerciseSet}
                      onChange={(e) => handleInputChange(e, index, 'exerciseSet')}
                      min={1}
                    />
                  </Form.Group>
                </Col>
                )}

{newRoutine.exercises[index].selectedMainArea === "유산소" ? (<Col md={6}>
                  <Form.Group controlId={`exerciseNum_${index}`}>
                    <Form.Label>시간(분)</Form.Label>
                    <Form.Control
                      type="number"
                      name={`exerciseNum_${index}`}
                      value={newRoutine.exercises[index].exerciseNum}
                      onChange={(e) => handleInputChange(e, index, 'exerciseNum')}
                      min={1}
                    />
                  </Form.Group>
                </Col>) :
                 (<Col md={3}>
                  <Form.Group controlId={`exerciseNum_${index}`}>
                    <Form.Label>횟수 {index + 1}</Form.Label>
                    <Form.Control
                      type="number"
                      name={`exerciseNum_${index}`}
                      value={newRoutine.exercises[index].exerciseNum}
                      onChange={(e) => handleInputChange(e, index, 'exerciseNum')}
                      min={1}
                    />
                  </Form.Group>
                </Col>
                )}
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Button style={{ width: '100%' }} variant="danger" onClick={() => handleRemoveExercise(index)}>
                    삭제
                  </Button>
                </Col>
              </Row>
            </React.Fragment>
          ))}
          <Row className="mb-3">
            <Col md={3}>
              <Button variant="primary" className="mt-3" onClick={handleAddExercise}>
                운동 추가
              </Button>
            </Col>
            <Col md={6}>
              <Button variant="success" type="submit" className="mt-3" style={{ width: '100%' }}>
                루틴 생성
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExerciseRoutineCreate;
