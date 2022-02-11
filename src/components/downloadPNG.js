import html2canvas from 'html2canvas'

export default function downloadPngFile () {
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
}
