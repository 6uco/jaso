export default function downloadTxtFile(questions) {
    var textData = ""
    questions.map((value, index) => {
        textData += "----------------------"+index+"----------------------\n\n"
        textData += "● " + value.question + "\n\n" + value.answer + "\n\n\n"
    })
    const element = document.createElement("a");
    const file = new Blob([textData], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "자기소개서.txt";
    document.body.appendChild(element);
    element.click();
};