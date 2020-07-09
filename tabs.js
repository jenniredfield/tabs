console.log('log from tabs.js');

document.onload  = (() => {

    const tabs = document.querySelectorAll('[role="tab"]');
    console.log("document.onload -> tabs", tabs)
    const contentEls = document.querySelectorAll('[role="tabpanel"]');
    console.log("document.onload -> contentEls", contentEls)

})()