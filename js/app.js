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

/* ---Add functionality to distinguish the section in view---*/
// Add class 'active' to section when near(~200px) top of viewport
// and remove the class from the section if it out of the viewport
window.addEventListener("scroll", function () {
    sections.forEach(section => {
        const offset = window.pageYOffset - section.offsetTop;
        const viewOut = .6*section.clientHeight;
        if (offset <= viewOut && offset >= -150) {
            section.classList.add("active__section");            
        } else {
            section.classList.remove("active__section");
        }
    });
});
/* ---End of distinguishing section--- */