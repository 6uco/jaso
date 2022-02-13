import React, { useState } from "react";
import Draggable from "react-draggable";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {Container} from "../emotions"

const DraggableParent = styled.div(
{
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 100,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  (props) => ({ display: props.display })
);

const DraggableChild = styled.div({
  width: "30em",
  height: "15em",
  zIndex: 200,
  backgroundColor: "white",
  position: "absolute",
  top: "calc(50vh - 7.5em)",
  left: "calc(50vw - 15em)",
  border: "1px solid lightgray",
  borderRadius: "1em",
  boxShadow: "2px 2px 5px gray",
  padding: ".3em 1em 1em 1em",
});

export default function DraggableModal(props) {
  const { open, onClose } = props;
  //   console.log(open, onClose);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

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
            <div className="handle" style={{ cursor: "move", textAlign: "center" }}>
              <span className="material-icons">drag_handle</span>
            </div>
            <Container className="row">
                <Container style={{backgroundColor: "aliceblue"}}>hey</Container>
                <Container style={{backgroundColor: "cornsilk"}}>hey</Container>
                <Container onClick={onClose} as="a" style={{color: "blue"}}>close</Container>
            </Container>
          </DraggableChild>
        </Draggable>
      </DraggableParent>
    </>
  );
}
