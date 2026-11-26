const d = document;

const nav = d.getElementById("nav");
const navToggle = d.getElementById("navToggle");
const navMenu = d.getElementById("navMenu");

function setMenu(open) {
	navToggle.classList.toggle("active", open);
	navMenu.classList.toggle("active", open);
	nav.classList.toggle("open", open);
	navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => {
	setMenu(!navMenu.classList.contains("active"));
});
navMenu.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => setMenu(false));
});
d.addEventListener("keydown", (event) => {
	if (event.key === "Escape") setMenu(false);
});

function updateNav() {
	nav.classList.toggle("scrolled", window.scrollY > 40);
}
updateNav();
window.addEventListener("scroll", updateNav, { passive: true });

const tabs = d.querySelectorAll(".tab");
const tabButtons = d.querySelectorAll(".tab-button");

tabButtons.forEach((button) => {
	button.addEventListener("click", () => {
		tabs.forEach((tab) => tab.removeAttribute("data-active"));
		tabButtons.forEach((item) => {
			item.classList.remove("active");
			item.setAttribute("aria-selected", "false");
		});
		button.classList.add("active");
		button.setAttribute("aria-selected", "true");
		d.getElementById(button.dataset.toggles).setAttribute(
			"data-active",
			"true",
		);
	});
});

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add("in-view");
			observer.unobserve(entry.target);
		});
	},
	{ threshold: 0.15 },
);
d.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
