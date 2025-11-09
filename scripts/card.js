let cardTemplate;

// Load the template, then init
fetch("card-template.html")
  .then(r => {
    if (!r.ok) throw new Error(`Template fetch failed: ${r.status}`);
    return r.text();
  })
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    cardTemplate = document.getElementById("card-template");
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
    const node = cardTemplate.content.cloneNode(true);

    const card = node.querySelector(".card");
    card.dataset.topic = p.topic;

    node.querySelector(".thumb").textContent = p.thumb;
    node.querySelector(".card-title").textContent = p.title;
    node.querySelector(".card-description").textContent = p.desc;

    const tagContainer = node.querySelector(".tags");
    p.tags.forEach(t => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tagContainer.appendChild(span);
    });

    node.querySelector("[data-demo]").href = p.demo;
    node.querySelector("[data-code]").href = p.code;

    gallery.appendChild(node);
  });
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
