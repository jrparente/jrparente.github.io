async function loadPage() {
  let page = location.hash.replace("#", "");
  if (!page) {
    page = "homepage";
  }

  try {
    const response = await fetch(`pages/${page}.html`);
    if (!response.ok) {
      throw new Error("Page not found");
    }
    const content = await response.text();
    document.getElementById("content").innerHTML = content;
  } catch (error) {
    console.error(error);
    const response = await fetch(`pages/404.html`);
    const content = await response.text();
    document.getElementById("content").innerHTML = content;
  }
}

window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);
