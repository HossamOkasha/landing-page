/* ---Global variables--- */
const navList = document.querySelector("ul"); //HTML element
const sections = document.querySelectorAll("section"); //NodeList
/* ---End of Global Variables--- */


/* ---build the nav--- */
//using a function to make a locally fragment
const buildNav = () => {
    // using fragment to add items to the nav
    let fragment = document.createDocumentFragment();
    
    sections.forEach(section => {
        const li = document.createElement("li");
        const secTitle = section.dataset.nav;
        // [navscroll] dataset for scrolling to a section using his id
        li.setAttribute("data-navscroll", section.id);
        li.textContent = `${secTitle}`;
        fragment.appendChild(li);
    });
    navList.appendChild(fragment);
}
buildNav();
/* ---End of the nav--- */


/* ---distinguish the section in view---*/
// Add class 'active' to section when near(~200px) top of viewport
// and remove the class from the section if it out of the viewport
window.addEventListener("scroll", function () {
    sections.forEach(section => {
        const offset = window.pageYOffset - section.offsetTop;
        const viewOut = .6*section.clientHeight;
        if (offset <= viewOut && offset >= (-viewOut+50) ){
            section.classList.add("active__section");            
        } else {
            section.classList.remove("active__section");
        }
    });
});
/* ---End of distinguishing the section--- */


/* ---Scroll to Sections--- */
navList.addEventListener("click", e => {
    // using the nav dataset in the items
    const sec = document.querySelector(`#${e.target.dataset.navscroll}`);
    window.scrollTo({
        top: sec.offsetTop - 100, // (-100) to avoid fixed navbar
        behavior: "smooth",
    });
});
/* ---End of Scroll to Sections--- */
