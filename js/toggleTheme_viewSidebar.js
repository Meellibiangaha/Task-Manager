let userTheme;
function swapTheme() {
    var link = document.getElementById("theme_link");
    let lightTheme = "css/light_theme.css";
    let darkTheme = "css/dark_theme.css";
    var currTheme = link.getAttribute("href");
    var theme = "";

    if(currTheme == lightTheme)
    {
   	 currTheme = darkTheme;
   	 theme = "dark_theme";
     userTheme = currTheme;
    }
    else
    {    
   	 currTheme = lightTheme;
   	 theme = "light_theme";
     userTheme = currTheme;
    }
    localStorage.setItem('theme', userTheme);
    link.setAttribute("href", currTheme);
}

let toggleButton = document.querySelector('.toggle-checkbox');
toggleButton.addEventListener('click', swapTheme);


window.onload = function() {
    if(localStorage.getItem('theme') == 'css/light_theme.css'){
        let toggle = document.querySelector('.toggle-checkbox')
        toggle.checked = !toggle.checked;
        document.getElementById("theme_link").setAttribute("href", 'css/light_theme.css');
    }
}

let sidebar = document.querySelector(".sidebar");
const sidebarWidth = sidebar.offsetWidth;

function openSidebar() {
    sidebar.style.width = sidebarWidth + 'px';
}

function closeSidebar() {
    sidebar.style.width = "100px";
}

let viewSidebarButton = document.querySelector('.viewSidebar_box');
viewSidebarButton.addEventListener('click', function() {
    let currentSidebarWith = sidebar.offsetWidth;

    if(sidebarWidth != currentSidebarWith){
        openSidebar();
    }
    else{
        closeSidebar();
    }
});

// const stylesheet = new CSSStyleSheet();

// stylesheet.replace('body { font-size: 1.4em; } p { color: red; }')
//   .then(() => {
//     console.log(stylesheet.cssRules[0].cssText);
//   })
//   .catch((err) => {
//     console.error('Failed to replace styles:', err);
//   });

  