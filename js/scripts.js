// Al hacer hover en la imagen ponerle display block al quick view
const quickView = document.querySelectorAll('.card__quick-view');
function leaveBrightnees() {
    this.style.filter = "brightness(1)"
}
function addBrightness() {
    this.style.filter = "brightness(0.7)"
}
function keepBrightness() {
    this.parentNode.children[0].style.filter = "brightness(0.7)";
    this.parentNode.children[0].addEventListener('mouseleave', leaveBrightnees);
    this.parentNode.children[0].addEventListener('mouseover', addBrightness);
}

quickView.forEach(element => {
    element.addEventListener('mouseover', keepBrightness);
});


// Agregarle la clase open cuando se clickee la imagen o el quick view
const images = document.querySelectorAll('.card__image');
function openModal() {
    document.body.style.overflow = "hidden"
    this.parentNode.children[0].style.transition = "filter 1s";
    this.parentNode.children[0].style.filter = "brightness(1)";
    this.parentNode.children[0].removeEventListener('mouseover', addBrightness);
    this.parentNode.classList.add('card__image--open');
    
}
quickView.forEach(element => {
    element.addEventListener('click', openModal)
});
images.forEach(element => {
    element.addEventListener('click', openModal)
});


//Realizar cosas cuando se clickea el icono de cerrar
document.addEventListener('click',function(event){
    const iconClose = event.target.closest('.card__close');
    if (iconClose !== null) {
        iconClose.parentNode.classList.remove('card__image--open');
        document.body.style.overflow = "auto";
    }
});



//lazy loading

function callback(entries, observer) {
    entries.forEach(entry =>{
        if (entry.isIntersecting){
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    })
}
let options = {
    root: null,
    rootMargin: '200px',
    threshold: 0
}
const allImages = document.querySelectorAll('img');
let observer = new IntersectionObserver(callback, options);
allImages.forEach(element => {
    observer.observe(element);
});



// // Busqueda de imágenes
const cardsTitles = document.querySelectorAll('.card__title');
const searchInput = document.querySelector('.nav__search');
const cards = document.querySelectorAll('.card')

function displayNoneAllCards() {
    if (searchInput.value !== ''){ 
        cards.forEach(element => { // Al escribir en el input darle um display none a todos los elementos
            element.style.display = "none"; 
        });
    }
}
searchInput.addEventListener('input', displayNoneAllCards)

// funcion de cerrar el noresult close
function closeReultsAlert(){
    this.parentNode.style.display = "none"
}
// filtrar la busqueda
function filtrar() {
    const searching = searchInput.value.toLowerCase();
    let aElementList = document.querySelectorAll('.nav_element');
    let currentTypeNavlist;
    aElementList.forEach(element => {
        if (element.className === "nav_element focus") {
            currentTypeNavlist = element.children[0].innerHTML.toLowerCase();
            let count = 0;
            for (cardTitle of cardsTitles){
                let cardTitleLower = cardTitle.innerHTML.toLowerCase();
                if(cardTitleLower.indexOf(searching) !== -1){
                    let currentTypeCardImage = cardTitle.parentNode.children[0].dataset.type.toLowerCase();
                    if (currentTypeNavlist !== "all") {
                        if (currentTypeNavlist === currentTypeCardImage) {
                            cardTitle.parentNode.style.display = "flex";
                            count = count + 1;
                        }
                    }else{
                        cardTitle.parentNode.style.display = "flex";
                        count = count + 1;
                    }
                }
                if(count === 0){
                    const NoResults = document.querySelector('.noResults');
                    const closeResults = document.querySelector('.noResults__close');
                    NoResults.style.display = "block";
                    // Cerrar el alert
                    closeResults.addEventListener('click', closeReultsAlert);
                }else{
                    document.querySelector('.noResults').style.display = "none";
                }
            }
        }
    });
}
searchInput.addEventListener('input', filtrar)

//Mandar al main cuando se presione el arrow
const arrow = document.querySelector('#arrow-container');
const nav = document.querySelector('nav');



// smooth scrolling
function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.offsetTop;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = easeOutExpo(timeElapsed, startPosition, distance, duration);
        window.scroll(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeOutExpo(t, b, c, d) {
        return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b -16;        
    }
    
    requestAnimationFrame(animation);
}

arrow.addEventListener('click', function(){
    smoothScroll('nav', 1000)
})
// Al clickear un elemento li se debe agregar la clase
const navListLi = document.querySelectorAll('.nav_element');
function addAndDeleteStyle() {
    for (let li of navListLi) {
        if (li.className === 'nav_element focus'){
            if(li !== this){
                li.classList.remove('focus')
            }
        }else if(li === this){
            li.classList.add('focus')
        }
    }
}
navListLi.forEach(element => {
    element.addEventListener('click', addAndDeleteStyle)
});



// Al clickear hacer que aparezca el tipo de imágenes
function displayNoneAllCards2() {
    cards.forEach(element => { // Al escribir en el input darle um display none a todos los elementos
        element.style.display = "none"; 
    });
}
function searchImagesByNav() {
    searchInput.value = "";
    displayNoneAllCards2();
    for (image of images){
        const type = image.dataset.type.toLowerCase();
        const aElement = this.children[0].innerHTML.toLowerCase();
        if (aElement === 'all') {
            image.parentNode.style.display = "flex"
        } else
        if(type.indexOf(aElement) !== -1){
            image.parentNode.style.display = "flex"
        }
    }
}
navListLi.forEach(element => {
    element.addEventListener('click', searchImagesByNav)
});


// appear and desappear GoUP button

const goUpButton = document.querySelector('.goUp');
const banner = document.querySelector('.banner');
let vh100 = banner.clientHeight;
function goUpButtonAppear(){
    vh100 = banner.clientHeight;
    if (window.pageYOffset > vh100 + cards[0].clientHeight){
        goUpButton.classList.add('goUp__popUp');
        goUpButton.classList.remove('goUp__popOff');
        goUpButton.style.opacity = "1";
    }else{
        goUpButton.classList.remove('goUp__popUp');
        goUpButton.classList.add('goUp__popOff');
    }
}
window.addEventListener('scroll', goUpButtonAppear);
window.addEventListener('load', goUpButtonAppear);

goUpButton.addEventListener('click', function(){
    smoothScroll('nav', 1000)
})