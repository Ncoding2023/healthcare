import { useEffect, useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import "../css/MyInch.css"; // MyInch.css 파일 추가

const MyInch = () => {
  // const [gender, setGender] = useState('');
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0); //활동대사량
  const [age, setAge] = useState<number>(0);
  const [bmr, setBmr] = useState<number>(0); //기초대사량
  const [carbs, setCarbs] = useState<number>(0); //탄수
  const [protein, setProtein] = useState<number>(0); //단백
  const [fat, setFat] = useState<number>(0); //지방
  const [action, setAction] = useState<number>(0); //지방
  const [pointTdee, setPointTdee] = useState<number>(0); //활동대사량
  const [inputValue, setInputValue] = useState<string>(""); // 입력값을 저장할 상태 추가
  const [chickON, setChickON] = useState<string>(""); // 입력값을 저장할 상태 추가
  
  const [selectedTdee, setSelectedTdee] = useState<number>(0); // TDEE 설정
  const defaultRatio = "5:3:2"; // 기본 비율
  const [selectedRatio, setSelectedRatio] = useState<string>(defaultRatio); // 비율 설정
  // const [nutritionInfo, setNutritionInfo] = useState<string>(""); // 설명문 값을 저장할 상태 추가
  // const [tdeeInfo, setTdeeInfo] = useState<string>(""); // 설명문 값을 저장할 상태 추가
  //e: React.ChangeEvent<HTMLInputElement>
  const iButtonClick = () => {
    const parsedValue = Number(inputValue);
    // console.log("action",action);
    console.log("inputValue", inputValue);
    // const parsedValue = Number(e.target.value);
    if (!isNaN(parsedValue)) {
      !height
        ? setHeight(parsedValue)
        : !weight
        ? setWeight(parsedValue)
        : setAge(parsedValue);
      // : !age
      // ? setAge(parsedValue)
      // : setAction(parsedValue);
      // ; // 버튼 클릭 시 입력값을 상태에 저장
      setInputValue(""); // 입력창 초기화
      
    } else {
      alert("유효한 숫자를 입력하세요."); // 유효하지 않은 입력에 대한 경고
    }
    saveData();
  };

  /* Mifflin-St Jeor 공식
  남성 BMR = 10 * 체중(kg) + 6.25 * 키(cm) - 5 * 나이(년) + 5
  여성 BMR = 10 * 체중(kg) + 6.25 * 키(cm) - 5 * 나이(년) - 161 */
  useEffect(() => {
    // console.log("pointTdee",tdee);
    // console.log("localStorage",localStorage);
    if (weight > 0 && height > 0 && age > 0) {
      let calculatedBMR =
        gender === "male"
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;

      let actionTdee = calculatedBMR * action;

      setBmr(calculatedBMR);
      setTdee(actionTdee); //활동대사량의 기준값으로 지정


      if (pointTdee) {
        setCarbs((pointTdee / 4) * 0.5);
        setProtein((pointTdee / 4) * 0.3);
        setFat((pointTdee / 9) * 0.2);
      } else {
        setPointTdee(tdee);
        setCarbs((tdee / 4) * 0.5);
        setProtein((tdee / 4) * 0.3);
        setFat((tdee / 9) * 0.2);

      }
    }
  }, [weight, height, age, gender, action, tdee, pointTdee]); // 값이 변경될 때마다 실행
  // 활동 대사량 동적 변경
  const pointTdeeSetting = (adjustment: number) => {
    setPointTdee(tdee + adjustment);
    setSelectedTdee(adjustment);
    
    
  };
  // 탄단비 비율 동적 변경
  const changeRatio = (
    changeCarb: number,
    changeProtein: number,
    changeFat: number
  ) => {
    setCarbs((pointTdee / 4) * 0.1 * changeCarb);
    setProtein((pointTdee / 4) * 0.1 * changeProtein);
    setFat((pointTdee / 9) * 0.1 * changeFat);

    
    const ratio = 
    String(changeCarb || 5) +":"+ String(changeProtein || 3) +":"+ String(changeFat || 2);
    console.log(ratio);
    setSelectedRatio(ratio);

  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const storedGender = localStorage.getItem("gender");
    const storedHeight = localStorage.getItem("height");
    const storedWeight = localStorage.getItem("weight");
    const storedAge = localStorage.getItem("age");
    const storedAction = localStorage.getItem("action");
    const storedChickOn = localStorage.getItem("chickON");

    if (storedGender) {
      setGender(storedGender);
    }
    if (storedHeight) {
      setHeight(Number(storedHeight));
    }
    if (storedWeight) {
      setWeight(Number(storedWeight));
    }
    if (storedAge) {
      setAge(Number(storedAge));
    }
    if (storedAction) {
      setAction(Number(storedAction));
    }
    if (storedChickOn) {
      setChickON(storedChickOn);
    }
  }, []);

  // 키와 몸무게를 로컬 스토리지에 저장하는 함수
  // console.log(`Gender: ${gender},Height: ${height}, Weight: ${weight}, age: ${age}`);
  const saveData = () => {
    localStorage.setItem("height", String(height));
    localStorage.setItem("weight", String(weight));
    localStorage.setItem("age", String(age));
    localStorage.setItem("gender", gender);
    localStorage.setItem("action", String(action));
    localStorage.setItem("chickON", chickON);
    // localStorage.getItem('chickON');
  };
  // age,chickON도 추가함가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    saveData();
  }, [age, chickON, action, tdee, pointTdee]);

  const localStorageDel = () => {
    const confirmReset = window.confirm("정말로 재설정을 하시겠습니까?");
    if (confirmReset) {
      localStorage.clear();
      window.location.reload();
    }
  };
  const chickOrNOt = () => {
    setChickON("on");
  };

  const [bmrNumberValue, setBmrNumberValue] = useState<number>(0); // 입력  칼로리 값
  const [carbsNumberValue, setCarbsNumberValue] = useState<number>(0); // 입력 탄수화물 값
  const [proteinNumberValue, setProteinNumberValue] = useState<number>(0); // 입력 단백질 값
  const [fatNumberValue, setFatNumberValue] = useState<number>(0); // 입력 지방 값
  // let [guidecolor, setGuidecolor] = useState(""); // 입력 안내 문구 색상 값
  let guidecolor = "";

  // const

  const calculatePercentage = (value: number, total: number) => {
    const percent = total > 0 ? (value / total) * 100 : 0;

    return percent;
  };
  // 비율 계산 함수

  // 안내 문구를 결정하는 함수

  // const bmrPercentage = calculatePercentage(bmrNumberValue, bmr);
  const bmrPercentage = calculatePercentage(bmrNumberValue, pointTdee);
  const carbsPercentage = calculatePercentage(carbsNumberValue, carbs);
  const proteinPercentage = calculatePercentage(proteinNumberValue, protein);
  const fatPercentage = calculatePercentage(fatNumberValue, fat);
  const getMessage = (percentage: string) => {
    switch (percentage) {
      case "bmr":
        if (bmrPercentage > 100) {
          guidecolor = "bg-danger-subtle text-danger-emphasis";
          return "칼로리 섭취량을 초과했습니다.";
        } else if (bmrPercentage <= 80) {
          guidecolor = "bg-warning-subtle text-warning-emphasis";
          return "칼로리 섭취량을 부족합니다.";
        } else if (bmrPercentage > 80 || bmrPercentage <= 100) {
          guidecolor = "bg-success-subtle text-success-emphasis";
          return "칼로리 섭취량을 적정량입니다.";
        }
        break;
      case "carbs":
        if (carbsPercentage > 100) {
          guidecolor = "bg-danger-subtle text-danger-emphasis";
          return "탄수화물 섭취량을 초과했습니다.";
        } else if (carbsPercentage < 80) {
          guidecolor = "bg-warning-subtle text-warning-emphasis";
          return "탄수화물 섭취량을 부족합니다.";
        } else if (carbsPercentage > 80 || carbsPercentage <= 100) {
          guidecolor = "bg-success-subtle text-success-emphasis";
          return "탄수화물 섭취량을 적정량입니다.";
        }
        break;
      case "protein":
        if (proteinPercentage > 100) {
          guidecolor = "bg-danger-subtle text-danger-emphasis";
          return "단백질 섭취량을 초과했습니다.";
        } else if (proteinPercentage < 80) {
          guidecolor = "bg-warning-subtle text-warning-emphasis";
          return "단백질 섭취량을 부족합니다.";
        } else if (proteinPercentage > 80 || proteinPercentage <= 100) {
          guidecolor = "bg-success-subtle text-success-emphasis";
          return "단백질 섭취량을 적정량입니다.";
        }
        break;
      case "fat":
        if (fatPercentage > 100) {
          guidecolor = "bg-danger-subtle text-danger-emphasis";
          return "지방 섭취량을 초과했습니다.";
        } else if (fatPercentage < 80) {
          guidecolor = "bg-warning-subtle text-warning-emphasis";
          return "지방 섭취량을 부족합니다.";
        } else if (fatPercentage > 80 || fatPercentage <= 100) {
          guidecolor = "bg-success-subtle text-success-emphasis";
          return "지방 섭취량을 적정량입니다.";
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      {/* 여기에 container 클래스 추가 */}
      {/* <form onSubmit={incdSubmit}> */}
      <>
        {/* <div className='col-md-12 mb-2 card bg-primary text-white'></div> */}
        {!gender && (
          <div>
            <label htmlFor="exercise"></label>
            <select
              className="form-control"
              id="exercise"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">성별</option>
              <option onBlur={saveData} value="male">
                남자
              </option>
              <option onBlur={saveData} value="female">
                여자
              </option>
            </select>
          </div>
        )}

        {gender && !height ? (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput1"
              value={inputValue} // 입력값 상태를 사용
              onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
              placeholder="키를 입력하세요"
            />
            <button
              className="btn-outline-secondary"
              type="button"
              onClick={iButtonClick}
            >
              확인
            </button>
          </div>
        ) : undefined}

        {gender && height && !weight ? (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput1"
              value={inputValue} // 입력값 상태를 사용
              onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
              placeholder="무게를 입력하세요"
            />
            <button
              className=" btn-outline-secondary"
              type="button"
              onClick={iButtonClick}
            >
              확인
            </button>
          </div>
        ) : undefined}

        {gender && height && weight && !age ? (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput1"
              value={inputValue} // 입력값 상태를 사용
              onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
              placeholder="나이(만)를 입력하세요"
            />
            <button
              className="btn-outline-secondary"
              type="button"
              onClick={iButtonClick}
            >
              확인
            </button>
          </div>
        ) : undefined}

        {gender && height && weight && age && !action ? (
          <div className="input-group mb-3">
            <label htmlFor="exercise"></label>
            <select
              className="form-control"
              id="exercise"
              value={action}
              // onChange={() => iButtonClick()}
              onChange={(e) => setAction(parseFloat(e.target.value))}
              // onChange={(e) => setInputValue(e.target.value)}
            >
              {/* <option onBlur={saveData} value={(1.2)}> */}
              <option>운동량은 선택해주세요.</option>
              <option onBlur={saveData} value={1.2}>
                Sedentary: 거의 운동하지 않는 사람
              </option>
              <option onBlur={saveData} value={1.375}>
                Lightly Active: 주 1-2회 가벼운 운동
              </option>
              <option onBlur={saveData} value={1.55}>
                Moderately Active: 주 3-5회 중간 강도의 운동
              </option>
              <option onBlur={saveData} value={1.725}>
                VeryActive: 주 6-7회 강도 높은 운동
              </option>
              <option onBlur={saveData} value={1.9}>
                ExtraActive: 하루에 두 번 이상 강도 높은 운동
              </option>
            </select>
          </div>
        ) : undefined}

        <div>
          {chickON === "on" && (
            <div>
            <Navbar
              bg="light"
              expand="lg"
              style={{
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Nav
                className="mr-auto "
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                }}
              >
                <Button
                  variant={selectedTdee === -500 ? "primary" : "outline-primary"}
                  onClick={() => pointTdeeSetting(-500)}
                >
                  체중 감소
                </Button>
                <Button
                  variant={selectedTdee === 0 ? "primary" : "outline-primary"}
                  onClick={() => pointTdeeSetting(0)}
                >
                  체중 유지
                </Button>
                <Button
                  variant={selectedTdee === 500 ? "primary" : "outline-primary"}
                  onClick={() => pointTdeeSetting(500)}
                >
                  체중 증가
                </Button>
              </Nav>
              <br />
              <Nav
                className="mr-auto"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                }}
              >
                <Button
                  variant={selectedRatio === "4:4:2" ? "primary" : "outline-primary"}
                  onClick={() => changeRatio(4, 4, 2)}
                >
                  4:4:2
                </Button>
                <Button
                  variant={selectedRatio === "4:3:3" ? "primary" : "outline-primary"}
                  onClick={() => changeRatio(4, 3, 3)}
                >
                  4:3:3
                </Button>
                <Button
                  variant={selectedRatio === defaultRatio ? "primary" : "outline-primary"}
                  onClick={() => changeRatio(5, 3, 2)}
                >
                  5:3:2
                </Button>
                <Button
                  variant={selectedRatio === "6:3:1" ? "primary" : "outline-primary"}
                  onClick={() => changeRatio(6, 3, 1)}
                >
                  6:3:1
                </Button>
                <Button
                  variant={selectedRatio === "6:2:2" ? "primary" : "outline-primary"}
                  onClick={() => changeRatio(6, 2, 2)}
                >
                  6:2:2
                </Button>
              </Nav>
            </Navbar>
          </div>
          )}
          {/* {chickON === "on" && pointTdee > 0 ? ( */}
          {chickON === "on" ? (
            <div className="row mb-2">
              {/* <div className="tdeeInfo" style={{ marginTop: '10px', fontSize: '14px', color: 'brown'}}>
                <p>{tdeeInfo}</p>
                  <p>{nutritionInfo}</p>
                </div> */}

              <div className="col-md-12 mb-2 ">
                <div className="card bg-primary text-white ">
                  {/* 배경색 변경 및 텍스트 색상 지정 */}
                  <div className="card-header bg-primary">
                    <h3>일일 권장 섭취량</h3>
                  </div>
                  <div className="card-body text-center">
                    <h4>기초대사량 (BMR): {bmr.toFixed(2)} kcal</h4>
                    <h4>활동대사량 (TDEE): {pointTdee.toFixed(2)} kcal</h4>
                    {/* <h4>활동대사량 (TDEE): {tdee.toFixed(2)} kcal</h4> */}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-success text-white">
                  <div className="card-body text-center">
                    <h5 style={{ whiteSpace: "nowrap" }}>탄수화물</h5>
                    <p>{carbs.toFixed(2)}g</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-danger text-white">
                  {/* 배경색: 빨간색 */}
                  <div className="card-body text-center">
                    <h5>단백질</h5>
                    <p>{protein.toFixed(2)}g</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-warning text-dark">
                  {/* 배경색: 노란색 */}
                  <div className="card-body text-center">
                    <h5>지방</h5>
                    <p>{fat.toFixed(2)}g</p>
                  </div>
                </div>
              </div>
            </div>
          ) : undefined}
          {bmr === 0 || action === 0 || chickON === "on" ? undefined : (
            <Button
              className="col-md-12"
              variant="btn btn-outline-primary"
              type="submit"
              onClick={chickOrNOt}
            >
              시작
            </Button>
          )}

          {/* 식사량 체크 */}
          {chickON === "on" && (
            <div className="input-group  row">
              <div className="mb-12 row" style={{ margin: "10px" }}>
                <h1 className="h1today">금일 식사량</h1>
                <div className="col-12 mb-2">
                  <input
                    type="number"
                    value={bmrNumberValue || ""}
                    onChange={(e) => setBmrNumberValue(Number(e.target.value))}
                    className="form-control "
                    placeholder="칼로리 섭취량를 입력하세요"
                  />
                </div>
                <div className="col-12 mb-2">
                  <input
                    type="number"
                    value={carbsNumberValue || ""}
                    onChange={(e) =>
                      setCarbsNumberValue(Number(e.target.value))
                    }
                    className="form-control"
                    placeholder="탄수화물 섭취량를 입력하세요"
                  />
                </div>
                <div className="col-12 mb-2">
                  <input
                    type="number"
                    value={proteinNumberValue || ""}
                    onChange={(e) =>
                      setProteinNumberValue(Number(e.target.value))
                    }
                    className="form-control"
                    placeholder="단백질 섭취량를 입력하세요"
                  />
                </div>
                <div className="col-12 mb-2">
                  <input
                    type="number"
                    value={fatNumberValue || ""}
                    onChange={(e) => setFatNumberValue(Number(e.target.value))}
                    className="form-control"
                    placeholder="지방 섭취량를 입력하세요"
                  />
                </div>
              </div>

              {/* <div style={{margin:"-10px"}}> */}
              <div className="input-grouprow">
                {/* 칼로리 20241128 활동대사량 기준 변경*/}
                <div
                  className="progress mt-3"
                  role="progressbar"
                  aria-valuenow={calculatePercentage(bmrNumberValue, pointTdee)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar "
                    style={{
                      width: `${calculatePercentage(
                        bmrNumberValue,
                        pointTdee
                      )}%`,
                    }}
                  >
                    {`${calculatePercentage(bmrNumberValue, pointTdee).toFixed(
                      2
                    )}%`}
                  </div>
                </div>
              </div>
              {/* <div className='input-group mb-2 row'> */}
              <div className="input-grouprow">
                {/* 탄수화질 */}
                <div
                  className="progress mt-3"
                  role="progressbar"
                  aria-valuenow={calculatePercentage(carbsNumberValue, carbs)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${calculatePercentage(carbsNumberValue, carbs)}%`,
                    }}
                  >
                    {`${calculatePercentage(carbsNumberValue, carbs).toFixed(
                      2
                    )}%`}
                  </div>
                </div>
              </div>
              {/* <div className='input-group mb-2 row mb-2'> */}
              <div className="input-grouprow">
                {/* 단백질 */}
                <div
                  className="progress mt-3"
                  role="progressbar"
                  aria-valuenow={calculatePercentage(
                    proteinNumberValue,
                    protein
                  )}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width: `${calculatePercentage(
                        proteinNumberValue,
                        protein
                      )}%`,
                    }}
                  >
                    {`${calculatePercentage(
                      proteinNumberValue,
                      protein
                    ).toFixed(2)}%`}
                  </div>
                </div>
              </div>
              {/* <div className='input-group mb-2 row mb-2'> */}
              <div className="input-grouprow">
                {/* 지방 */}
                <div
                  className="progress mt-3"
                  role="progressbar"
                  aria-valuenow={calculatePercentage(fatNumberValue, fat)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width: `${calculatePercentage(fatNumberValue, fat)}%`,
                    }}
                  >
                    {`${calculatePercentage(fatNumberValue, fat).toFixed(2)}%`}
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* 안내 문구 입력 필드 */}
              <div className=" mb-12 row" style={{ marginTop: "10px" }}>
                {bmrNumberValue !== 0 ? (
                  <div className="col-12 mb-2">
                    <input
                      type="text"
                      value={getMessage("bmr")}
                      readOnly
                      className={`form-control ${guidecolor}`}
                    />
                  </div>
                ) : (
                  ""
                )}

                {carbsNumberValue !== 0 ? (
                  <div className="col-12 mb-2">
                    <input
                      type="text"
                      value={getMessage("carbs")}
                      readOnly
                      className={`form-control ${guidecolor}`}
                    />
                  </div>
                ) : (
                  ""
                )}

                {proteinNumberValue !== 0 ? (
                  <div className="col-12 mb-2">
                    <input
                      type="text"
                      value={getMessage("protein")}
                      readOnly
                      className={`form-control ${guidecolor}`}
                    />
                  </div>
                ) : (
                  ""
                )}

                {fatNumberValue !== 0 ? (
                  <div className="col-12 mb-2">
                    <input
                      type="text"
                      value={getMessage("fat")}
                      readOnly
                      className={`form-control ${guidecolor}`}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
        {chickON === "on" && (
        <button onClick={localStorageDel}>신체 정보 재설정</button>
        )}
      </>
      {/* </form> */}
    </div>
  );
};

export default MyInch;
