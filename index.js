const $ = (selector) => document.querySelector(selector);
const pageOne = $("#step-one");
const pageTwo = $("#step-two");
const pageThree = $("#step-three");
const pageFour = $("#step-four");
const nextBtn = $("#next-btn");
const prevBtn = $("#prev-btn");
const nameNpt = $("#name");
const emailNpt = $("#email");
const telNpt = $("#tel");
const nameErr = $(".name-err");
const emailErr = $(".email-err");
const telErr = $(".tel-err");
const app = () => {
  let formValues = {
    personalNfo: {
      name: null,
      email: "",
      phoneNum: null,
    },
  };

  const handleInputChange = (evt) => {
    let newPersonalNfo = {
      ...formValues.personalNfo,
      [evt.target.name]: evt.target.value,
    };

    formValues = {
      ...formValues,
      personalNfo: newPersonalNfo,
    };
  };
  nameNpt.addEventListener("change", (e) => {
    handleInputChange(e);
  });
  emailNpt.addEventListener("change", (e) => {
    handleInputChange(e);
  });
  telNpt.addEventListener("change", (e) => {
    handleInputChange(e);
  });
  class FormHandler {
    constructor(pageOne, pageTwo, pageThree, pageFour) {
      this.allPages = [
        {
          id: 1,
          name: "form-page",
          element: pageOne,
          validation: () => this.handleValidation("personalNfo"),
        },
        {
          id: 2,
          name: "plan-page",
          element: pageTwo,
          validation: () => this.handleValidation("personalNfo"),
        },
        {
          id: 3,
          name: "addons-page",
          element: pageThree,
          validation: () => this.handleValidation("personalNfo"),
        },
        {
          id: 4,
          name: "finish-page",
          element: pageFour,
          validation: () => true,
        },
      ];
      this.currentPage = this.allPages[0];
      this.prevPage = null;
      this.pageLength = this.allPages.length;
      prevBtn.style.opacity = 0;
      prevBtn.disabled = true;
    }
    handleSubmission() {
      console.log("submit");
    }
    handleValidation(type) {
      let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let valid = true;
      emailErr.style.display = "none";
      nameErr.style.display = "none";
      telErr.style.display = "none";

      switch (type) {
        case "personalNfo":
          if (
            formValues.personalNfo.name === null ||
            formValues.personalNfo.name.trim().length === 0
          ) {
            valid = false;
            nameErr.style.display = "inline";
            return;
          }
          if (
            formValues.personalNfo.email.match(validRegex) === null ||
            !formValues.personalNfo.email.match(validRegex)
          ) {
            valid = false;
            emailErr.style.display = "inline";
            emailErr.textContent = "enter a valid email address";
            return;
          }
          if (
            formValues.personalNfo.phoneNum === null ||
            formValues.personalNfo.phoneNum.trim().length === 0
          ) {
            valid = false;
            telErr.style.display = "inline";
            return;
          }
          break;

        default:
          break;
      }
      return valid;
    }
    gotoNext() {
      let validated = this.currentPage.validation();
      console.log(validated)
      if (!validated) return;
      this.prevPage = this.currentPage;
      this.currentPage = this.allPages.filter(
        (page) => page.id === this.currentPage.id + 1
      )[0];
      prevBtn.style.opacity = 1;
      prevBtn.disabled = false;
      this.prevPage.element.classList.remove("activePage");
      this.currentPage.element.classList.add("activePage");

      if (this.currentPage.id === 4) {
        nextBtn.textContent = "Confirm";
        nextBtn.classList.add("confirm-btn");
      }
    }
    gotoPrev() {
      this.prevPage = this.currentPage;
      this.currentPage = this.allPages.filter(
        (page) => page.id === this.currentPage.id - 1
      )[0];
      this.prevPage.element.classList.remove("activePage");
      this.currentPage.element.classList.add("activePage");
      nextBtn.textContent = "Next step";
      nextBtn.classList.remove("confirm-btn");
      if (this.currentPage.id === 1) {
        prevBtn.style.opacity = 0;
        prevBtn.disabled = true;
      }
    }
  }

  let formhandler = new FormHandler(pageOne, pageTwo, pageThree, pageFour);

  nextBtn.addEventListener("click", () => {
    if (nextBtn.textContent !== "Confirm") {
      formhandler.gotoNext();
    } else {
      formhandler.handleSubmission();
    }
  });
  prevBtn.addEventListener("click", () => {
    formhandler.gotoPrev();
  });
};

window.addEventListener("load", () => {
  app();
});
