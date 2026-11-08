"use strict";

const views = {
  login: document.getElementById("login-view"),
  signup: document.getElementById("signup-view"),
  "forgot-password": document.getElementById("forgot-password-view")
};

const pageTitles = {
  login: "Welcome back — Northstar",
  signup: "Create your account — Northstar",
  "forgot-password": "Reset your password — Northstar"
};

let toastTimeout;

function currentView() {
  const requested = window.location.hash.slice(1);
  return Object.prototype.hasOwnProperty.call(views, requested) ? requested : "login";
}

function renderView() {
  const activeView = currentView();

  Object.entries(views).forEach(([name, view]) => {
    view.hidden = name !== activeView;
    if (name !== activeView) {
      view.querySelectorAll(".form-message").forEach((message) => {
        message.textContent = "";
      });
    }
  });

  document.title = pageTitles[activeView];
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function showFormMessage(id, message) {
  document.getElementById(id).textContent = message;
}

window.addEventListener("hashchange", renderView);
renderView();

document.querySelectorAll("[data-toggle-password]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.togglePassword);
    const shouldShow = input.type === "password";
    input.type = shouldShow ? "text" : "password";
    button.textContent = shouldShow ? "Hide" : "Show";
    button.setAttribute("aria-label", `${shouldShow ? "Hide" : "Show"} password`);
    button.setAttribute("aria-pressed", String(shouldShow));
  });
});

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showFormMessage("login-message", "Your sign-in details are ready. Connect an authentication provider to enable accounts.");
});

document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const password = document.getElementById("signup-password");
  const confirmation = document.getElementById("signup-confirm");
  confirmation.setCustomValidity(password.value === confirmation.value ? "" : "Passwords do not match.");

  if (!event.currentTarget.reportValidity()) {
    confirmation.focus();
    return;
  }

  showFormMessage("signup-message", "Your account details are ready. Connect an authentication provider to finish signing up.");
});

document.getElementById("reset-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showFormMessage("reset-message", "If an account exists for that email, password reset instructions are on their way.");
});

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showToast(`${button.dataset.demoAction} is a demo action and needs a service integration.`);
  });
});

document.getElementById("signup-password").addEventListener("input", () => {
  const confirmation = document.getElementById("signup-confirm");
  if (confirmation.value) {
    confirmation.setCustomValidity("");
  }
});

document.getElementById("signup-confirm").addEventListener("input", (event) => {
  const password = document.getElementById("signup-password");
  event.currentTarget.setCustomValidity(
    event.currentTarget.value === password.value ? "" : "Passwords do not match."
  );
});