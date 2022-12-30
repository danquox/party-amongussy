const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let chosenColor;
let quizAvailable = false;
document.addEventListener("DOMContentLoaded", (event)=> {
  let buttonEnabled = true;
  document.getElementById("download-button").addEventListener("click", async(event)=> {
    if (!buttonEnabled) return;
    document.getElementById("loading-bar").style = "";
    buttonEnabled = false;

    let randomNumber = Math.floor(Math.random() * 15) + 1;
    let colorChoices = ["red", "blue", "green", "yellow"]
    document.getElementById("amongus-image").style = "";
    for (let i = 0; i <= 15; i++) {
      if (i === randomNumber) {
        chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)]
        document.getElementById("color-rect").style.backgroundColor = chosenColor;
        setTimeout(() => {
          document.getElementById("color-rect").style = "";
        }, 100);
      }
      document.getElementById("loading-bar").style.width = `${(i / 15) * 100}%`
      await sleep(1000);
    }
    document.getElementById("loading-bar").style.transitionDuration = "0.15s";
    document.getElementById("amongus-image").style = "animation: none; opacity: 0";
    // quiz
    document.getElementById("text-value").innerText = "What color appeared?"
    document.getElementById("color-quiz").style.display = "grid"
    quizAvailable = true;
  })

  Array.from(document.getElementsByClassName("color-option"), (element)=> {
    element.addEventListener("click", (event)=> {
      if (!quizAvailable) return;
      if (element.getAttribute("value") === chosenColor) {
        document.getElementById("text-value").innerText = "CORRECT"
        document.getElementById("text-value").style.color = "green";
        setTimeout(() => {
          document.getElementById("text-value").innerText = "This is where the color will appear."
          document.getElementById("text-value").style = ""
        }, 1000);
      } else {
        document.getElementById("text-value").innerText = "INCORRECT"
        document.getElementById("text-value").style.color = "red";
        setTimeout(() => {
          document.getElementById("text-value").innerText = "This is where the color will appear."
          document.getElementById("text-value").style = ""
        }, 1000);
      }
      setTimeout(() => {
        quizAvailable = false;
        buttonEnabled = true;
        document.getElementById("color-quiz").style.display = "none"
        document.getElementById("loading-bar").style = "";
      }, 1000)
    })
  })

  const observer = new ResizeObserver(entry => {
    let progressValueLength = entry[0]["contentRect"]["width"];
    let progressBarTotalLength = document.getElementsByClassName("loading-container")[0].offsetWidth;
    let progressNum = Math.round((progressValueLength / progressBarTotalLength) * 100);
    document.getElementById("progress-value").innerText = progressNum + "%";
  })

  observer.observe(document.getElementById("loading-bar"));

  document.getElementById("upload-button").addEventListener("click", (event) => {
    document.getElementById("download-button").innerText = "UPLOAD"
    let imageOneSRC = document.getElementById("image-one").getAttribute("src");
    let imageTwoSRC = document.getElementById("image-two").getAttribute("src");
    document.getElementById("image-two").setAttribute("src", imageOneSRC)
    document.getElementById("image-one").setAttribute("src", imageTwoSRC)
    
    document.getElementById("title").innerText = "Katelyns Crazy Amongus Game [UPLOAD]"
  })
})