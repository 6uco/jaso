import React, { useState } from "react";
import "../styles/bubbles.scss";
import {QuestionBubble, AnswerBubble, Button} from "../emotions"

export default function QuestionCell(props) {
  const { custom, index, questionInfo, setQuestionInfo, removeQuestion, questionStyle, answerStyle, buttonStyle } = props;
  const [edit, setEdit] = useState("");

  // useEffect(() => {
  //   const elem = document.getElementById("answer")
  //   if(elem && (elem != undefined)){
  //     elem.style.height = elem.scrollHeight
  //   }
  // })

  return (
    <div className="conversation">
      <div className="container row left auto ac">
        {custom.avatar.use && <div className="avatar" />}
        {/* <div className="container left auto">
          lala
        </div> */}
        {edit === "question" ? (
          <QuestionBubble className="input" styles={questionStyle}>
            <input
              id="question"
              type="text"
              placeholder="어떤 항목이 나를 반길까..?"
              value={questionInfo.question}
              onBlur={() => setEdit("")}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  setEdit("")
                }
              }}
              onChange={(e) => setQuestionInfo(index, "question", e.target.value)}
              autoFocus
            ></input>
          </QuestionBubble>
        ) : (
          <QuestionBubble styles={questionStyle} onClick={() => setEdit("question")}>
            {questionInfo.question ? questionInfo.question : "여기를 클릭해서 질문 내용을 입력!!"}
          </QuestionBubble>
        )}
        <Button styles={buttonStyle} className="small ignore" onClick={()=>removeQuestion(index)}>
        <span className="material-icons">delete</span>
        </Button>
      </div>
      <AnswerBubble styles={answerStyle}>
      {edit === "answer" ? (
          <textarea
            id="answer"
            type="text"
            placeholder="자신없어도 자신있고 당당하게!! 그것이 자소서!!"
            value={questionInfo.answer}
            onBlur={() => setEdit("")}
            onChange={(e) => {
              setQuestionInfo(index, "answer", e.target.value)
              document.getElementById("answer").style.height = e.target.scrollHeight
            }}
            onFocus={(e) => {
              document.getElementById("answer").style.height = e.target.scrollHeight
            }}
            autoFocus
          ></textarea>
      ) : (
        <div onClick={() => setEdit("answer")}>
          {questionInfo.answer ? questionInfo.answer : "여기를 클릭해서 답변 내용을 입력!!"}
        </div>
      )}
      <div className="counter ignore">공백엔터포함: {questionInfo.answer.length.toLocaleString("ko-KR")}자 / 공백제외: {questionInfo.answer.replace(/ /g,"").length.toLocaleString("ko-KR")}자</div>
      </AnswerBubble>
    </div>
  );
}

QuestionCell.defaultProps = {
  custom: {
    avatar: {
      use: false,
    },
  },
  questionInfo: {
    question: "",
    answer: "",
  },
};
