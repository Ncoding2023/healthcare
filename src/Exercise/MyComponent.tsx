import { useState } from "react";
import axios from "axios"; // 또는 fetch 사용 가능

const MyComponent = () => {
  const [exerciseAreaValue, seteExrciseAreaValue] = useState("");
  const [exerciseNameValue, setExerciseNameValue] = useState("");
  const [exerciseDescriptionValue, setExerciseDescriptionValue] = useState("");
  const [exerciseSetValue, setExerciseSetValue] = useState("");
  const [exerciseNumValue, setExerciseNumValue] = useState("");

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const requestData = {
        exerciseArea: exerciseAreaValue,
        exerciseName: exerciseNameValue,
        exerciseDescription: exerciseDescriptionValue,
        exerciseSet: exerciseSetValue,
        exerciseNum: exerciseNumValue,
      };
      const response = await axios.post(
        "http://localhost:8080/send-data",
        requestData
      );
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>운동 부위:</label>
        <input
          type="text"
          value={exerciseAreaValue}
          onChange={(e) => seteExrciseAreaValue(e.target.value)}
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
      <button type="submit">전송</button>
    </form>
  );
};

export default MyComponent;
