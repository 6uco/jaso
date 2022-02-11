// import * as fs from "fs";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";

export default function downloadDocxFile(questions) {
  var textData = [];
  textData.push(new Paragraph({text:"이 문서는 https://6uco.github.io/jaso 에서 생성되었습니다.", font: {name:"Calibri"},}))

  questions.map((value, index) => {
    textData.push(
      new Paragraph({
        text: value.question,
        heading: HeadingLevel.HEADING_2,
        thematicBreak: true,
        font: "Calibri",
        spacing: {
            before: 1000,
            after: 300
        }
      })
    );
    value.answer.split("\n").map(line => textData.push(new Paragraph({break:1, text:line, font: "Calibri",})))
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: textData,
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "자기소개서.docx";
    document.body.appendChild(element);
    element.click();
  });
}
