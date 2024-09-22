document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("nav li");
  const underline = document.querySelector(".underline");
  let currentActiveItem = null;

  function moveUnderline(element) {
    underline.style.visibility = "visible";

    underline.style.width = "0";
    underline.style.left = `${element.offsetLeft + element.offsetWidth / 2}px`;

    setTimeout(() => {
      underline.style.width = `${element.offsetWidth}px`;
      underline.style.left = `${element.offsetLeft}px`;
    }, 50);
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (currentActiveItem === item) {
        // If the clicked item is already active, hide the underline
        underline.style.visibility = "hidden";
        underline.style.width = "0";
        currentActiveItem = null;
      } else {
        moveUnderline(item);
        currentActiveItem = item;
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav li")) {
      underline.style.visibility = "hidden";
      underline.style.width = "0";
      currentActiveItem = null;
    }
  });
});

// Function to toggle the visibility of the dropdown content
let currentOpenDropdown = null;

function toggleDropdown(event, button) {
  event.preventDefault();

  const dropdownContent = button.nextElementSibling;

  if (currentOpenDropdown && currentOpenDropdown !== dropdownContent) {
    currentOpenDropdown.style.display = "none";
  }

  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    currentOpenDropdown = null;
  } else {
    dropdownContent.style.display = "block";
    currentOpenDropdown = dropdownContent;
  }
}

// Close the dropdown if clicked outside of it
window.onclick = function (event) {
  if (
    !event.target.matches(".dropbtn") &&
    !event.target.closest(".dropdown-content")
  ) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].style.display = "none";
    }
    currentOpenDropdown = null;
  }
};

function makeDraggable(element) {
  let isDown = false;
  let startX;
  let scrollLeft;

  const links = element.querySelectorAll("a");

  element.addEventListener("mousedown", (e) => {
    isDown = true;
    element.classList.add("active");
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;

    links.forEach((link) => (link.style.pointerEvents = "none"));
  });

  element.addEventListener("mouseleave", () => {
    isDown = false;
    element.classList.remove("active");

    links.forEach((link) => (link.style.pointerEvents = ""));
  });

  element.addEventListener("mouseup", () => {
    isDown = false;
    element.classList.remove("active");

    links.forEach((link) => (link.style.pointerEvents = ""));
  });

  element.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 1.5;
    element.scrollLeft = scrollLeft - walk;
  });

  element.addEventListener("touchstart", (e) => {
    isDown = true;
    element.classList.add("active");
    startX = e.touches[0].pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;

    links.forEach((link) => (link.style.pointerEvents = "none"));
  });

  element.addEventListener("touchend", () => {
    isDown = false;
    element.classList.remove("active");

    links.forEach((link) => (link.style.pointerEvents = ""));
  });

  element.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - element.offsetLeft;
    const walk = (x - startX) * 1.5;
    element.scrollLeft = scrollLeft - walk;
  });
}

const draggableElements = document.querySelectorAll(
  ".card-container, .awards-container, .other-draggable-class"
);

draggableElements.forEach(makeDraggable);

/////////////////
