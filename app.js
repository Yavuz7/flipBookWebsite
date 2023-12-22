// UI
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
// Pages
const pages = document.querySelectorAll(".page");

//Events
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

//Settings
let pageIndex = 0;
let transitionTimer = parseFloat(
  getComputedStyle(book).getPropertyValue("--transition-timer")
);
//Timer For Page Turning, Change var in html
transitionTimer = transitionTimer * 1000;
let numOfPages = document.querySelectorAll(".page").length;

// Initialize Z Values
document.addEventListener("DOMContentLoaded", () => {
  let i = 0;
  for (const page of pages) {
    page.style.zIndex = numOfPages + 6 - i;
    i++;
  }
});

function openBook() {
  book.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-324px)";
  nextBtn.style.transform = "translateX(324px)";
}

function closeBook(isAtBeginning) {
  if (isAtBeginning) {
    book.style.transform = "translateX(0%)";
  } else {
    book.style.transform = "translateX(100%)";
  }
  prevBtn.style.transform = "translateX(120px)";
  nextBtn.style.transform = "translateX(-120px)";
}

function goNextPage() {
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  var currentPage = pages[pageIndex];
  console.log(currentPage);
  console.log("Index:" + pageIndex);
  if (pageIndex <= numOfPages - 1) {
    currentPage.classList.add("flipped");
    var zIndexChange = pageIndex + 6 - 1;

    setTimeout(() => {
      currentPage.style.zIndex = zIndexChange;
      nextBtn.disabled = false;
      prevBtn.disabled = false;
    }, transitionTimer);

    if (pageIndex == 0) {
      openBook();
    } else if (pageIndex == numOfPages - 1) {
      closeBook(false);
    }
    pageIndex++;
  }
}

function goPrevPage() {
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  var currentPage = pages[pageIndex - 1];
  console.log(currentPage.style.zIndex);
  if (pageIndex >= 1) {
    currentPage.classList.remove("flipped");
    var zIndexChange = numOfPages + 7 - pageIndex;
    currentPage.style.zIndex = zIndexChange;

    setTimeout(() => {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }, transitionTimer);

    if (pageIndex == 1) {
      closeBook(true);
    } else if (pageIndex == numOfPages) {
      openBook();
    }
    pageIndex--;
  }
}
