console.log('log from tabs.js');

document.onload  = (() => {

    function createTabs() {
        const TABS_FROM_CMS = [
            {
                tabId: 'tab-1', 
                tabTitle: 'Tab 1',
                contentTitle: 'Title 1',
                content: 'Content 1'
            },
            {
                tabId: 'tab-2', 
                tabTitle: 'Tab 2',
                contentTitle: 'Title 2',
                content: 'Content 2'
            },
            {
                tabId: 'tab-3', 
                tabTitle: 'Tab 3',
                contentTitle: 'Title 3',
                content: 'Content 3'
            },
        ];

        const wrapper = document.querySelector('.cms__container');
        const tabsParent = document.createElement('div');
        tabsParent.setAttribute('aria-label', 'Challenge Tabs');
        tabsParent.setAttribute('role', 'tablist');
        tabsParent.classList.add('cms__tabs-list-container')
        wrapper.append(tabsParent);

        // const tabsParent = document.querySelector('[role="tablist"]');

        TABS_FROM_CMS.forEach((tabData, i) => {
            // create buttons

            const button = document.createElement('button');
            button.classList.add('cms__tabs-list-button');
            button.setAttribute('id', tabData.tabId);
            button.setAttribute('role', 'tab');
            button.setAttribute('tabindex', '-1');
            button.setAttribute('aria-controls', tabData.tabId.replace('tab', 'content'));
            button.setAttribute('aria-selected', false);
            button.textContent = tabData.tabTitle;

            if (i === 0) {
                button.setAttribute('tabindex', '0');
                button.setAttribute('aria-selected', true);
            }

            tabsParent.append(button);
        });

        // create content
 
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('cms__tabs-content-container');
        wrapper.append(contentContainer);

     
        TABS_FROM_CMS.forEach((tabData, i )=> {
            const div = document.createElement('div');
            div.classList.add('cms__tabs-content-item');
            div.setAttribute('id', tabData.tabId.replace('tab', 'content'));
            div.setAttribute('role', 'tabpanel');
            div.setAttribute('tabindex', 0);
            div.setAttribute('aria-labelledby', tabData.tabId);

            const h2 = document.createElement('h2');
            h2.innerText = tabData.contentTitle;
            div.append(h2);

            const p = document.createElement('p');
            p.innerText = tabData.content;
            div.append(p);

            if(i !== 0) {
                div.setAttribute('hidden', true)
            }

            contentContainer.append(div);
        });

        addListeners()
    }   


    createTabs()


    function addListeners() {
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
    }
})()