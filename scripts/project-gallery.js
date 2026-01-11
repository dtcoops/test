document.addEventListener("DOMContentLoaded", () => {
    const mainImg = document.getElementById("figure-main");
    const thumbs = document.querySelectorAll(".thumb");
  
    if (!mainImg || thumbs.length === 0) return;
  
    thumbs.forEach(btn => {
      btn.addEventListener("click", () => {
        const src = btn.dataset.src;
        if (!src) return;
  
        mainImg.src = src;
  
        thumbs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });
  