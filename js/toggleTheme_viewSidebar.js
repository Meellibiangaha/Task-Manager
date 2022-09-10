function swapTheme() {
	let lightTheme = "css/light_theme.css";
    let darkTheme = "css/dark_theme.css";
	var link = document.getElementById("theme_link");
    var currTheme = link.getAttribute("href");
    var theme = "";

    if(currTheme == lightTheme)
    {
   	 currTheme = darkTheme;
   	 theme = "dark_theme";
    }
    else
    {    
   	 currTheme = lightTheme;
   	 theme = "light_theme";
    }

    link.setAttribute("href", currTheme);
}
let toggleButton = document.querySelector('.toggle-checkbox');
toggleButton.addEventListener('click', swapTheme);

function viewSidebar() {
    
}