import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ExerciseList.css';
import { wImgsrc } from '../ts/Waiting-img-src';

interface ExerciseData {
  exerciseNo: number;
  exerciseImg: string;
  exerciseMainArea: string;
  exerciseSuvArea: string;
  exerciseName: string;
  exerciseDescription: string;
  regdate: string;
  updatedate: string;
}

const ExerciseList = () => {
  const [exerciseData, setExerciseData] = useState<ExerciseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseData | null>(null);

  useEffect(() => {
    axios
      .get<ExerciseData[]>('http://localhost:8080/exerciseData')
      .then((response) => {
        setExerciseData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (exercise: ExerciseData) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };


  // 메인 부위별로 데이터를 그룹화하고, "팔"인 경우 서브 부위별로 나눕니다.
  const groupedData = exerciseData.reduce((acc: Record<string, any>, exercise) => {
    const { exerciseMainArea, exerciseSuvArea } = exercise;

    if (exerciseMainArea === '팔') {
      // "팔"인 경우 서브 부위를 키로 사용
      if (!acc['팔']) {
        acc['팔'] = {};
      }
      if (!acc['팔'][exerciseSuvArea]) {
        acc['팔'][exerciseSuvArea] = [];
      }
      acc['팔'][exerciseSuvArea].push(exercise);
    } else {
      // 그 외의 메인 부위는 기존처럼 처리
      if (!acc[exerciseMainArea]) {
        acc[exerciseMainArea] = [];
      }
      acc[exerciseMainArea].push(exercise);
    }

    return acc;
  }, {});
  // }, {} as Record<string, ExerciseData[] | Record<string, ExerciseData[]>>);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="exercise-list ">
      {/* <h1>운동 목록</h1> */}
      <div className="exercise-columns container">
        {Object.keys(groupedData).map((mainArea) => {
          if (mainArea === '팔' && typeof groupedData[mainArea] === 'object') {
            // "팔"의 서브 부위들을 열로 나눔
            return Object.keys(groupedData[mainArea] as Record<string, ExerciseData[]>).map((subArea) => (
              <div key={subArea} className="exercise-column">
                <h2 className="exercise-main-area-title">팔 - {subArea}</h2>
                {/* <ul style={{justifyContent:"flex-start"}}> */}
                <ul className='exercise-itemParent'>
                  {(groupedData[mainArea] as Record<string, ExerciseData[]>)[subArea].map((exercise) => (
                    <li 
                      key={exercise.exerciseNo} 
                      className="exercise-item" 
                      onClick={() => handleShowModal(exercise)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={exercise.exerciseImg  !== null ? wImgsrc : exercise.exerciseImg} alt={exercise.exerciseName} className="exercise-img" />
                      <h5 className="exercise-name">{exercise.exerciseName}</h5>
                    </li>
                  ))}
                </ul>
              </div>
            ));
          } else {
            // "팔"이 아닌 다른 메인 부위들 처리
            return (
              <div key={mainArea} className="exercise-column">
                <h2 className="exercise-main-area-title">{mainArea}</h2>
                <ul className='exercise-itemParent'>
                  {(groupedData[mainArea] as ExerciseData[]).map((exercise) => (
                    <li 
                      key={exercise.exerciseNo} 
                      className="exercise-item" 
                      onClick={() => handleShowModal(exercise)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={exercise.exerciseImg  !== null ? wImgsrc : exercise.exerciseImg} alt={exercise.exerciseName} className="exercise-img" />
                      <h3 className="exercise-name">{exercise.exerciseName}</h3>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedExercise?.exerciseName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExercise && (
            <>
              <img src={selectedExercise.exerciseImg  !== null ? wImgsrc : selectedExercise.exerciseImg} alt={selectedExercise.exerciseName} style={{ width: '100%', borderRadius: '10px' }} />
              <p> <strong><span className="badge rounded-pill text-bg-primary ">{selectedExercise.exerciseMainArea}</span> </strong>
              <strong><span className="badge rounded-pill text-bg-info">{selectedExercise.exerciseSuvArea}</span></strong>
              </p>
              <p></p>
              <p className=''>{selectedExercise.exerciseDescription}</p>
              {/* <p className="exercise-dates">
                Registered on: {selectedExercise.regdate} | Last updated: {selectedExercise.updatedate}
              </p> */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExerciseList;
