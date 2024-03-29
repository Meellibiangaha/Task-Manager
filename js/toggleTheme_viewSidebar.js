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
        document.body.style.display = "none";
        setTimeout(() => document.body.style.display = "", 1); //я не знаю как, но это убирает ненужную анимацию при f5
        let toggle = document.querySelector('.toggle-checkbox');
        toggle.checked = !toggle.checked;
        document.getElementById("theme_link").setAttribute("href", 'css/light_theme.css');
    }
}

let sidebar = document.querySelector(".sidebar");
const sidebarWidth = sidebar.offsetWidth;

function openSidebar() {
    let gridMain = document.querySelector('.grid-container_closeSidebar');
    gridMain.classList.remove('grid-container_closeSidebar');
    gridMain.classList.add('grid-container_openSidebar');

    document.querySelector('.sidebar_AllBoards_text').style.fontSize = '';
    document.querySelector('.sidebar_title_text').style.display = "flex";
    document.querySelector('.sidebar_toggle_box').style.display = "flex";
    document.querySelector('.sideba_viewSidebar_text').style.display = "block";
    document.querySelector('.sideba_viewSidebar_text').style.width = '';

    let papki = document.querySelectorAll('.sidebar_papka_name');
    for(let text of papki){
        text.style.display = "flex";
    }
}

function closeSidebar() {
    let gridMain = document.querySelector('.grid-container_openSidebar');
    gridMain.classList.remove('grid-container_openSidebar');
    gridMain.classList.add('grid-container_closeSidebar');
    
    document.querySelector('.sidebar_AllBoards_text').style.fontSize = 15 + 'px';
    document.querySelector('.sidebar_title_text').style.display = "none";
    document.querySelector('.sidebar_toggle_box').style.display = "none";
    document.querySelector('.sideba_viewSidebar_text').style.display = "none";

    let papki = document.querySelectorAll('.sidebar_papka_name');
    for(let text of papki){
        text.style.display = "none";
    }
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

  