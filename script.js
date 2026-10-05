const WHATSAPP_PHONE = "77064095513";

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const form = document.getElementById("orderForm");
const statusEl = document.getElementById("formStatus");
const year = document.getElementById("year");
const header = document.getElementById("header");
const orderResult = document.getElementById("orderResult");
const orderMessage = document.getElementById("orderMessage");
const copyOrder = document.getElementById("copyOrder");

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

function copyText(text) {
  orderMessage.value = text;
  orderResult.hidden = false;
  orderMessage.focus();
  orderMessage.select();
  try {
    document.execCommand("copy");
  } catch {
    /* ignore */
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function openWhatsApp(text) {
  const encoded = encodeURIComponent(text);
  window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

copyOrder.addEventListener("click", () => {
  copyText(orderMessage.value);
  statusEl.textContent = "Текст снова скопирован.";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());
  const text = buildMessage(payload);
  copyText(text);
  statusEl.textContent = "Открываем WhatsApp с вашей заявкой.";
  openWhatsApp(text);
});
