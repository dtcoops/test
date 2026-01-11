document.addEventListener("DOMContentLoaded", () => {
    const mainImg = document.getElementById("figure-main");
    const thumbs = document.querySelectorAll(".thumb");
    const caption = document.querySelector('.caption-text');
  
    function setFromThumb(btn) {
      mainImg.src = btn.dataset.src;
      mainImg.alt = btn.dataset.caption;
      caption.textContent = btn.dataset.caption;

      thumbs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
   }

    // Initialize on page load using the active thumbnail
    const initial = document.querySelector('.thumb.active');
    if (initial) setFromThumb(initial);
    
    thumbs.forEach(btn => {
      btn.addEventListener("click", () => {
        const src = btn.dataset.src;
        if (!src) return;
  
        mainImg.src = src;
        
        caption.textContent = btn.dataset.caption;
        thumbs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });
  