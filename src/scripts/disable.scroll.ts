
function blockScroll(event: Event) {

  event.preventDefault();
  event.stopPropagation();

}

function globalDisableScroll() {

  document.body.addEventListener(
    'wheel', 
    blockScroll, 
    { passive: false } as EventListenerOptions
  );

  document.body.addEventListener(
    'touchmove', 
    blockScroll, 
    { passive: false } as EventListenerOptions
  );

}

function allowScroll() {
  
  document.body.removeEventListener(
    'wheel', 
    blockScroll, 
    { passive: false } as EventListenerOptions
  );

  document.body.removeEventListener(
    'touchmove', 
    blockScroll, 
    { passive: false } as EventListenerOptions
  );

}

const disableScroll = {

  on: () => globalDisableScroll(),
  off: () => allowScroll()

}

export default disableScroll;