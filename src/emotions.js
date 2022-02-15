import {css} from "@emotion/react"
import styled from "@emotion/styled"

const shadowGray = "rgba(206, 206, 206, 0.3)"

const containerStyle = props => 
      css`
        // background-color: cornsilk;
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.row{
            flex-direction: row;
        }
        &.right{
            justify-content: flex-end;
            // background-color: darkblue;
        }
        &.left{
            justify-content: flex-start;
        }
        &.ac{
            align-items: center;
        }
      `

export const Header = styled.header({
    marginTop: ".3em",
    // background-color: antiquewhite;
    textAlign: "center",
    fontSize: "4em",
    fontFamily: "Pretendard Medium",
    transition: "all .2s ease",
    ".button":{
      fontSize: ".2em"
    },
    ".title-input":{
      fontSize: "inherit",
      "& input":{
        width: "100%",
        fontSize: "1em",
        fontFamily: "Pretendard Medium"
      }
    }
}, props=>(props.styles))
export const Container = styled.div`${containerStyle}`

export const Button = styled.button({
    fontSize: "inherit",
    padding: ".4em .8em",
    backgroundColor: "white",
    border: "1.5px solid lightgray",
    boxShadow: "5px 5px 10px "+shadowGray,
    borderRadius: ".8em",
    fontFamily: "$font-2",
    cursor: "pointer",
    transition: "all .2s ease",
    marginTop: "2.5px",
    "&:hover":{
        boxShadow: "5px 7.5px 10px "+shadowGray,
        marginTop: "0px",
        marginBottom: "2.5px",
    },
    "&.add":{
        marginTop: "5em",
        padding: "1em 1.4em",
        borderRadius: "1em",
        fontSize: "1em",
        // background-color: lavender,
        marginBottom: "10em",
    },
    "&.medium":{
        fontSize: "1em",
    },
    "&.small":{
        fontSize: ".8em",
        padding: ".3em .6em",
        borderRadius: "2em",
        marginLeft: ".5em",
    }
}, props => (props.styles));

export const QuestionBubble = styled.div({
    backgroundColor: "rgb(241, 241, 252)",
    willChange: "filter",
    filter: "drop-shadow(5px 5px 10px "+shadowGray+")",
    padding: "1em 1.2em",
    borderRadius: "1.5em",
    minWidth: "10em",
    maxWidth: "70%",
    whiteSpace: "normal",
    boxSizing: "border-box",
    border: "1.5px solid rgb(198, 198, 221)",
    transition: "all .2s ease",
    "&.input":{
        width: "30em",
        maxWidth: "100%",
        input:{
            fontFamily: "inherit",
            padding: "none",
            margin: "none",
            fontSize: "1em",
            maxWidth: "100%",
            backgroundColor: "transparent",
            whiteSpace: "normal",
        }
    }
}, props => (props.styles))

export const AnswerBubble = styled.div({
        backgroundColor: "white",
        willChange: "filter",
        // boxShadow: ""5px 5px 10px $shadow-gray",
        filter: "drop-shadow(5px 5px 10px "+shadowGray+")",
        padding: "1em 1.2em",
        borderRadius: "1.5em",
        width: "100%",
        maxWidth: "100%",
        marginTop: ".5em",
        boxSizing: "border-box",
        // white-space: "pre-wrap",
        zIndex: "10",
        border: "1.5px solid lightgray",
        transition: "all .2s ease",
        div:{
            whiteSpace: "pre-wrap",
        },
        textarea:{
            fontFamily: "inherit",
            fontSize: "1em",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            border: "none",
            resize: "vertical",
            "&:focus":{
                outline: "none",
            }
        }
}, props => (props.styles))

export const DraggableParent = styled.div(
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
  
  export const DraggableChild = styled.div({
    width: "30em",
    height: "17em",
    zIndex: 200,
    backgroundColor: "white",
    position: "absolute",
    top: "calc(50vh - 7.5em)",
    left: "calc(50vw - 15em)",
    border: "1px solid lightgray",
    borderRadius: "1em",
    boxShadow: "2px 2px 5px gray",
    paddingTop: ".3em",
    resize: "both",
    fontFamily: "Pretendard-Regular"
  });
  
  export const DraggableContent = styled.div({
      height:"calc(100% - 5em)", 
      padding: "1em",
      fontSize: ".7em", 
      overflow:"auto",
      display: "flex",
      flexWrap: "wrap",
      "::-webkit-scrollbar" :{
        width: "0px",
        background: "transparent" /* make scrollbar transparent */
      },
      // flexDirection: "row",
      // alignItems: "flex-start",
      // justifyContent: "flex-start"
  })