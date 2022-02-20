import React, { useState } from "react";
import Draggable from "react-draggable";
import styled from "@emotion/styled";
import {
  Container,
  DraggableParent,
  DraggableChild,
  DraggableContent,
  Button,
  mq
} from "../emotions";
import { SketchPicker } from "react-color";

const inputStyle = { display: "inline", width: "auto" };
const ComponentBox = styled.div({
  // width: "calc(50% - 1em)",
  width: "100%",
  marginBottom: ".5em",
  display: "inline-block",
  padding: "1em",
  boxSizing: "border-box",
  border: "1px solid lightgray",
  boxShadow: "1px 1px 5px rgba(0,0,0,.1)",
  ".aLine": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "1.7em",
    "input[type='range']":{
      width:"7em",
      verticalAlign: "middle"
    },
    "input[type='text']":{
      width: "2em",
      border: "1px solid lightgray",
      height: "1em",
    },
    [mq[1]]:{
      input:{
        fontSize: "inherit",
        height: "100%",
        verticalAlign: "middle",
      },
      button:{
        fontSize: "inherit",
        height: "80%",
        verticalAlign: "middle",
      },
      select:{
        fontSize: "inherit",
        height: "80%",
        verticalAlign: "middle",
      }
    },
    
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
const ContentWrapper = styled.div(
  {
    height: "calc(100% - 1em)",
    boxSizing: "border-box",
    overflow: "auto",
    "::-webkit-scrollbar": {
      width: "0px",
      background: "transparent" /* make scrollbar transparent */,
    },
  }
)

const components = {
  header: {
    name: "헤더",
    display: true,
    fontFamily: true,
    color: true,
    textShadow: true,
    backgroundColor: true,
    boxShadow: true,
    filterShadow: true,
  },
  question: {
    name: "말풍선1",
    display: true,
    fontFamily: true,
    color: true,
    textShadow: true,
    backgroundColor: true,
    boxShadow: true,
    filterShadow: true,
  },
  answer: {
    name: "말풍선2",
    display: true,
    fontFamily: true,
    color: true,
    textShadow: true,
    backgroundColor: true,
    boxShadow: true,
    filterShadow: true,
  },
  button: {
    name: "버튼",
    display: false,
    fontFamily: true,
    color: true,
    textShadow: true,
    backgroundColor: true,
    boxShadow: true,
    filterShadow: true,
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
    position: "fixed",
    zIndex: "300",
    backgroundColor: "aliceblue",
    bottom: 0,
    margin: "auto"
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  const updateShadow = (name, component, shadowProps) => {
    let out = ""
    out += shadowProps.x + "px "
    out += shadowProps.y + "px "
    out += shadowProps.blur + "px "
    out += "rgba("
    out += shadowProps.rgba.r + ", "
    out += shadowProps.rgba.g + ", "
    out += shadowProps.rgba.b + ", "
    out += shadowProps.rgba.a + ")"
    handleStyles(name + "ShadowProps", component, shadowProps)
    if(name === "filter"){
      handleStyles("filter", component, "drop-shadow("+out+")")
    }else{
      handleStyles(name + "Shadow", component, out);
    }
  }
  const makeRgba = (rgba) => {
    let out = ""
    out += "rgba("
    out += rgba.r + ", "
    out += rgba.g + ", "
    out += rgba.b + ", "
    out += rgba.a + ")"
    return out
  }

  function colorChange(id, componentName, value) {
    // console.log(id+"Rgba", componentName, value, styles[componentName][id+"Rgba"]);
    handleStyles(
      id,
      componentName,
      "rgba(" + value.r + ", " + value.g + ", " + value.b + ", " + value.a + ")"
    );
    handleStyles(id + "Rgba", componentName, value);
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
              style={{ cursor: "move", textAlign: "center", position: "sticky" }}
            >
              <span className="material-icons">drag_handle</span>
            </div>
            <ContentWrapper>
            <DraggableContent className="row">
              {Object.keys(components).map((value, index) => (
                <ComponentBox key={value}>
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
                            e.target.id,
                            String(value),
                            e.target.checked ? "none" : "block"
                          );
                        }}
                      />
                    </div>
                  )}
                  {value==="button" && (
                    <div className="aLine">
                      아이콘 버튼 사용하기
                      <input
                        style={inputStyle}
                        type="checkbox"
                        id="iconButton"
                        checked={styles[value].iconButton}
                        onChange={(e) => {
                          handleStyles(
                            e.target.id,
                            String(value),
                            e.target.checked ? true : false
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
                          handleStyles(e.target.id, String(value), e.target.value);
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
                        <option value='Pretendard-Light'>프리텐다드 Light</option>
                        <option value='Pretendard-Black'>프리텐다드 Black</option>
                        <option value="PFStardust">PF스타더스트</option>
                        <option value="BMEuljiro10yearslater">을지로10년후체</option>
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
                        <div style={{position: "absolute"}}>
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
                        </div>
                      ) : null}
                    </div>
                  )}
                  {components[value].textShadow && (
                    <div className="aLine">
                      글자 그림자 사용하기
                      <input
                        style={inputStyle}
                        type="checkbox"
                        id="useTextShadow"
                        checked={styles[value].useTextShadow}
                        onChange={(e) => {
                          handleStyles(
                            e.target.id,
                            String(value),
                            e.target.checked ? true : false
                          );
                          if(e.target.checked){
                            updateShadow("text", String(value), styles[value].textShadowProps)
                          }else{
                            handleStyles("textShadow", String(value), "unset")
                          }
                        }}
                      />
                    </div>
                  )}
                  {styles[value].useTextShadow && (
                    <>
                    <div className="aLine">
                      ㄴ 글자 그림자 색
                      <div>
                        <ColorChip color={makeRgba(styles[value].textShadowProps.rgba)}/>
                        <button
                          id="textShadowColor"
                          onClick={(e) => {
                            setPickerOpen(value + e.target.id);
                            console.log(pickerOpen);
                          }}
                        >색상 선택
                        </button>
                      </div>
                      {pickerOpen === String(value + "textShadowColor") ? (
                        <div style={popover}>
                          <div
                            style={cover}
                            onClick={() => setPickerOpen("none")}
                          />
                          <SketchPicker
                            id="color"
                            color={styles[value].textShadowProps.rgba}
                            onChange={(e) =>{
                              updateShadow("text", String(value), {...styles[value].textShadowProps, rgba:e.rgb})
                            }}
                          ></SketchPicker>
                        </div>
                      ) : null}
                    </div>
                    <div className="aLine">
                      ㄴ 글자 그림자 거리 (가로)
                      <div>
                        {styles[value].textShadowProps.x}
                        <input type="range" value={styles[value].textShadowProps.x} id="textShadowProps.x" min="-10" max="10" onChange={(e)=>{
                          updateShadow("text", String(value), {...styles[value].textShadowProps, x:e.target.value})
                        }} />
                      </div>
                    </div>
                    <div className="aLine">
                      ㄴ 글자 그림자 거리 (세로)
                      <div>
                        {styles[value].textShadowProps.y}
                        <input type="range" value={styles[value].textShadowProps.y} id="textShadowProps.y" min="-10" max="10" onChange={(e)=>{
                          updateShadow("text", String(value), {...styles[value].textShadowProps, y:e.target.value})
                        }} />
                      </div>
                    </div>
                    <div className="aLine">
                      ㄴ 글자 그림자 흐리기
                      <div>
                        {styles[value].textShadowProps.blur}
                        <input type="range" value={styles[value].textShadowProps.blur} id="textShadowProps.blur" min="0" max="30" onChange={(e)=>{
                          updateShadow("text", String(value), {...styles[value].textShadowProps, blur:e.target.value})
                        }} />
                      </div>
                    </div>
                    </>
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
                  {components[value].boxShadow && (
                    <div className="aLine">
                      사각 그림자 사용하기
                      <input
                        style={inputStyle}
                        type="checkbox"
                        id="useBoxShadow"
                        checked={styles[value].useBoxShadow}
                        onChange={(e) => {
                          handleStyles(
                            e.target.id,
                            String(value),
                            e.target.checked ? true : false
                          );
                          if(e.target.checked){
                            updateShadow("box", String(value), styles[value].boxShadowProps)
                          }else{
                            handleStyles("boxShadow", String(value), "unset")
                          }
                        }}
                      />
                    </div>
                  )}
                  {styles[value].useBoxShadow && (
                    <>
                    <div className="aLine">
                      ㄴ 사각 그림자 색
                      <div>
                        <ColorChip color={makeRgba(styles[value].boxShadowProps.rgba)}/>
                        <button
                          id="boxShadowColor"
                          onClick={(e) => {
                            setPickerOpen(value + e.target.id);
                            console.log(pickerOpen);
                          }}
                        >색상 선택
                        </button>
                      </div>
                      {pickerOpen === String(value + "boxShadowColor") ? (
                        <div style={popover}>
                          <div
                            style={cover}
                            onClick={() => setPickerOpen("none")}
                          />
                          <SketchPicker
                            id="color"
                            color={styles[value].boxShadowProps.rgba}
                            onChange={(e) =>{
                              updateShadow("box", String(value), {...styles[value].boxShadowProps, rgba:e.rgb})
                            }}
                          ></SketchPicker>
                        </div>
                      ) : null}
                    </div>
                    <div className="aLine">
                      ㄴ 사각 그림자 거리 (가로)
                      <div>
                        {styles[value].boxShadowProps.x}
                        <input type="range" value={styles[value].boxShadowProps.x} id="boxShadowProps.x" min="-10" max="10" onChange={(e)=>{
                          updateShadow("box", String(value), {...styles[value].boxShadowProps, x:e.target.value})
                        }} />
                      </div>
                    </div>
                    <div className="aLine">
                      ㄴ 사각 그림자 거리 (세로)
                      <div>
                        {styles[value].boxShadowProps.y}
                        <input type="range" value={styles[value].boxShadowProps.y} id="boxShadowProps.y" min="-10" max="10" onChange={(e)=>{
                          updateShadow("box", String(value), {...styles[value].boxShadowProps, y:e.target.value})
                        }} />
                      </div>
                    </div>
                    <div className="aLine">
                      ㄴ 사각 그림자 흐리기
                      <div>
                        {styles[value].boxShadowProps.blur}
                        <input type="range" value={styles[value].boxShadowProps.blur} id="boxShadowProps.blur" min="0" max="30" onChange={(e)=>{
                          updateShadow("box", String(value), {...styles[value].boxShadowProps, blur:e.target.value})
                        }} />
                      </div>
                    </div>
                    </>
                  )}
                </ComponentBox>
              ))}

            </DraggableContent>
            </ContentWrapper>

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
