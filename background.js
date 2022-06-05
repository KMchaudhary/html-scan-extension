console.log("Background script running!");

chrome.action.onClicked.addListener(buttonClicked);

isOn = false;

function buttonClicked(tab) {
    console.log("Clicked on extension icon");
    isOn = !isOn;
    let msg = {
        on: isOn
    };
    chrome.tabs.sendMessage(tab.id, msg);  
}