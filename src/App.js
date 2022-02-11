import logo from "./logo.svg";
import "./App.scss";
import { useState } from "react";
import QuestionCell from "./components/newQuestion"
import downloadTxtFile from "./components/downloadTXT"
import downloadDocxFile from "./components/downloadDOCX"
import downloadPngFile from "./components/downloadPNG"

const data = {
  questions:[
    {
      question: "",
      answer: ""
    }
  ]
}

function App() {
  var quotes = [
    "이제는 진짜 자소서 뿐이야",
    "지금 쓰면 안늦음!!!",
    "내가 최고다",
    "나는 면접장을 찢어 그걸해"
  ];
  const [title, setTitle] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [titleInput, setTitleInput] = useState(false);
  const [textData, setTextData] = useState(data);

  const setQuestionInfo = (index, type, text) => {
    var newTextData = textData
    newTextData.questions[index][type] = text
    setTextData({...newTextData})
    console.log(newTextData);
  }
  const newQuestion = () => {
    const newTextData = textData
    newTextData.questions.push({question:"", answer:""})
    setTextData({...newTextData})
  }
  const removeQuestion = (index) => {
    const newTextData = textData
    if (window.confirm("정말 이 항목을 삭제하실 건가요? 삭제된 항목은 되돌릴 수 없어요!")) {
      newTextData.questions.splice(index,1)
      setTextData({...newTextData})
    }
  }



  return (
    <div className="container">
      <header>
        {titleInput ? (
          <div className="title-input">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  setTitleInput(false)
                }
              }}
              onBlur={()=>setTitleInput(false)}
              autoFocus
            ></input>
          </div>
        ) : (
          <div className="title">{title}</div>
        )}
        <div className="container row right">
          <button
            className="button"
            onClick={() => {
              setTitleInput(!titleInput)
            }}
          >
            격려 문구 바꾸기
          </button>
          <button className="button" onClick={()=>setTitle(quotes[Math.floor(Math.random() * quotes.length)])}>
            랜덤 문구 사용하기
          </button>
          <button className="button">자.꾸.(자소서 꾸미기)</button>
        </div>
      </header>
      <div id="capture">
        {textData.questions.map((question, index) => (<QuestionCell  key={index} index={index} questionInfo={question} setQuestionInfo={setQuestionInfo} removeQuestion={removeQuestion}/>))}
        <button className="button add ignore" onClick={()=>newQuestion()}>
          + 항목 추가하기
        </button>
      </div>
      <footer>
        <div className="emphasize">저장필수!!! (현재 저장독촉 주기: 5분)</div>
        <div>
          <button className="button medium" onClick={()=>downloadDocxFile(textData.questions)}>.docx</button>
          <button className="button medium" onClick={()=>downloadTxtFile(textData.questions)}>.txt</button>
          <button className="button medium" onClick={()=>downloadPngFile()}>.png</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
