import { useState } from 'react';
import axios from 'axios';
import  { wImgsrc, wImgwidth,wImgheight } from '../ts/Waiting-img-src';

const ExerciseForm = () => {
    const [exerciseAreaValue, setExrciseAreaValue] = useState('테스트');
    const [exerciseNameValue, setExerciseNameValue] = useState('테스트');
    const [exerciseDescriptionValue, setExerciseDescriptionValue] = useState('테스트');
    const [exerciseSetValue, setExerciseSetValue] = useState('4');
    const [exerciseNumValue, setExerciseNumValue] = useState('12');
    // const [imgSreValue, setImgSreValue] = useState({});
    // setImgSreValue(wImgsrc);
    const handleSubmit = async (e: any) => {
    e.preventDefault();

    const exerciseData = {
        exerciseArea: exerciseAreaValue,
        exerciseName: exerciseNameValue,
        exerciseDescription: exerciseDescriptionValue,
        exerciseSet: exerciseSetValue,
        exerciseNum: exerciseNumValue,
    };

    try {
      // const response = 
      await axios.post('http://localhost:8080/exercises', exerciseData);
      // 폼 초기화 또는 성공 메시지 표시
      setExrciseAreaValue('');
      setExerciseNameValue('');
      setExerciseDescriptionValue('');
      setExerciseSetValue('');
      setExerciseNumValue('');
    } catch (error) {
      console.error('운동 정보 생성 실패:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>

    <img  src={wImgsrc} width={wImgwidth} height={wImgheight}/>
      <div>
      <label>운동 부위:</label>
      <input
        type="text"
        value={exerciseAreaValue}
        onChange={(e) => setExrciseAreaValue(e.target.value)}
      />
      </div>
      <div>
      <label>운동 이름:</label>
      <input
        type="text"
        value={exerciseNameValue}
        onChange={(e) => setExerciseNameValue(e.target.value)}
      />
      </div>
      
      <div>
      <label>운동 세트:</label>
            <input
        type="test"
        value={exerciseSetValue}
        onChange={(e) => setExerciseSetValue(e.target.value)}
      />
      </div>
      <div>
      <label>운동 횟수:</label>
            <input
        type="text"
        value={exerciseNumValue}
        onChange={(e) => setExerciseNumValue(e.target.value)}
      />
      </div>
      <div>
      <label>운동 설명:</label>
      <input
        type="text"
        value={exerciseDescriptionValue}
        onChange={(e) => setExerciseDescriptionValue(e.target.value)}
      />
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default ExerciseForm;
