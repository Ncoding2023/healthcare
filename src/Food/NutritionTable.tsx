import React, { useState } from "react";
import { Nutrition } from "../ts/types";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import {
  useVisiblePosts 
} from "../ts/nutritionService";

interface NutritionCardProps {
  data: Nutrition[];
}

const NutritionTable: React.FC<NutritionCardProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Nutrition | null>(null);
  // useVisiblePosts Hook 사용
  const { visiblePosts, handleLoadMore } = useVisiblePosts(5);

  const handleCardClick = (food: Nutrition) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);


  return (
    <div>
      {data.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <Row className="justify-content-start">
          {/* {data.map((food, index) => ( */}
          {data.slice(0, visiblePosts).map((food, index) => (
            <Col key={index} xs={12} className="">
              <Card
                key={index}
                onClick={() => handleCardClick(food)}
                style={{ cursor: "pointer", padding: "0rem", width: "100%" }}
              >

                <Card.Body className="text-start">
                  <div className="row">
                    <Card.Title className="foodName text-center">
                      <h3>{food.foodName}</h3>
                    </Card.Title>
                    <Card.Subtitle
                      className="text-muted"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{food.category}</span>
                      <span>
                        {food.protein >= 10 ? (
                          <span className="badge rounded-pill text-bg-danger ">
                            고단백
                          </span>
                        ) : null}
                        {food.fat <= 3 ? (
                          <span className="badge rounded-pill text-bg-light ">
                            저지방
                          </span>
                        ) : null}
                        {food.fat >= 15 ? (
                          <span className="badge rounded-pill text-bg-warning ">
                            고지방
                          </span>
                        ) : null}
                        {food.energy <= 40 ? (
                          <span className="badge rounded-pill text-bg-light ">
                            저칼로리
                          </span>
                        ) : null}
                        {food.fiber >= 2 ? (
                          <span className="badge rounded-pill text-bg-light ">
                            식이섬유
                          </span>
                        ) : null}
                        {food.sugar >= 15 ? (
                          <span className="badge rounded-pill text-bg-warning ">
                            당뇨
                          </span>
                        ) : null}
                        {food.sodium >= 400 ? (
                          <span className="badge rounded-pill text-bg-warning ">
                            나트륨
                          </span>
                        ) : null}
                      </span>
                    </Card.Subtitle>
                  </div>
                  {/* <hr /> */}
                  {/* <Card.Text> */}
                    {/* {food.carbohydrate > 10 ? ( null) : (<span className="badge rounded-pill text-bg-primary ">저탄수화물</span>)} */}

                    <div className="d-flex justify-content-between">
                      {/* 좌측 정보 */}
                      <div>
                          <strong>탄수화물:</strong> {food.carbohydrate} g{" "}
                          <br />
                          <strong>단백질:</strong> {food.protein} g <br />
                          <strong>지방:</strong> {food.fat} g
                      </div>
                      {/* 우측 정보 */}
                      <div className="text-end">
                          <br />
                          <strong>칼로리:</strong> {food.energy} kcal <br />
                          <strong>중량:</strong> {food.servingSize}
                      </div>
                    </div>
                  {/* </Card.Text> */}
                  {/* <hr /> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
           {/* 더보기 버튼 */}
      {visiblePosts < data.length && (
        <button onClick={handleLoadMore}>더보기</button>
      )}
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>영양성분</strong> - {selectedFood?.foodName}
            {/* <br/> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFood && (
            <>
              <div className="container-fluid row">
                <div className="col-md-6 ">
                  <p className="NutritionP">
                    <strong>탄수화물:</strong> {selectedFood.carbohydrate} g
                  </p>
                  <p className="NutritionPSub">당류: {selectedFood.sugar} g</p>
                  <p className="NutritionP">
                    <strong>단백질:</strong> {selectedFood.protein} g
                  </p>
                  <p className="NutritionP">
                    <strong>지방:</strong> {selectedFood.fat} g
                  </p>
                  <p className="NutritionPSub">
                    포화지방산: {selectedFood.saturatedFat} g
                  </p>
                  <p className="NutritionPSub">
                    트랜스지방산: {selectedFood.transFat} g
                  </p>
                  <p className="NutritionP">
                    <strong>콜레스테롤:</strong> {selectedFood.cholesterol} mg
                  </p>
                  <p className="NutritionP">
                    <strong>나트륨:</strong> {selectedFood.sodium} mg
                  </p>
                </div>
                <div className="col-md-6 ms-auto" >
                  <p className="NutritionP" style={{fontSize:'25px'}}>
                      <strong>칼로리:</strong> {selectedFood.energy} kcal
                  </p>
                  <p className="NutritionP">
                    <strong>{selectedFood.category}</strong>{" "}
                    {selectedFood?.servingSize} 당
                  </p>
                  <hr />
                  <p className="NutritionP">
                    <strong>식이섬유:</strong> {selectedFood.fiber} g
                  </p>
                  <p className="NutritionP">
                    <strong>칼슘:</strong> {selectedFood.calcium} mg
                  </p>
                  <p className="NutritionP">
                    <strong>칼륨:</strong> {selectedFood.potassium} mg
                  </p>
                  <p className="NutritionP">
                    <strong>비타민 D:</strong> {selectedFood.vitaminD} μg
                  </p>
                  {/* <br /> */}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        {/* 부트스트랩 기본 기능이 변경으로 인라인 방식으로 구현 */}
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          {selectedFood && (
            <>
              <div>
                {selectedFood.protein >= 10 ? (
                  <span className="badge rounded-pill text-bg-danger ">
                    고단백
                  </span>
                ) : null}
                {selectedFood.fat <= 3 ? (
                  <span className="badge rounded-pill text-bg-light ">
                    저지방
                  </span>
                ) : null}
                {selectedFood.fat >= 15 ? (
                  <span className="badge rounded-pill text-bg-warning ">
                    고지방
                  </span>
                ) : null}
                {selectedFood.energy <= 40 ? (
                  <span className="badge rounded-pill text-bg-light ">
                    저칼로리
                  </span>
                ) : null}
                {selectedFood.fiber >= 2 ? (
                  <span className="badge rounded-pill text-bg-light ">
                    식이섬유
                  </span>
                ) : null}
                {selectedFood.sugar >= 15 ? (
                  <span className="badge rounded-pill text-bg-warning ">
                    당뇨
                  </span>
                ) : null}
                {selectedFood.sodium >= 400 ? (
                  <span className="badge rounded-pill text-bg-warning ">
                    나트륨
                  </span>
                ) : null}
              </div>
            </>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NutritionTable;
