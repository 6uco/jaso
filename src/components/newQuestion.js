import React from "react";
import "../styles/bubbles.scss";

export default function NewQuestion(props) {
  const {custom} = props;
  return (
    <div className="conversation">
      <div className="container row left">
        { custom.avatar.use && <div className="avatar"/>}
        <div className="question">
            <p>냠냠</p>
        </div>
      </div>
    </div>
  );
}

NewQuestion.defaultProps = {
  custom: {
    avatar: {
      use: false
    }
  }
}
