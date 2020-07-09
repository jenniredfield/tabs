console.log('log from tabs.js');

document.onload  = (() => {

    const tabs = document.querySelectorAll('[role="tab"]');
    console.log("document.onload -> tabs", tabs)
    const contentEls = document.querySelectorAll('[role="tabpanel"]');
    console.log("document.onload -> contentEls", contentEls);


    function updateTab(e) {
        // update tab selected
        const targetId = e.target.id;

        tabs.forEach(tab => {
            const tabId = tab.getAttribute('id');
            if(tabId === targetId) {
                tab.setAttribute('aria-selected', true);
                return;
            }

            tab.setAttribute('aria-selected', false);
        });

        // update content selected
        contentEls.forEach(contentEl => {
            const ariaControlledBy = contentEl.getAttribute('aria-labelledby');
            console.log("updateTab -> ariaControlledBy", ariaControlledBy)
            
            if (ariaControlledBy === targetId) {
                contentEl.removeAttribute('hidden');
                return;
            }
            contentEl.setAttribute('hidden', true);
        })

    }

    tabs.forEach(tab => {
        tab.addEventListener('click', updateTab);
    })

})()