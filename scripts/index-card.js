let cardTemplate;
console.log("card.js loaded ✅");


// 1) Load the template HTML into the page
fetch("card-template.html")
  .then(r => {
    if (!r.ok) throw new Error(`Template fetch failed: ${r.status}`);
    return r.text();
  })
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);

    // Now the template exists in the DOM
    cardTemplate = document.getElementById("card-template");
    if (!cardTemplate) throw new Error("Could not find #card-template after loading template.");

    // 2) Load project data
    return fetch("data/projects.json");
  })
  .then(r => {
    if (!r.ok) throw new Error(`Projects fetch failed: ${r.status}`);
    return r.json();
  })
  .then(projects => {
    render(projects, "all");
    setupTabs(projects);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("gallery").textContent =
      "Oops—couldn't load projects. Check console for details.";
  });

  function render(projects, topic) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
  
    const filtered = projects.filter(p => topic === "all" || p.topic === topic);
  
    filtered.forEach(p => {
      const frag = cardTemplate.content.cloneNode(true);
      const link = frag.querySelector(".card-link");
      link.href = p.url ?? "#";

      const card = frag.querySelector(".card");
      card.dataset.topic = p.topic;
  
      const img = frag.querySelector(".gthumb-img");
      img.src = p.thumb;
      img.alt = p.title;

      frag.querySelector(".card-title").textContent = p.title ?? "";
      frag.querySelector(".card-description").textContent = p.desc ?? "";
  
      const tagContainer = frag.querySelector(".tags");
      tagContainer.innerHTML = "";
      (p.tags ?? []).forEach(t => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = t;
        tagContainer.appendChild(span);
      });
  
      // Click handler (debug)
      card.addEventListener("click", () => {
        console.log("Clicked:", p.id);
      });
  
      // ✅ Append the fragment (this brings the whole <article class="col">)
      gallery.appendChild(frag);
    });
  
    console.log("Rendered cards:", filtered.length);
  }
  
  

function setupTabs(projects) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      render(projects, tab.dataset.filter);
    });
  });
}
