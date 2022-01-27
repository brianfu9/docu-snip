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
    document.addEventListener('mousemove', function(mouseMoveEvent) {
        mousePosition = {}
        mousePosition.x = mouseMoveEvent.pageX;
        mousePosition.y = mouseMoveEvent.pageY;
    });
    document.addEventListener("keypress", async(event) => {
        if (event.key != 'p') return;
        console.log('click');
        var x = mousePosition.x,
            y = mousePosition.y,
            screenshotTarget = document.elementFromPoint(x, y);
        screenshotTarget.style.border = "5px solid red";
        var target = document.body;
        var screenshots = target.getElementsByClassName('screenshot');
        while (screenshots[0]) {
            screenshots[0].parentNode.removeChild(screenshots[0]);
        }
        html2canvas(target).then((canvas) => {
            canvas.classList.add('screenshot');
            console.log('screenshot');
            document.body.appendChild(canvas);
            screenshotTarget.style.border = "";
        });
    });
}