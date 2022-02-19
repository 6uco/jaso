import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import React from "react";

export default function downloadPngFile() {
  html2canvas(document.getElementById("capture"), {
      ignoreElements: function(element) {
          if (element.classList.contains("ignore")) return true
      }
  }).then(function(canvas) {
      const link = document.createElement('a');
      link.download = "자기소개서.png";
      link.href = canvas.toDataURL();
      link.click();
  });

//   domtoimage
//     .toPng(document.getElementById("capture"), {
//         bgcolor: "#ffffff",
//       filter: (element) => {
//           return true
//         //   console.log(element);
//         // console.log(element);
//         // console.log(element.childNodes);
//         // if (element.classList != undefined) {
//         //     //   console.log("ーーーーーーーーーーーーーーーーーーHEYYYYY Im working!!!!!");
//         //     //   console.log(element.classList);
//         //       if (element.classList.contains("ignore")) {
//         //       console.log("ーーーーーーーーーーーーーーーーーーIm working!!!!!");
//         //       return false
//         //   }else{
//         //     return true
//         // }
//         // }
//       },
//     })
//     .then(function (canvas) {
//       const link = document.createElement("a");
//       link.download = "자기소개서.png";
//       link.href = canvas;
//       link.click();
//     });
}
