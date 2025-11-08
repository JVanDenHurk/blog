document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll("main article")); // select all blog posts
  const itemsPerPage = 5; // change this to how many posts per page
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");

  let currentPage = 1;

  function showPage(page) {
    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Show/hide posts
    items.forEach((item, idx) => {
      item.style.display = idx >= start && idx < end ? "block" : "none";
    });

    renderPagination();
  }

  function renderPagination() {
    paginationContainer.innerHTML = "";

    // Prev button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Prev";
    prevBtn.onclick = () => showPage(currentPage > 1 ? currentPage - 1 : 1);
    paginationContainer.appendChild(prevBtn);

    // Numbered buttons
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active"); // highlight current page
      btn.onclick = () => showPage(i);
      paginationContainer.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next →";
    nextBtn.onclick = () =>
      showPage(currentPage < totalPages ? currentPage + 1 : totalPages);
    paginationContainer.appendChild(nextBtn);
  }

  // Initialize first page
  showPage(1);
});
