import React, { useState } from "react";
import "../styles/bubbles.scss";

export default function QuestionCell(props) {
  const { custom, index, questionInfo, setQuestionInfo, removeQuestion } = props;
  const [edit, setEdit] = useState("");
  return (
    <div className="conversation">
      <div className="container row left auto ac">
        {custom.avatar.use && <div className="avatar" />}
        {edit === "question" ? (
          <div className="question input">
            <input
              id="question"
              type="text"
              placeholder="어떤 항목이 나를 반길까..?"
              value={questionInfo.question}
              onBlur={() => setEdit("")}
              onChange={(e) => setQuestionInfo(index, "question", e.target.value)}
              autoFocus
            ></input>
          </div>
        ) : (
          <div className="question" onClick={() => setEdit("question")}>
            {questionInfo.question ? questionInfo.question : "여기를 클릭해서 질문 내용을 입력!!"}
          </div>
        )}
        <div className="button" onClick={()=>removeQuestion(index)}>
          삭제
        </div>
      </div>
      <div className="answer">
      {edit === "answer" ? (
          <textarea
            id="answer"
            type="text"
            placeholder="자신없어도 자신있고 당당하게!! 그것이 자소서!!"
            value={questionInfo.answer}
            onBlur={() => setEdit("")}
            onChange={(e) => setQuestionInfo(index, "answer", e.target.value)}
            autoFocus
          ></textarea>
      ) : (
        <div onClick={() => setEdit("answer")}>
          {questionInfo.answer ? questionInfo.answer : "여기를 클릭해서 답변 내용을 입력!!"}
        </div>
      )}
      <div className="counter">공백엔터포함: {questionInfo.answer.length.toLocaleString("ko-KR")}자</div>
      </div>
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
