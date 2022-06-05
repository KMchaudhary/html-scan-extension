(() => {
    console.log("content script run!");
    let active = false;

    let cssPath = chrome.runtime.getURL('css/my-style.css');

    let headNode = document.querySelector('head');

    const info = document.createElement("div");
    info.id = "info-container-html-scan";

    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssPath;

    chrome.runtime.onMessage.addListener(gotMessage);

    function gotMessage(message, sender, sendResponse) {
        if(message.on) {
            console.log("turn on");
            document.head.appendChild(link);
            active = true;
            document.addEventListener('mouseover', displayInfo);

            document.body.appendChild(info);
        } else {
            console.log("turn off");
            document.head.removeChild(link);
            active = false;
            document.removeEventListener('mouseover', displayInfo);

            document.body.removeChild(info);
        }
    }

    function displayInfo(e) {
        info.innerHTML = `
            <span class="html-scan-span">TAG : </span> ${e.target.tagName.toLowerCase()}
            <span class="html-scan-span">CLASS : </span> ${e.target.className}
        `
    }

})();