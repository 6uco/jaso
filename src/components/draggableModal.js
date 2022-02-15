import React, { useState } from "react";
import Draggable from "react-draggable";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  Container,
  DraggableParent,
  DraggableChild,
  DraggableContent,
  Button,
} from "../emotions";
import { SketchPicker, ChromePicker } from "react-color";

const inputStyle = { display: "inline", width: "auto" };
const ComponentBox = styled.div({
  width: "calc(50% - 1em)",
  margin: ".5em",
  display: "inline-block",
  padding: "1em",
  boxSizing: "border-box",
  border: "1px solid lightgray",
  boxShadow: "1px 1px 5px rgba(0,0,0,.1)",
  ".aLine": {
    display: "flex",
    justifyContent: "space-between",
  },
});
const ComponentTitle = styled.div({
  width: "100%",
  fontSize: "1.2em",
  fontWeight: "800",
  borderBottom: "1px solid gray",
  marginBottom: ".2em",
  fontFamily: "UhBeeJJIBBABBA"
});
const ColorChip = styled.div(
  {
    width: "1.3em",
    height: ".8em",
    display: "inline-block",
    verticalAlign: "middle",
    border: "1px solid lightgray",
  },
  (props) => ({ backgroundColor: props.color })
);

const components = {
  header: {
    name: "헤더",
    display: true,
    fontFamily: true,
    color: true,
    backgroundColor: true,
  },
  question: {
    name: "말풍선1",
    display: true,
    fontFamily: true,
    color: true,
    backgroundColor: true,
  },
  answer: {
    name: "말풍선2",
    display: true,
    fontFamily: true,
    color: true,
    backgroundColor: true,
  },
  button: {
    name: "버튼",
    display: false,
    fontFamily: true,
    color: true,
    backgroundColor: true,
  },
};

export default function DraggableModal(props) {
  const { open, onClose, handleStyles, styles } = props;
  //   console.log(open, onClose);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [pickerOpen, setPickerOpen] = useState("none");

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const popover = {
    position: "absolute",
    zIndex: "300",
    backgroundColor: "aliceblue",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  function colorChange(id, componentName, value) {
    // console.log(id+"Rgba", componentName, value, styles[componentName][id+"Rgba"]);
    handleStyles(
      { target: { id: id } },
      componentName,
      "rgba(" + value.r + ", " + value.g + ", " + value.b + ", " + value.a + ")"
    );
    handleStyles({ target: { id: id + "Rgba" } }, componentName, value);
  }

  return (
    <>
      <DraggableParent display={open === true ? "block" : "none"}>
        <Draggable
          handle=".handle"
          position={null}
          grid={[1, 1]}
          scale={1}
          onDrag={handleDrag}
          bounds="parent"
        >
          <DraggableChild>
            <div
              className="handle"
              style={{ cursor: "move", textAlign: "center" }}
            >
              <span className="material-icons">drag_handle</span>
            </div>
            <DraggableContent className="row">
              {Object.keys(components).map((value, index) => (
                <ComponentBox key={value.name}>
                  <ComponentTitle>{components[value].name} 설정</ComponentTitle>
                  {components[value].display && (
                    <div className="aLine">
                      숨기기
                      <input
                        style={inputStyle}
                        type="checkbox"
                        id="display"
                        checked={
                          styles[value].display === "none" ? "checked" : ""
                        }
                        onChange={(e) => {
                          handleStyles(
                            e,
                            String(value),
                            e.target.checked ? "none" : "block"
                          );
                        }}
                      />
                    </div>
                  )}
                  {components[value].fontFamily && (
                    <div className="aLine">
                      폰트
                      <select
                        id="fontFamily"
                        value={styles[value].fontFamily}
                        onChange={(e) => {
                          handleStyles(e, String(value), e.target.value);
                        }}
                      >
                        <option value="UhBeeJJIBBABBA">어비 찌빠빠체</option>
                        <option value="Pretendard-Regular">프리텐다드</option>
                        <option value="HS-Regular">HS산토끼체</option>
                        <option value="SANGJUGyeongcheonIsland">
                          상주경천섬체
                        </option>
                        <option value="CookieRunOTF-Black">쿠키런 Black</option>
                        <option value="KOTRA_SONGEULSSI">
                          코트라 손글씨체
                        </option>
                      </select>
                    </div>
                  )}
                  {components[value].color && (
                    <div className="aLine">
                      글자 색
                      <div>
                      <ColorChip color={styles[value].color} />
                        <button
                          id="color"
                          onClick={(e) => {
                            setPickerOpen(value + e.target.id);
                            console.log(pickerOpen);
                          }}
                        >
                          색상 선택
                        </button>
                      </div>
                      {pickerOpen === String(value + "color") ? (
                        <div style={popover}>
                          <div
                            style={cover}
                            onClick={() => setPickerOpen("none")}
                          />
                          <SketchPicker
                            id="color"
                            color={styles[value].colorRgba}
                            onChange={(e) =>
                              colorChange("color", String(value), e.rgb)
                            }
                          ></SketchPicker>
                        </div>
                      ) : null}
                    </div>
                  )}
                  {components[value].backgroundColor && (
                    <div className="aLine">
                      배경 색
                      <div>
                      <ColorChip color={styles[value].backgroundColor} />
                        <button
                          id="backgroundColor"
                          onClick={(e) => {
                            setPickerOpen(value + e.target.id);
                            console.log(pickerOpen);
                          }}
                        >
                          색상 선택
                        </button>
                      </div>
                      {pickerOpen === String(value + "backgroundColor") ? (
                        <div style={popover}>
                          <div
                            style={cover}
                            onClick={() => setPickerOpen("none")}
                          />
                          <SketchPicker
                            id="backgroundColor"
                            color={styles[value].backgroundColorRgba}
                            onChange={(e) =>
                              colorChange(
                                "backgroundColor",
                                String(value),
                                e.rgb
                              )
                            }
                          ></SketchPicker>
                        </div>
                      ) : null}
                    </div>
                  )}
                </ComponentBox>
              ))}

              
            </DraggableContent>

            <Container as="a" style={{ color: "blue" }}>
              <Button onClick={onClose} className="small" styles={{
                marginTop: "1em",
                width: "auto"
              }}>닫기</Button>
                
            </Container>
          </DraggableChild>
        </Draggable>
      </DraggableParent>
    </>
  );
}
