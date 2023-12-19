const $ = (selector) => document.querySelector(selector);
const pageOne = $("#step-one");
const pageTwo = $("#step-two");
const pageThree = $("#step-three");
const pageFour = $("#step-four");
const nextBtn = $("#next-btn");
const prevBtn = $("#prev-btn");
//const allPages = [pageOne, pageTwo, pageThree, pageFour];
let nextPage = pageTwo;
let prevPage = null;
let pageNum = 1;
const app = () => {
  class Pagination {
    constructor(pageOne, pageTwo, pageThree, pageFour) {
      this.allPages = [pageOne, pageTwo, pageThree, pageFour];
      this.currentPage = pageOne;
      this.prevPage = null;
      this.pageLength = this.allPages.length;
      this.currentIdx = this.allPages.indexOf(this.currentPage);
      prevBtn.style.opacity = 0;
      prevBtn.disabled = true;
    }

    gotoNext() {
      if (this.currentIdx + 1 >= this.pageLength) {
        nextBtn.textContent = "Confirm";
        nextBtn.classList.add("confirm-btn");
      } else {
        this.allPages.forEach((page, idx) => {
          if (page.classList.contains("activePage")) {
            this.prevPage = page;
            this.currentPage = this.allPages[idx + 1];
            this.currentIdx = this.allPages.indexOf(this.currentPage);
            prevBtn.style.opacity = 1;
            prevBtn.disabled = false;
          }
        });
      }
      if (this.currentIdx + 1 >= this.pageLength) {
        nextBtn.textContent = "Confirm";
        nextBtn.classList.add("confirm-btn");
      }
      this.prevPage.classList.remove("activePage");
      this.currentPage.classList.add("activePage");
    }
    gotoPrev() {
      nextBtn.disabled = false;
       nextBtn.textContent = "Next step";
       nextBtn.classList.remove("confirm-btn");
      if (this.currentIdx - 1 <= 0) {
        prevBtn.style.opacity = 0;
        prevBtn.disabled = true;
      }
      this.allPages.forEach((page, idx) => {
        if (page.classList.contains("activePage")) {
          this.prevPage = page;
          this.currentPage = this.allPages[idx - 1];
          this.currentIdx = this.allPages.indexOf(this.currentPage);
        }
      });
      this.prevPage.classList.remove("activePage");
      this.currentPage.classList.add("activePage");
    }
  }

  let pagination = new Pagination(pageOne, pageTwo, pageThree, pageFour);

  nextBtn.addEventListener("click", () => {
    pagination.gotoNext();
  });
  prevBtn.addEventListener("click", () => {
    pagination.gotoPrev();
  });
};

window.addEventListener("load", () => {
  app();
});
