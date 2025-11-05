(function () {
  window.addEventListener("load", function () {
    const loadTime = performance.now().toFixed(2);
    const footer = document.querySelector(".footer");
    if (footer) {
      const info = document.createElement("p");
      info.textContent = `Thời gian tải trang: ${loadTime} ms`;
      footer.appendChild(info);
    }

    // Xác định đường dẫn đầy đủ
    // Đánh dấu menu đang active
    const currentPath = location.pathname;
    const menuLinks = document.querySelectorAll(".nav__item a");

    menuLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
  });
})();