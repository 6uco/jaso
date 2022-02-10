import logo from "./logo.svg";
import "./App.scss";
import { useState } from "react";
import NewQuestion from "./components/newQuestion"

function App() {
  var quotes = [
    "이제는 진짜 자소서 뿐이야",
    "아직 늦지 않았다!!!",
    "진짜 써야된다",
  ];
  const [title, setTitle] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [titleInput, setTitleInput] = useState(false);

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
      <div>
        <NewQuestion color="pink"/>
      </div>
    </div>
  );
}

export default App;
