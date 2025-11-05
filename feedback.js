(function () {
  const form = document.getElementById("feedback-form");
  const list = document.getElementById("feedback-list");
  const template = document.getElementById("feedback-template");

  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  function renderFeedback(item, index) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".name").textContent = item.name;
    clone.querySelector(".email").textContent = item.email;
    clone.querySelector(".comment").textContent = item.comment;

    const editBtn = clone.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      const newComment = prompt("Sửa phản hồi:", item.comment);
      if (newComment !== null && newComment.trim() !== "") {
        feedbacks[index].comment = newComment.trim();
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
        list.innerHTML = "";
        feedbacks.forEach(renderFeedback);
      }
    });

    list.appendChild(clone);
  }

  feedbacks.forEach(renderFeedback);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const comment = form.comment.value.trim();

    if (!name || !email || !comment) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newFeedback = { name, email, comment };
    feedbacks.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    renderFeedback(newFeedback, feedbacks.length - 1);
    form.reset();
  });
})();