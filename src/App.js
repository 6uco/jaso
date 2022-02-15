import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import QuestionCell from "./components/newQuestion"
import downloadTxtFile from "./components/downloadTXT"
import downloadDocxFile from "./components/downloadDOCX"
import downloadPngFile from "./components/downloadPNG"
import {Header, Container, Button} from "./emotions"
import DraggableModal from "./components/draggableModal"
import { Global, css } from "@emotion/react"
import { defaultTheme } from "./themes"

const data = {
  questions:[
    {
      question: "",
      answer: ""
    }
  ]
}

// const styles = {
//   header:{
//     visible: true,
//   }
// }

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
  const handleStyles = (e, component, value) => {
    let newStyles = styles
    console.log(e, component, e.target.id, value);
    newStyles[component][e.target.id] = value
    if(value === "GilbeotTG"){
      newStyles[component].color = "text"
    }
    setStyles({...newStyles})
    console.log(newStyles);
  }

  useEffect(() => {
    const savedTextData = window.localStorage.getItem("textData")
    if((savedTextData) != undefined){
      setTextData(JSON.parse(savedTextData))
    }
  },[])

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
    }
  }



  return (
    <Container style={{position:"relative"}}>
      <Global 
        styles = {
          css`

          body{
            font-family: 'Pretendard-Regular';
            font-weight: 200;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            max-width: 100%;
            background-color: white;
            // background-color: darkkhaki;
          }

          #root{
            width: 60em;
            max-width: 100%;
          }
          `
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
        
      </Header>
      <Container className="row right" style={{fontSize:".8em"}}>
          <Button
            onClick={() => {
              setTitleInput(!titleInput)
            }}
            style={{display: styles.header.display}}
            styles={styles.button}
          >
            격려 문구 바꾸기
          </Button>
          <Button styles={styles.button} onClick={()=>setTitle(quotes[Math.floor(Math.random() * quotes.length)])} style={{display: styles.header.display}}>
            랜덤 문구 사용하기
          </Button>
          <Button styles={styles.button} onClick={handleOpenModal}>자.꾸.(자소서 꾸미기)</Button>
        </Container>
      <div id="capture">
        {textData.questions.map((question, index) => (<QuestionCell  questionStyle={styles.question} answerStyle={styles.answer} key={index} index={index} questionInfo={question} setQuestionInfo={setQuestionInfo} removeQuestion={removeQuestion}/>))}
        <Button className="add ignore" onClick={()=>newQuestion()}>
          + 항목 추가하기
        </Button>
      </div>
      <footer>
        <div className="emphasize">저장필수!!! (현재 저장독촉 주기: 5분)</div>
        <div>
          <Button styles={styles.button} emotion={{color:"blue", backgroundColor:"yellow"}} onClick={()=>downloadDocxFile(textData.questions)}>.docx</Button>
          <Button styles={styles.button} onClick={()=>downloadPngFile()}>.png</Button>
          <Button styles={styles.button} onClick={()=>downloadTxtFile(textData.questions)}>.txt</Button>
        </div>
      </footer>
    </Container>
  );
}

export default App;
