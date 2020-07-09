console.log('log from tabs.js');

document.onload  = (() => {
    const tabsParent = document.querySelector('[role="tablist"]');
    const tabs = document.querySelectorAll('[role="tab"]');
    const contentEls = document.querySelectorAll('[role="tabpanel"]');

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


    let tabFocus = 0;

    tabsParent.addEventListener("keydown", e => {
    
      if (e.keyCode === 39 || e.keyCode === 37) {
        tabs[tabFocus].setAttribute("tabindex", -1);
        if (e.keyCode === 39) {
          tabFocus++;
    
          if (tabFocus >= tabs.length) {
            tabFocus = 0;
          }
   
        } else if (e.keyCode === 37) {
          tabFocus--;
 
          if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
          }
        }
  
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
      }
    });

})()