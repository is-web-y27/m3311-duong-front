// IIFE - Immediately Invoked Function Expression
(function () {
  // 1. ĐO THỜI GIAN TẢI TRANG
  window.addEventListener("load", function () {
    const loadTime = performance.now().toFixed(2);
      // Hiển thị trong footer
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
      // So sánh đường dẫn để tìm trang hiện tại
      const linkPath = new URL(link.href).pathname; // Thêm class active
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
  });
})();