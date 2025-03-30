window.addEventListener("scroll", () => {
    const circles = document.querySelector(".circles");
    const scrollHeight = document.documentElement.scrollHeight; // Total page height
    const scrollPosition = window.innerHeight + window.scrollY; // Current position

    // If user scrolls near the end (e.g., 90% of the page)
    if (scrollPosition >= scrollHeight * 0.9) {  
        circles.classList.add("fade-out");
    } else {
        circles.classList.remove("fade-out");
    }
});
