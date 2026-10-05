const WHATSAPP_URL = "https://wa.me/qr/BH3BXBMGSPUOH1";

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const form = document.getElementById("orderForm");
const statusEl = document.getElementById("formStatus");
const year = document.getElementById("year");
const header = document.getElementById("header");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
});

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-plan]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.getAttribute("data-plan");
    const select = document.getElementById("planSelect");
    const map = {
      Short: "Short — 70 000 ₸",
      Story: "Story — 90 000 ₸",
      Cinema: "Cinema — 125 000 ₸",
    };
    if (select && map[plan]) select.value = map[plan];
  });
});

function buildMessage(data) {
  return [
    "Заявка Event Cinema",
    `Имя: ${data.name}`,
    `Телефон: ${data.contact}`,
    `Мероприятие: ${data.event}`,
    `Пакет: ${data.plan}`,
    `История: ${data.story || "—"}`,
  ].join("\n");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());
  const text = buildMessage(payload);

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* clipboard may be blocked */
  }

  const url = `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
  statusEl.textContent =
    "Открываем WhatsApp. Текст заявки скопирован — вставьте его в чат, если поле пустое.";
});
