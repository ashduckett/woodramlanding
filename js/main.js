let animationEnded = false;

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startingPosition = window.pageYOffset;
    var distance = targetPosition - startingPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime == null) {
            startTime = currentTime;
        }

        var timeElapsed = currentTime - startTime;
        //var run = ease(timeElapsed, startingPosition, distance, duration);
        var run = ease(timeElapsed, startingPosition, targetPosition, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}



if (location.pathname === '/') {
    history.replaceState({
        url: location.origin + '/index.html'}, 'Title', location.pathname);
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function calculateNavOpacity() {

    const scrollPosition = window.scrollY;

    // Next get the client height
    const clientHeight = document.documentElement.clientHeight;

    // Get the % of the first section scrolled past.
    const percent = scrollPosition / clientHeight;

    if (percent <= 1 && document.querySelector('.header__blurred-underlay')) {
        document.querySelector('.header__blurred-underlay').style.opacity = (percent * 2);
    }

    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    if (scrollTop > 0) {
        document.querySelector('nav').classList.add('has-scrolled');
    } else {
        document.querySelector('nav').classList.remove('has-scrolled');
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isScrolledIntoView(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
  
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  
    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }


const switchHeaderImage = (index) => {
    // Get hold of the landing header div
    const imageDivs = document.getElementsByClassName('header__unblurred-image');

    let i = 0;

    for (let image of imageDivs) {
        image.style.opacity = 0;
        if (i === index) {
            image.style.opacity = 1;
        }

        i++;
    }
};

function startSpin() {
    const s = document.querySelector('.submit');
    s.innerHTML = '<i class="fas fa-spinner fa-spin">';
}

function fireTextAnimation() {
    // Get hold of everything that is intended to scroll up.
    const animatables = document.querySelectorAll('.animIn');

    animatables.forEach((item) => {
        if (isScrolledIntoView(item) && !item.classList.contains('slideIn')) {
            item.classList.add('slideIn');
        }
    })
}

function fixChatIconPosition() {
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const topOfFooter = document.querySelector('footer').offsetTop;
    const height = document.documentElement.clientHeight;

    const chatThingy = document.querySelector('.chaport-container');

    if (chatThingy !== null) {
        if (scrollTop + height >= topOfFooter) {
            chatThingy.style.position = 'absolute';
            chatThingy.style.top = topOfFooter + 'px';
            chatThingy.style.left = '100%';
        } else {
            chatThingy.style.position = 'fixed';
            chatThingy.style.top = 'auto';
            chatThingy.style.right = '0px';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Fix for iOS
    window.onresize = function() {
        document.body.height = document.documentElement.clientHeight;
        document.querySelector('.header').style.height = document.documentElement.clientHeight + 'px';
        document.querySelectorAll('.header__unblurred-image').forEach((item) => { item.style.height = document.documentElement.clientHeight + 'px' });
    }
    window.onresize(); // called to initially set the height.

    calculateNavOpacity();

    // Create loading swiper
    const swiper = document.createElement('div');
    swiper.classList.add('swiper');
    
    // Logo
    const logo = document.createElement('div');
    logo.classList.add('loadingLogo');
    logo.style.top = document.documentElement.clientHeight / 2 + 'px';


    // There must be a better way but ajax gave a delay on loading which was quite noticable.
    logo.insertAdjacentHTML('beforeend', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.37 110.37"><defs></defs><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M86.41,53.79l0,0h0l0,0Z"/><path class="cls-1" d="M84.09,41.51c0,.09,0,.16.12.18-.08,0-.11-.09-.12-.18Z"/><path class="cls-1" d="M84,41.6a.33.33,0,0,1,.06-.1h0A.33.33,0,0,0,84,41.6Z"/><path class="cls-2" d="M55.19,0a55.19,55.19,0,1,0,55.18,55.19A55.19,55.19,0,0,0,55.19,0ZM90.38,48.58c.43-.12.56.2.78.39-.14.3-.47.46-.52.82l-.27-.08c0-.19,0-.39.15-.54s0-.15,0-.23A2.13,2.13,0,0,0,90.38,48.58ZM75.7,26.36l.08.09s0,.06,0,.09l-.08,0-.07-.19Zm-.31,0,.16.06,0,.08-.14-.08ZM65.76,20.5s.06,0,.08,0l0,.07s-.06,0-.06-.05S65.75,20.5,65.76,20.5Zm-6.43-.26-.35.05C59.11,20.05,59.14,20,59.33,20.24Zm-29.89,11,.25.23-.29.18C29.25,31.47,29.25,31.47,29.44,31.24ZM19.93,49.12l-.1.35c0,.07-.08.18-.06.2a.72.72,0,0,1,.19.59l-.27.12c0-.37-.33-.54-.53-.84C19.37,49.36,19.51,49.06,19.93,49.12Zm-1.3,6s0,0,0,0,0,0,0,0l0,0ZM63.17,79.78l.27-.22c.09.07.27,0,.3.2A.45.45,0,0,1,63.17,79.78ZM92.05,56.31c0,.18-.19.24-.34.28s-.16,0-.24.11-.16-.05-.23-.15l0,.28H91c-.27,0-.39,0-.33.31a.4.4,0,0,1-.06.38.26.26,0,0,1-.12,0c-.07-.07-.11-.19-.19-.24s-.19,0-.27-.15-.23-.06-.36-.08c0,.33,0,.35.59.48l-.1.16,0,0c.34.06.5.34.66.57a1.53,1.53,0,0,1,.17.66c0,.06,0,.14-.09.2l-.25.37-.24-.15a.2.2,0,0,0-.16.26c0,.13.09.25,0,.37a4.31,4.31,0,0,1-.37.37,1.17,1.17,0,0,1-.25.11l-.21-.2-.06.08-.33-.24-.18.27c0-.05-.09-.09-.08-.11l.19-.46a2.26,2.26,0,0,0-.3.17,2.51,2.51,0,0,0-.21.23l-.19-.23c-.06.11-.1.2-.15.31.19,0,.45,0,.5.33a1.13,1.13,0,0,1,.81,0l-.29.16,0,.23-.25,0-.11.17a.82.82,0,0,1,.19.18,1.21,1.21,0,0,1,.11.32.9.9,0,0,1,0,.28.7.7,0,0,0-.27,0s0,.13,0,.2,0,.16-.27.29v-.4l-.36.21a1.09,1.09,0,0,1,.17.22c.09.16.14.2.31.13s.24-.15.38-.23l.15.18c.26-.28.44.17.75,0,0,.25-.08.43-.11.63a1,1,0,0,1,.21.08.44.44,0,0,1,.13.23A.43.43,0,0,1,90,64a1.38,1.38,0,0,1-.25.17l-.23.13L90,65a2.08,2.08,0,0,1,.91.23c.07,0,.12.13.16.2s.34.37.33.65c0,.09.07.17.09.25s0,.24,0,.36a1.21,1.21,0,0,0,0,.19c0,.17,0,.25-.12.38s-.2,0-.3.06.24.48-.1.64c.1.17.25.34,0,.52,0,0,0,.08,0,.08.2.12,0,.21,0,.33l.19.14a.56.56,0,0,1,0,.1.49.49,0,0,0-.2.44c0,.17-.16.14-.27.13-.15.18,0,.32.06.46s.1.11.13.18a.36.36,0,0,1,0,.41.35.35,0,0,1-.4.07l-.23-.07c-.18-.07-.35-.23-.6,0a.73.73,0,0,0,.33.84.81.81,0,0,1,.18.19c.15.23.12.35-.23.52a1.06,1.06,0,0,1,.22.13c.14.15.1.34-.1.38a1.8,1.8,0,0,0-.68.25.58.58,0,0,1-.32,0,.36.36,0,0,0-.34.16c-.15.21-.23.23-.44.14-.1.17-.18.34-.29.5a.38.38,0,0,1-.25.14,1.11,1.11,0,0,0-.94.79c-.18.45-.17.45-.64.31s-.7-.18-1-.31a8,8,0,0,1-.84-.38,1.05,1.05,0,0,0-.54.88c-.12.72-.14.75-.84.94a.92.92,0,0,1-.52,0A.4.4,0,0,1,82,76a1,1,0,0,0-.87-.52l-.7,0a2.23,2.23,0,0,0-.89.12c-.15,0-.29.12-.45,0s-.14,0-.2.07-.08.1-.12.15l-.11-.09h0c-.11.26-.38.2-.56.3a.24.24,0,0,0-.11.15c0,.28-.2.34-.43.37a.92.92,0,0,0-.32.14.66.66,0,0,1-1,0,.34.34,0,0,0-.36,0c0,.16,0,.31,0,.47a.6.6,0,0,1-.58-.09c-.05.15-.1.26,0,.39s0,.23-.1.29l-.23.07a.71.71,0,0,0-.47.27.37.37,0,0,1-.42.12c-.29-.06-.58-.17-.87-.2a3.87,3.87,0,0,0-.76,0s-.1,0-.13,0c-.32-.15-.66,0-1,0s-.37,0-.44-.28c0-.07-.09-.12-.15-.16s-.11,0-.16,0a1.47,1.47,0,0,0-1.09,0,3.31,3.31,0,0,1-1,.06l-.34,0c0,.1,0,.17,0,.24l-.28,0c-.25,0-.24,0-.37-.19a.71.71,0,0,0-.7-.45c-.06,0-.12,0-.19,0-.31,0-.62-.08-.92-.08a1,1,0,0,0-.48.12c-.28.16-.27.18-.49.21a2.91,2.91,0,0,1-.79,1l.09.18c-.1.19-.15.42-.45.41-.05,0-.11.09-.17.14l-.18.19a1.7,1.7,0,0,1,.06.18l-.21-.07-.15.19c-.06-.1-.12-.18-.2-.29l0,.26c-.2,0-.37,0-.46-.26s-.33-.22-.51-.3-.12,0-.16.08a.56.56,0,0,1-.52.16.88.88,0,0,0-.32,0A1.2,1.2,0,0,1,59.8,79l-.14-.1-.19.4c0-.12,0-.28-.14-.31a.33.33,0,0,0-.2.39.32.32,0,0,1-.34-.13,1.39,1.39,0,0,0-.19-.15c-.11-.09-.2-.15-.35-.07s-.23,0-.27.17-.15.09-.23.11-.38.1-.61.16c0,.61-.1,1.21-.14,1.81s-.07,1.2-.1,1.8c0,.2,0,.4,0,.6,0,.67,0,1.34.07,2,0,.4.1.8.16,1.19,0,.07,0,.15.05.19.42.41.71,1,1.39,1.08a4.4,4.4,0,0,1,.89.29,1.28,1.28,0,0,1,.27.16l0,.08-.31.05c-.58,0-1.15.06-1.73.06-.42,0-.83-.06-1.24-.06-1.14,0-2.28,0-3.42,0-.57,0-1.13,0-1.7-.07a2.63,2.63,0,0,1-.38-.07,1,1,0,0,1,.22-.17,2,2,0,0,1,.41-.15,2.76,2.76,0,0,0,1.34-.85,1,1,0,0,0,.3-.61,3.27,3.27,0,0,1,.14-.62,6.88,6.88,0,0,0,.2-1.56c0-1.1,0-2.21,0-3.31,0-.52,0-1-.1-1.57a.51.51,0,0,0-.65-.44c-.25.08-.5.17-.75.23a2.44,2.44,0,0,1-.39,0,.71.71,0,0,0-.34.08.26.26,0,0,1-.37,0c-.14-.1-.27-.23-.47-.18a.15.15,0,0,1-.09,0c-.09-.07-.18-.23-.26-.22-.4,0-.8-.22-1.19,0-.23.12-.4,0-.58-.1a1.63,1.63,0,0,1-.22-.17c.15-.09.23-.2.09-.37l-.31.15c0-.14,0-.25-.07-.43l-.21.3a.46.46,0,0,0-.57-.11,1,1,0,0,1-.8-.08l-.37-.14.24-.28c-.18-.07-.32-.18-.43,0a5.13,5.13,0,0,0-.66-.13c-.19,0-.32-.07-.29-.33l-.25.15c-.28-.15,0-.42-.12-.6a.9.9,0,0,0-.66.5l.28,0c-.12.22-.26.37-.48.38s-.51.13-.64-.2c0,0-.17,0-.22,0a1,1,0,0,0-.16.32c-.1.29-.19.36-.51.35a.93.93,0,0,1-.83-.33l-.08,0c-.18.15-.3-.09-.47-.07s-.38-.22-.48-.43A.21.21,0,0,0,40,77.5v.23l0,0a1,1,0,0,0-1,.46.6.6,0,0,1-.56.31.83.83,0,0,0-.67.21.3.3,0,0,1-.22.06,4,4,0,0,0-1.19.23.42.42,0,0,1-.46-.11.73.73,0,0,0-.5-.29l-.22-.08a.17.17,0,0,1-.09-.27c.15-.23,0-.44,0-.66,0,0-.07-.06-.1-.07a2.57,2.57,0,0,0-.4-.08.45.45,0,0,0-.42.13.57.57,0,0,1-.74,0,1.22,1.22,0,0,0-.63-.26.26.26,0,0,1-.27-.25c0-.22-.14-.28-.32-.32s-.33,0-.33-.28l-.18.15a.35.35,0,0,0-.48-.21c-.13,0-.28-.06-.42-.09a3.4,3.4,0,0,0-1.87.06.8.8,0,0,0-.43.36.66.66,0,0,1-.73.31c-.27-.06-.54-.12-.81-.2a.79.79,0,0,0-.67.09,1.17,1.17,0,0,1-1.07.19,2.05,2.05,0,0,0-.7,0c-.21,0-.42,0-.63,0s-.2,0-.26.05a1.05,1.05,0,0,1-.73.14,1,1,0,0,0-.45,0c-.11,0-.29-.09-.33-.22a.25.25,0,0,1,.17-.37l-.3-.1c-.1-.15.05-.36.37-.48l-.08-.2.34,0a.39.39,0,0,1-.1-.39c0-.1,0-.23-.06-.35a.76.76,0,0,1-.06-.35.79.79,0,0,0-.17-.72c-.19.15-.32,0-.42-.14s-.21-.23-.42-.17-.23,0-.34-.09-.32-.15-.49-.2-.24,0-.28-.18.06-.23.17-.3l0,0c-.08-.09-.22-.2-.2-.28a.63.63,0,0,1,.23-.41.81.81,0,0,0,.34-.91c-.26-.2-.47,0-.69.05l-.06,0c-.24.08-.41.06-.49-.06a.5.5,0,0,1,.07-.56.92.92,0,0,0,.15-.25c0-.12,0-.23-.14-.23s-.22-.13-.2-.27,0-.22-.14-.21c0,0,0-.09,0-.12a2.36,2.36,0,0,1,.14-.24c-.21-.1.09-.33-.08-.47.13-.14-.1-.34.1-.44-.32-.19-.08-.44-.11-.68a.55.55,0,0,1-.22,0C19,68,19,68,18.9,67.92s-.06,0-.06-.08c0-.24,0-.48,0-.72a1.84,1.84,0,0,1,.35-.87.77.77,0,0,1,.47-.41c.24,0,.48-.12.77-.19a.66.66,0,0,1,.45-.54l-.4-.23a.49.49,0,0,1-.17-.83.47.47,0,0,0,.12-.5.86.86,0,0,1,0-.16l.89-.26a3.21,3.21,0,0,0,.31.19c.21.1.24.07.36-.14s.11-.08.21-.15l-.37-.24-.05.35c-.27-.08-.27-.08-.19-.46h-.28a.41.41,0,0,1,0-.5c0-.11.06-.28.27-.26-.05-.11-.09-.22-.14-.32l-.18.12a.79.79,0,0,0-.38-.44.89.89,0,0,1,.78,0,.49.49,0,0,1,.58-.33L22,60.63a2.22,2.22,0,0,1-.18.22c-.08-.08-.14-.16-.21-.22a1.94,1.94,0,0,0-.24-.15c-.07.2.22.33.05.56l-.14-.23c-.19-.1-.25.29-.46.12l-.21.27a5.06,5.06,0,0,0-.58-.25,2.1,2.1,0,0,0-.56-.07c-.42,0-.61-.32-.8-.62,0-.07-.09-.14-.13-.22a1.92,1.92,0,0,1-.18-.31c-.07-.23-.12-.47-.19-.74l.3-.18,0-.2,0,0,.22.16c.05-.11.12-.14.26-.17a4.12,4.12,0,0,0,1-.18,1.51,1.51,0,0,0,.26-.18h0a2.9,2.9,0,0,0,.36-.25,1,1,0,0,0,.12-.27c-.22,0-.38-.1-.49.12a.13.13,0,0,1-.1.06.2.2,0,0,0-.22.16c0,.07-.13.12-.27.23a2.87,2.87,0,0,1,0-.42c.05-.34,0-.42-.38-.35h-.08l-.06-.23c-.1,0-.18.31-.29,0,0,0-.06,0-.1,0-.28,0-.37-.08-.44-.35s-.09-.39-.12-.58.16-.3.41-.32c0,.16.07.32.1.47h0c.05-.2.11-.39.16-.6l-.15,0a.53.53,0,0,1,0-.31c.09-.15.27-.26.32-.41s.2-.23.37-.27.17.22.07.39l.35.11a1.09,1.09,0,0,0,0-.15,1.18,1.18,0,0,0-.11-.19c.05,0,.13,0,.14,0,.14-.29.43-.51.43-.87s0-.39.27-.47c0,0,.09-.12.08-.18,0-.36,0-.5.36-.62,0,0,0,0,.07,0l0-.24c-.32,0-.44-.1-.49-.4s-.2-.4-.15-.64c0,0-.14-.07-.16-.13-.09-.25-.16-.5-.24-.74.4-.28.55-.35.3-.65.15-.16.15-.16.43,0a4,4,0,0,0-.05-.53c-.08-.29-.05-.37.25-.41l.21-.06c0,.14,0,.25-.05.39l-.29.27c.23.09.34,0,.43-.18,0,.12.06.19.08.27s.07,0,.08-.06a1.55,1.55,0,0,1,.05-.23,2.34,2.34,0,0,1,.19-.26l-.3-.13a2.19,2.19,0,0,0,0-.36.64.64,0,0,1,.17-.67.78.78,0,0,0,.15-.4.21.21,0,0,1,0-.11c.13-.22.27-.43.38-.65a.29.29,0,0,0-.11-.4.76.76,0,0,0-.28-.09.46.46,0,0,1-.34-.68,1.35,1.35,0,0,1,.19-.31.45.45,0,0,0,0-.63,1.62,1.62,0,0,1-.06-.22l.46-.1a.72.72,0,0,1,.43-.6l.51-.36h0a3.48,3.48,0,0,1,.39-.28c.25-.12.41-.27.37-.57,0-.11,0-.12.27-.17l.25.35a1.09,1.09,0,0,0-.17.13.32.32,0,0,0-.08.14.12.12,0,0,0,0,.1,2.44,2.44,0,0,0,.27.3.53.53,0,0,1,.21-.54l.49.07a.7.7,0,0,0-.62-.7c.17-.37.43-.46.74-.24a3.31,3.31,0,0,1,.18-.3,2.61,2.61,0,0,0,0,.31c.09-.11.2-.18.22-.27s.17-.24.38-.28l-.19-.29c0-.08.08-.21.12-.34l.33,0c0-.19.15-.38-.08-.55,0,0,0-.15.05-.21s.16-.2.26-.33l.11.2.39-.17-.24-.28c.12-.08.23-.13.32-.2s.23-.18.26-.29.18-.23.33-.26,0-.27.06-.4a.39.39,0,0,0-.06-.18A1.13,1.13,0,0,1,27.32,37a.4.4,0,0,0,0-.39c-.16-.3,0-.52.16-.75s.17-.29.24-.44a.93.93,0,0,1,.34-.49c.1-.07.14-.23.23-.33.19-.26.39-.51.59-.77,0,0,.1-.11.09-.13s.07-.26.11-.41c.19.13.32,0,.48-.09s.06-.11,0-.13c-.18-.22,0-.35.1-.48s0-.06,0-.09c-.37,0-.37,0-.51-.52l.23-.08-.08-.08c0-.11.36-.12.42,0a1.29,1.29,0,0,1,.06.21H30a1.76,1.76,0,0,1,0-.33,2.13,2.13,0,0,1,.15-.36l-.38-.17c-.13-.2.07-.5-.25-.66a2.1,2.1,0,0,0,.61-.86.41.41,0,0,1,.42-.26l1,0a2.89,2.89,0,0,0,.29,0,4.34,4.34,0,0,1,.44,0,.7.7,0,0,1,.53-.27l0,.17.25-.11a.6.6,0,0,0,.58.41l-.24-.36a.42.42,0,0,1,.12-.65,1.48,1.48,0,0,0,.35-.25A.24.24,0,0,0,34,28c0-.22.15-.35.26-.52s.24-.06.37-.07a.65.65,0,0,0,.46-.18.94.94,0,0,1,.3-.15c.07-.13.13-.26.21-.38a.62.62,0,0,0,.17-.5c0-.07,0-.15,0-.22s.05-.16,0-.21,0-.26.11-.36a.58.58,0,0,0,.3-.47c0-.17.13-.26.33-.27l-.06.19a2.78,2.78,0,0,0,.38.12.21.21,0,0,0,.18-.1c.08-.2.21-.24.42-.25s.36-.24.5-.4a1.15,1.15,0,0,0,.28-.83,1.75,1.75,0,0,1,0-.46c0-.08.09-.14.1-.17l.74.09-.29-.35-.13.21s0-.09,0-.11c.09-.2.16-.24.32-.14s.35,0,.33.3c0,0,.18.07.18.11a2.06,2.06,0,0,1,0,.43.76.76,0,0,1,.72-.28c.28.06.56.21.48.63.32-.09.39.17.6.29l.32-.21c0-.21.16-.2.3-.2s0-.21.06-.33a.5.5,0,0,0,.43-.22,1.91,1.91,0,0,1,.35-.27.58.58,0,0,0-.58.1c-.14-.08-.12-.18,0-.25s.2-.19.35-.12a.92.92,0,0,1,.3.14c.18.19.38.06.56.05s.15-.1.25-.17l.17.06a1.2,1.2,0,0,1,.16-.4,4,4,0,0,0,.3-.29,1.47,1.47,0,0,1,.39-.26c-.08-.14-.12-.3.08-.42s.1-.18,0-.3a4.69,4.69,0,0,1-.21-.54c.16,0,.22-.22.42-.19,0,0,.11-.08.16-.13l.24-.28.06-.09.2-.41-.31-.18,0,0a.89.89,0,0,0,.76-.07.56.56,0,0,1,.63,0,.81.81,0,0,0,.45.13c.15,0,.19.07.23.2l.31-.29.18.09.15-.27.09.06c0,.1,0,.21,0,.38a1.92,1.92,0,0,0,.19-.17s0-.07,0-.1c.11-.38.21-.44.56-.32l.53-.31.28-.18a1,1,0,0,1,.86-.2.2.2,0,0,0,.13,0c.34-.08.36-.06.43.28a.25.25,0,0,0,0,.07l.31-.2a.63.63,0,0,1,.1.64.85.85,0,0,0,.21.67.38.38,0,0,0,.41,0,.93.93,0,0,1,.27-.12.46.46,0,0,1,.56.22l.13.2c0,.06.07.13.12.22l.29-.23c.11-.1.2-.14.33,0a.47.47,0,0,0,.44.22c.09,0,.19.12.29.19l-.1.14a3.57,3.57,0,0,0,.46.26.82.82,0,0,0,.38,0c.46-.14.65,0,.78.42l-.17.05v.07a3.3,3.3,0,0,0,.52.13.41.41,0,0,1,.38.26l-.34.34c-.15,0-.24-.28-.46-.05l.24.08v.28l.34-.05c.07-.15.09-.3.18-.38s.21,0,.32-.06c.4-.1.67.14,1,.45,0-.42.37-.38.6-.55a1.31,1.31,0,0,1,0-.28,1.63,1.63,0,0,1,.11-.23c.12,0,.25.09.32-.14a.64.64,0,0,1,.44-.4h0a.21.21,0,0,0,.32-.05,1,1,0,0,1,.16-.12v0h0a.52.52,0,0,0-.38-.32c-.06,0-.11-.06-.17-.08a.84.84,0,0,0-.18,0c.14-.23.26-.46.62-.41,0-.18.07-.35-.14-.49s-.06-.21-.09-.33c.26-.06.52-.26.69.11.34.09.36.34.29.62.42,0,.8,0,1.07.31-.07.22.29.43,0,.67,0-.37,0-.39-.33-.61l.07-.15-.4.06a1.18,1.18,0,0,0-.14.22.8.8,0,0,0,0,.28L60.28,20c-.05.12,0,.37-.25.37h0c0,.19,0,.38.14.54a.22.22,0,0,1,0,.21c-.16.16-.1.3,0,.48l.26,0,.25.36.14-.28.29.17a2.27,2.27,0,0,0,.18-.25c0-.11.09-.2.24-.16s.09-.1.18-.2h-.46c-.17-.28.08-.37.19-.53.21.06.23.19.16.38.23-.06.28-.36.53-.32a3,3,0,0,1-.18-.24c.23,0,.44-.1.65.08a2.35,2.35,0,0,0,.39.19c.12.06.23.13.2.31a.23.23,0,0,0,.05.18c.21.17.3.48.64.52a.59.59,0,0,1,.48-.31,1.38,1.38,0,0,0,.34-.12l.41-.19h0L64.81,21,65,21s0-.09,0-.15l.21.09c0,.11,0,.21-.16.24h0c0,.08.05.16.08.26.18-.09.38-.13.37-.32s-.12-.44-.41-.43c.12-.49.24-.56.6-.33h-.35l.38.63c.2-.08.2-.28.27-.45.19,0,.29.06.3.27-.2-.07-.24.1-.34.19.26.25.34.25.54,0a.83.83,0,0,1,.73-.21.17.17,0,0,0,.13,0c0-.19.14-.06.24,0-.07.25-.37.16-.47.36.09.17.25,0,.38.12s0,.09,0,.18l.22.11h0c.09-.18.25-.08.38-.08h0l-.5-.45.4-.06c0,.18.07.34.1.51h0l-.38.08h0c.07.2.3.1.43.22s0,.11,0,.19l.53.14a.71.71,0,0,0,.2,0c.38-.08.6.15.81.41a.27.27,0,0,1,0,.15.24.24,0,0,1-.07.17.18.18,0,0,1-.17,0,.5.5,0,0,0-.45-.16,2.68,2.68,0,0,0,.24.45.39.39,0,0,0,.42.15.8.8,0,0,1,.71.16.22.22,0,0,1,0,.08s0,0,0,.06l-.24.1c0,.06,0,.13,0,.18a.35.35,0,0,0,.11.38c.16.18,0,.44,0,.65s0,.49,0,.76h.22c.17.15.3.27.45.38a.2.2,0,0,0,.29-.08,3.84,3.84,0,0,0,.18-.35c0-.06,0-.14.07-.18.3-.3.14-.61,0-.93-.3.06-.57.23-.87.06l.06-.49h0l-.2-.21h.3c.08-.16.19-.11.28,0s0,.13-.07.15,0,.19,0,.29l.66,0a.9.9,0,0,0,.46,0,.37.37,0,0,1,.29.09.49.49,0,0,0,.42.16c.13,0,.21.06.25.17s.18.24.36.1.14,0,.25,0l-.06-.2h.1c.18,0,.23.16.24.31a.42.42,0,0,0,.2.34c.14.11.3.22.23.47,0,.07.1.16.13.26a2.19,2.19,0,0,1,0,.28l-.28,0a.71.71,0,0,0,0,.16c.34,0,.38.29.49.53a.65.65,0,0,1,.38.2c.16.19.37.13.48-.08l.21.2a1.16,1.16,0,0,1,.38.61.6.6,0,0,0,.4.47.43.43,0,0,1,.16.63l-.23.3c.25.06.37,0,.56-.33l.23.1,0-.18c.07,0,.15,0,.19,0a1.48,1.48,0,0,0,.74.27,3.48,3.48,0,0,0,.91,0c.83-.12.65,0,1,.56a4.85,4.85,0,0,0,.37.49c-.27.16-.06.47-.21.68l-.36.11c.06.24.13.48.2.75.07-.1.11-.23.19-.28a1.05,1.05,0,0,1,.37,0h0l-.32-.26.25-.21c0,.05.11.13.19.23l-.12.24h0l-.08.17.2.05c-.07.26-.08.54-.47.59a.37.37,0,0,1,0,.58c.2.12.35.23.57.13,0,.14.22.21.09.39,0,0,0,.09.07.13.22.27.44.54.64.82s.19.33.38.4c0,0,0,.07.06.11.17.32.32.66.5,1a.35.35,0,0,1,0,.34.76.76,0,0,0,0,.59,1.09,1.09,0,0,1-.12,1.07c-.07.09-.14.14-.07.27a.84.84,0,0,1,0,.35.35.35,0,0,1,.39.29c0,.09.14.16.23.23a2.39,2.39,0,0,0,.33.2c-.09.09-.15.17-.24.27l.39.19.13-.19c.11.16.21.3.3.45,0,0,0,0,0,0-.23.14-.11.37-.14.56a.2.2,0,0,1-.08.08l.41,0c.21.23.11.43,0,.66.37,0,.3.39.59.49v-.26l.2.26c.08,0,.21-.13.29-.1s.39.1.47.33a1.24,1.24,0,0,1-.32.17c-.17,0-.21.15-.27.29a.88.88,0,0,1-.18.29l.44-.07a.26.26,0,0,1,.31.13c.07.12.14.24-.06.32.13.08.22.11.28,0a.56.56,0,0,0,.12-.33c0-.1-.14-.17-.22-.26l.23-.33c.26,0,.23,0,.27.24a.53.53,0,0,0,.29.45,2.28,2.28,0,0,1,.39.24c-.2.22-.2.22,0,.43l-.19.46c.2.08.45,0,.46.27l.21-.12-.39-.21a.55.55,0,0,0,0-.57c.07-.16.17-.17.29-.07a2.25,2.25,0,0,0,.3.24.76.76,0,0,1,.43.62l.45,0a1.09,1.09,0,0,1-.06.23.48.48,0,0,0,0,.64,1.08,1.08,0,0,1,.2.33.45.45,0,0,1-.32.64.91.91,0,0,0-.25.07.3.3,0,0,0-.17.45,1.87,1.87,0,0,0,.4.64c.06.07-.06.23.07.33s.06.11.1.15a.62.62,0,0,1,.16.67c0,.11,0,.22,0,.35l-.34.13a1.19,1.19,0,0,1,.22.25,2.48,2.48,0,0,0,.13.3l.08-.26h.07l.1.21h.21c0-.21-.16-.23-.26-.32l0-.36.42,0c0,.09.08.19.13.33l-.2,0,.1.65c.13-.06.28-.26.4,0l-.18.26.45.4a.26.26,0,0,1,0,.15c-.13.21-.11.49-.34.68s-.08.32-.12.49-.11.54-.47.55c0,0-.08.14-.14.26a.52.52,0,0,1,.45.3s0,0,0,.06a1.12,1.12,0,0,0,0,.41c0,.11.26.11.29.27a2.32,2.32,0,0,0,.06.38,6.7,6.7,0,0,0,.37.7s0,0,.08,0,.13,0,.08.12l-.14.14c.16.05.16.05.37,0,0-.05-.08-.12-.07-.16s.09-.19.14-.19.29,0,.3.08c.05.22.27.3.36.49a.51.51,0,0,1,.08.38h-.15a3.25,3.25,0,0,0,.07.45c0,.05.12.07.19.11v-.11c0-.09,0-.19-.06-.36l.5.2ZM90.21,63c-.21-.08-.14-.23-.2-.39C90.21,62.73,90.26,62.83,90.21,63Zm-69.95.37c0,.2,0,.2-.08.33C20.08,63.55,20.08,63.55,20.26,63.39ZM61.15,20.22l0-.07.22,0,0,0-.17.12h0l.33.07c-.15,0-.23.11-.3.09s-.17-.08,0-.16Zm-.66.7v.27C60.28,21,60.28,21,60.49,20.92Zm-.05.33-.14.08-.09,0s0-.08.07-.09S60.34,21.22,60.44,21.25Zm0-.49c-.24-.16-.14-.38-.1-.61.22.05.2.24.25.39h.21l.07.35Zm10.42,3.95s.13,0,.2,0,0,.21,0,.26a1.72,1.72,0,0,1-.34.24l0-.05.21-.21C70.9,24.84,70.86,24.75,70.89,24.71Zm.22.94s0,0,.06-.08.06.06,0,.08,0,0-.06.06S71.11,25.67,71.11,25.65Z"/></g></g></svg>')
    
        swiper.appendChild(logo);   
       document.body.appendChild(swiper);
        swiper.classList.add('swiped');

    swiper.addEventListener('animationend', (e) => {
        if (e.animationName === 'swipe') {
            fireTextAnimation();
            animationEnded = true;

            swiper.parentElement.removeChild(swiper);
        }
        calculateNavOpacity()
    });

    const primaryHeader = document.querySelector('.header__heading-primary');
    primaryHeader.addEventListener('animationend', () => {

        // Grab the three icon bits
        const iconBits = document.querySelectorAll('.iconBanner__container');

        iconBits.forEach((iconBit, index) => {
            iconBit.style.animationDelay = index / 6 + 's';
            iconBit.classList.add('slideIn');
        });
    });

    // Smooth scroll to contact form when enquire button clicked.
    document.querySelector('.nav__enquire').addEventListener('click', () => {
        smoothScroll('.landing__contactForm', 1000);
    });

    document.querySelector('.header__logo-box').addEventListener('click', () => {
        smoothScroll('body', 1000);
    });

    document.querySelector('.btn--mobile-enquire').addEventListener('click', () => {
        smoothScroll('.landing__contactForm', 1000);
    });

    // Smooth scroll past header when arrow clicked.
    document.querySelector('.header__arrow').addEventListener('click', () => {
        smoothScroll('.textStrip', 1000);
    });

    document.querySelector('.submit').addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.querySelector('.formFieldName').value.trim();
        const email = document.querySelector('.formFieldEmail').value.trim();
        const contactNumber = document.querySelector('.formFieldContactNo').value.trim();
        const contractType = document.querySelector('.formFieldContractType').value.trim();
        const more = document.querySelector('.formFieldMore').value.trim();
        let errors = false;

        const nameError = document.querySelector('.formFieldName + .error');

        // Front end validation
        if (name.trim() === '') {
            nameError.style.display = 'block';
            errors = true;
        } else {
            nameError.style.display = 'none';
        }

        if (email.trim() === '') {
            errors = true;
            document.querySelector('.formFieldEmail + .error').innerHTML = '* Please enter your email address';
            document.querySelector('.formFieldEmail + .error').style.display = 'block';
        } else {
            // Check if email is valid
            if (!validateEmail(email)) {
                errors = true;
                document.querySelector('.formFieldEmail + .error').innerHTML = '* Please enter a valid email address';
                document.querySelector('.formFieldEmail + .error').style.display = 'block';
            } else {
                document.querySelector('.formFieldEmail + .error').style.display = 'none';
            }
        }

        if (contactNumber.trim() === '') {
            errors = true;
            document.querySelector('.formFieldContactNo + .error').style.display = 'block';
        } else {
            document.querySelector('.formFieldContactNo + .error').style.display = 'none';
        }

        if (contractType.trim() === '') {
            errors = true;
            document.querySelector('.formFieldContractType + .error').style.display = 'block';
        } else {
            document.querySelector('.formFieldContractType + .error').style.display = 'none';
        }

        if (!errors) {
            document.querySelector('.submit').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                const request = new XMLHttpRequest();
                const url = './sendEmail.php';
                
                request.open('POST', url, true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        document.querySelector('.submit').innerHTML = '<span>Thank You!</span>';
                        document.querySelector('.submit').classList.add('dark-green');
                    } else {
                        document.querySelector('.submit').innerHTML = 'Submit';
                        document.querySelector('.submit').classList.remove('dark-green');
                    }
                };
    
                const data = 'name=' + name + '&email=' + email + '&contactNo=' + contactNumber + '&contractType=' + contractType + '&more=' + more;
    
                request.send(data);
            }, 10);

            setTimeout(() => {
                document.querySelector('.submit').innerHTML = 'Submit';
                // Clear out the form
                document.querySelector('.formFieldName').value = '';
                document.querySelector('.formFieldEmail').value = '';
                document.querySelector('.formFieldContactNo').value = '';
                document.querySelector('.formFieldContractType').value = '';
                document.querySelector('.formFieldMore').value = '';
                document.querySelector('.submit').classList.remove('dark-green');
            }, 5000)
        }
    })

    const imageDivs = document.getElementsByClassName('header__unblurred-image');
    // Necessary?
    for (let image of imageDivs) {
        image.classList.add('hidden');
    }

    let currentInterval = 0;
    switchHeaderImage(currentInterval);

    setInterval(() => {
        if (currentInterval < 3) {
            currentInterval++;
        } else {
            currentInterval = 0;
        }
        switchHeaderImage(currentInterval);
    }, 8000)
    
    if (document.querySelector('.hamburger') !== null) {
        document.querySelector('.hamburger').addEventListener('click', function(evt) {
            this.classList.toggle('isActive');

            // Get hold of the mobile menu and set it to be active as well
            document.querySelector('.desktopMenu').classList.toggle('active');
            document.querySelector('.nav').classList.toggle('active');
        });
    }

    document.addEventListener('scroll', () => {
        if (animationEnded) {
            calculateNavOpacity();
            fireTextAnimation();

        }

        fixChatIconPosition();
    });
    
    if (getCookie('cookieBar') != 'true') {

    // if (true) {
        // Inject cookies bar
        const body = document.body;

        const cookiesBar = document.createElement('div');
        cookiesBar.classList.add('cookiesBar');

        const cookiesBarText = document.createElement('p');
        cookiesBarText.classList.add('cookiesBarText');

        // Learn about cookies.
        cookiesBarText.innerHTML = 'By using our website, you agree to the use of cookies. <a class="cookieLink" target="_blank" href="https://ico.org.uk/your-data-matters/online/cookies/">Learn about Cookies.</a>';
        cookiesBar.appendChild(cookiesBarText);

        const closeCookiesBar = document.createElement('a');
        closeCookiesBar.href = '#';
        closeCookiesBar.classList.add('close');

        const closeContainer = document.createElement('div');
        closeContainer.classList.add('closeContainer');

        closeContainer.appendChild(closeCookiesBar);

        cookiesBar.appendChild(closeContainer);

        closeCookiesBar.addEventListener('click', function(evt) {
            evt.preventDefault();
            cookiesBar.classList.add('closed');
            const header = document.querySelector('.header');
            header.style.paddingTop = '0';
            document.cookie = "cookieBar=true; expires=" + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + ";";
        });
        
        body.insertBefore(cookiesBar, body.firstChild);
    } else {
        const header = document.querySelector('.header');
        
        if (header) {
            header.style.paddingTop = '0';
        }
    }
});