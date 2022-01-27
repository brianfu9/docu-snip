let startButton = document.getElementById("start");

startButton.addEventListener("click", async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['html2canvas.min.js']
    }, () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: takeScreenshotsOnClickListener
        });
    });
});

function takeScreenshotsOnClickListener() {
    document.addEventListener("click", async(event) => {
        console.log('click');
        var x = event.clientX,
            y = event.clientY,
            screenshotTarget = document.elementFromPoint(x, y);
        screenshotTarget.style.border = "5px solid red";
        html2canvas(document.body).then((canvas) => {
            console.log('screenshot');
            document.body.append("screenshot:");
            document.body.appendChild(canvas);
            screenshotTarget.style.border = "";
        });
    });
}