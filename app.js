const dataUrl = "site/data/course-data.json";
const sessionKey = "borisChernyCourseMember";

function makeChip(text) {
  const chip = document.createElement("span");
  chip.className = "stat-chip";
  chip.textContent = text;
  return chip;
}

function makePill(text) {
  const pill = document.createElement("span");
  pill.className = "pill";
  pill.textContent = text;
  return pill;
}

function makeCheck(text) {
  const row = document.createElement("div");
  row.className = "check-item";
  const label = document.createElement("div");
  label.textContent = text;
  row.append(label);
  return row;
}

function createModuleCard(module, index) {
  const article = document.createElement("article");
  article.className = "module-card reveal";

  /* Dark header with module number */
  const hero = document.createElement("div");
  hero.className = "module-hero";
  const num = document.createElement("span");
  num.className = "module-number";
  num.textContent = String(index + 1).padStart(2, "0");
  const heroTitle = document.createElement("p");
  heroTitle.className = "module-hero-title";
  heroTitle.textContent = module.title;
  hero.append(num, heroTitle);
  article.append(hero);

  const body = document.createElement("div");
  body.className = "module-body";

  const meta = document.createElement("div");
  meta.className = "module-meta";
  meta.innerHTML = `<span class="module-order">${module.orderLabel}</span>`;
  body.append(meta);

  const title = document.createElement("h3");
  title.className = "module-title";
  title.textContent = module.title;
  body.append(title);

  const headline = document.createElement("p");
  headline.className = "module-headline";
  headline.textContent = module.headline;
  body.append(headline);

  const subheadline = document.createElement("p");
  subheadline.className = "module-subheadline";
  subheadline.textContent = module.subheadline;
  body.append(subheadline);

  const tags = document.createElement("div");
  tags.className = "module-tags";
  (module.tags || []).forEach((text) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = text;
    tags.append(tag);
  });
  body.append(tags);

  const lessonBlock = document.createElement("div");
  lessonBlock.className = "lesson-block";

  const heading = document.createElement("h4");
  heading.textContent = "What You Will Learn";
  lessonBlock.append(heading);

  const checklist = document.createElement("div");
  checklist.className = "module-checklist";
  module.focus.forEach((item, i) => {
    const row = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = `${module.id}-${i}`;

    /* Restore saved state */
    const saved = localStorage.getItem(`${module.id}-${i}`);
    if (saved === "true") input.checked = true;

    input.addEventListener("change", () => {
      localStorage.setItem(`${module.id}-${i}`, input.checked);
      updateProgress();
    });

    const text = document.createElement("span");
    text.textContent = item;
    row.append(input, text);
    checklist.append(row);
  });
  lessonBlock.append(checklist);
  body.append(lessonBlock);
  article.append(body);

  return article;
}

function updateProgress() {
  const total = document.querySelectorAll(".module-checklist input").length;
  const checked = document.querySelectorAll(".module-checklist input:checked").length;
  const pct = total ? Math.round((checked / total) * 100) : 0;
  const el = document.getElementById("portal-progress");
  if (el) el.textContent = `${checked} / ${total} items completed (${pct}%)`;
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

function setRevealState(rootSelector, isVisible) {
  document.querySelectorAll(`${rootSelector} .reveal`).forEach((node) => {
    node.classList.toggle("is-visible", isVisible);
  });
}

function updateAuthView() {
  const user = localStorage.getItem(sessionKey);
  const authView = document.getElementById("auth-view");
  const portalView = document.getElementById("portal-view");
  const logoutButton = document.getElementById("logout-button");
  const portalTitle = document.getElementById("portal-title");

  if (user) {
    authView.classList.add("hidden");
    portalView.classList.remove("hidden");
    logoutButton.classList.remove("hidden");
    portalTitle.textContent = `Welcome, ${user}`;
    setRevealState("#portal-view", true);
    updateProgress();
  } else {
    authView.classList.remove("hidden");
    portalView.classList.add("hidden");
    logoutButton.classList.add("hidden");
    setRevealState("#auth-view", true);
  }

  setupReveal();
}

async function init() {
  const response = await fetch(dataUrl);
  const data = await response.json();

  document.title = data.title;
  document.getElementById("hero-kicker").textContent = data.kicker;
  document.getElementById("hero-title").textContent = data.title;
  document.getElementById("hero-headline").textContent = data.headline;
  document.getElementById("hero-subheadline").textContent = data.subheadline;
  document.getElementById("login-title").textContent = data.login.title;
  document.getElementById("login-subheadline").textContent = data.login.subheadline;

  const statRibbon = document.getElementById("stat-ribbon");
  statRibbon.append(
    makeChip(`${data.stats.lessonCount} modules`),
    makeChip(data.stats.runtime),
    makeChip(data.stats.format)
  );

  const audienceList = document.getElementById("audience-list");
  data.audience.forEach((item) => audienceList.append(makePill(item)));

  const outcomeList = document.getElementById("outcome-list");
  data.outcomes.forEach((item) => outcomeList.append(makeCheck(item)));

  const moduleGrid = document.getElementById("module-grid");
  data.modules.forEach((module, index) => moduleGrid.append(createModuleCard(module, index)));

  const loginForm = document.getElementById("login-form");
  const feedback = document.getElementById("login-feedback");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      feedback.textContent = "Enter both an email and password to continue.";
      return;
    }

    const firstName = email.split("@")[0].replace(/[._-]/g, " ");
    const normalized = firstName.replace(/\b\w/g, (char) => char.toUpperCase());
    localStorage.setItem(sessionKey, normalized || "Member");
    feedback.textContent = "Login successful. Opening the course portal.";
    updateAuthView();
    document.getElementById("portal-view").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem(sessionKey);
    updateAuthView();
    window.location.hash = "";
  });

  updateAuthView();
}

init().catch((error) => {
  console.error(error);
});
