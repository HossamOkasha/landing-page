/* ---Global variables--- */
const navList = document.querySelector("ul"); //HTML element
const sections = document.querySelectorAll("section"); //NodeList
const topBtn = document.getElementById('topBtn');
/* ---End of Global Variables--- */


/* ---Helpers--- */
// dynamically returns an id(string) for the nav item from his section target
const generateLiID = section => {
    //id format: 'li1' 'li2' 'li3'
    return `li${section.id[section.id.length-1]}`;
}

// show and hide scroll to top btn
const showHideBtn = btn => {
    if(window.pageYOffset >= 500) {
        btn.style.display = "block";
    }
    else {
        btn.style.display = "none";
    }
}
/* End Of Helpers */


/* ---build the nav--- */
//using a function to make a locally fragment
const buildNav = () => {
    // using fragment to add items to the nav
    let fragment = document.createDocumentFragment();
    
    sections.forEach(section => {
        const li = document.createElement("li");
        const secTitle = section.dataset.nav;
        // [navscroll] dataset for storing section id
        li.setAttribute("data-navscroll", section.id);
        // adding id for the nav items  
        li.setAttribute("id", generateLiID(section)); 
        li.textContent = `${secTitle}`;
        fragment.appendChild(li);
    });
    navList.appendChild(fragment);
}
buildNav();
/* ---End of the nav--- */


/* ---distinguish the section in view---*/
// Add class 'active' to section when near top of viewport
// and remove the class from the section if it out of the viewport
window.addEventListener("scroll", function () {
    sections.forEach(section => {
        const offset = window.pageYOffset - section.offsetTop;
        const viewOut = .6*section.clientHeight;
        const currentLi = document.getElementById(generateLiID(section));
        if (offset <= viewOut && offset >= (-viewOut+50) ){
            const idInt = section.id[section.id.length-1] // format: 1 2 3 
            if ( idInt % 2 == 0) {
                topBtn.classList.add('btnPosition')
            } else {
                topBtn.classList.remove('btnPosition')         
            } 
            section.classList.add("active__section");  
            // activate the nav item 
            currentLi.classList.add('active__li');         
        } else {
            section.classList.remove("active__section");
            currentLi.classList.remove('active__li');
        }
    });
    showHideBtn(topBtn);
});
/* ---End of distinguishing the section--- */


/* ---Scroll to Sections--- */
navList.addEventListener("click", e => {
    // using the navscroll dataset to select the sections
    const sec = document.querySelector(`#${e.target.dataset.navscroll}`);
    window.scrollTo({
        top: sec.offsetTop - 100, // (-100) to avoid fixed navbar
        behavior: "smooth",
    });
});
/* ---End of Scroll to Sections--- */


/* ---Scroll To Top--- */
topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})
/* ---End Of Scroll To Top-- */