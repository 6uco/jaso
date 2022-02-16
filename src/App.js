import "./App.scss";
import { useEffect, useState } from "react";
import QuestionCell from "./components/newQuestion"
import downloadTxtFile from "./components/downloadTXT"
import downloadDocxFile from "./components/downloadDOCX"
import downloadPngFile from "./components/downloadPNG"
import {Header, Container, Button, mq} from "./emotions"
import DraggableModal from "./components/draggableModal"
import { Global, css } from "@emotion/react"
import { defaultTheme } from "./themes"

const data = {
  title: "",
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
    data.title !== "" ? data.title : quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [titleInput, setTitleInput] = useState(false);
  const [textData, setTextData] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  // const [tmp, setTmp] = useState(1)
  const [styles, setStyles] = useState(defaultTheme)

  const handleOpenModal = () => {
    setOpenModal(true)
    console.log(openModal);
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    console.log(openModal);
  }
  const handleStyles = (id, component, value) => {
    let newStyles = styles
    newStyles[component][id] = value
    if(value === "GilbeotTG"){
      newStyles[component].color = "text"
    }
    setStyles({...newStyles})
    console.log(newStyles);
  }

  useEffect(() => {
    const savedTextData = window.localStorage.getItem("textData")
    if((savedTextData) !== (undefined || null )){
      setTextData(JSON.parse(savedTextData))
      setTitle(JSON.parse(savedTextData).title != "" ? JSON.parse(savedTextData).title : quotes[Math.floor(Math.random() * quotes.length)])
    }
  },[])
  const setTitleInfo = (value) => {
    setTitle(value)
    var newTextData = textData
    newTextData.title = value
    setTextData({...newTextData})
    console.log(newTextData);
    window.localStorage.setItem("textData", JSON.stringify(newTextData))
  }
  const setQuestionInfo = (index, type, text) => {
    var newTextData = textData
    newTextData.questions[index][type] = text
    setTextData({...newTextData})
    window.localStorage.setItem("textData", JSON.stringify(newTextData))
    // console.log(newTextData);
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
      window.localStorage.setItem("textData", JSON.stringify(newTextData))
      console.log(JSON.stringify(newTextData))
    }
  }



  return (
    <Container style={{position:"relative"}}>
      <Global 
        styles = {{
          body:{
            fontFamily: "Pretendard-Regular",
            fontWeight: "200",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            maxWidth: "100%",
            backgroundColor: "white",
            [mq[1]]:{
              fontSize: "15px"
            }
          },
          "#root":{
            width: "60em",
            maxWidth: "100%",
          }}
        }
      />
      <DraggableModal open={openModal}  onClose={handleCloseModal} handleStyles={handleStyles} styles={styles}/>
      <Header styles={styles.header}>
        {titleInput ? (
          <div className="title-input">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e)=>setTitleInfo(e.target.value)}
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
        
      </Header>
      <Container className="row right" style={{fontSize:".8em"}}>
          <Button
            onClick={() => {
              setTitleInput(!titleInput)
            }}
            style={{display: styles.header.display}}
            styles={styles.button}
          >
          {styles.button.iconButton ? <span class="material-icons">border_color</span> : "제목 바꾸기"}
          </Button>
          <Button styles={styles.button} onClick={()=>{setTitleInfo(""); setTitle(quotes[Math.floor(Math.random() * quotes.length)]);}} style={{display: styles.header.display}}>
          {styles.button.iconButton ? <span class="material-icons">casino</span> : "랜덤 제목 사용하기"}
          </Button>
          <Button styles={styles.button} onClick={handleOpenModal}>
            {styles.button.iconButton ? <span class="material-icons">local_florist</span> : "자.꾸.(자소서 꾸미기)"}
          </Button>
        </Container>
      <div id="capture">
        {textData.questions.map((question, index) => (<QuestionCell buttonStyle={styles.button} questionStyle={styles.question} answerStyle={styles.answer} key={index} index={index} questionInfo={question} setQuestionInfo={setQuestionInfo} removeQuestion={removeQuestion}/>))}
        <Button className="add ignore" onClick={()=>newQuestion()}>
          + 항목 추가하기
        </Button>
      </div>
      <footer>
        <div className="emphasize">저장필수!!! (현재 저장독촉 주기: 5분)</div>
        <div>
          <Button>삭제</Button>
          <Button styles={styles.button} emotion={{color:"blue", backgroundColor:"yellow"}} onClick={()=>downloadDocxFile(textData.questions)}>{styles.button.iconButton ? <span class="material-icons">description</span> : ".docx"}</Button>
          <Button styles={styles.button} onClick={()=>downloadPngFile()}>{styles.button.iconButton ? <span class="material-icons">image</span> : ".png"}</Button>
          <Button styles={styles.button} onClick={()=>downloadTxtFile(textData.questions)}>{styles.button.iconButton ? <span class="material-icons">title</span> : ".txt"}</Button>
        </div>
      </footer>
    </Container>
  );
}

export default App;
