const $ = (selector) => document.querySelector(selector);
const pageOne = $("#step-one");
const pageTwo = $("#step-two");
const pageThree = $("#step-three");
const pageFour = $("#step-four");
const pagenumOne = $("#pagenum-one");
const pagenumTwo = $("#pagenum-two");
const pagenumThree = $("#pagenum-three");
const pagenumFour = $("#pagenum-four");
const nextBtn = $("#next-btn");
const prevBtn = $("#prev-btn");
const nameNpt = $("#name");
const emailNpt = $("#email");
const telNpt = $("#tel");
const nameErr = $(".name-err");
const emailErr = $(".email-err");
const telErr = $(".tel-err");
const checkbox = $("#checkbox");
const montlyPlan = $(".monthly-plan");
const yearlyPlan = $(".yearly-plan");
const arcadePrice = $(".arcadePrice");
const advancedPrice = $(".advancedPrice");
const proPrice = $(".proPrice");
const planErr = $(".plan-err");
const onlineAddon = $("#online-addons");
const storageAddon = $("#storage-addons");
const profileAddon = $("#profile-addons");
const onlineCheck = $("#online-check");
const storageCheck = $("#storage-check");
const profileCheck = $("#profile-check");
const finishup = $("#finishup");
const totalAmt = $("#total-amt");
const completionPage = $(".completion-page");
const stepsWrapper = $(".steps-wrapper");
const yearlyPromo = document.querySelectorAll(".yearlyPromo");
const plans = document.querySelectorAll(".card");
const app = () => {
  let formValues = {
    personalNfo: {
      name: null,
      email: "",
      phoneNum: null,
    },
    plan: {
      sub: "monthly",
      type: null,
    },
    addon: [],
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
  plans.forEach((plan) => {
    plan.addEventListener("click", (e) => {
      formValues.plan = { ...formValues.plan, type: e.target.value };
    });
  });
  onlineCheck.addEventListener("click", (e) => {
    if (onlineCheck.checked) {
      formValues.addon.push(e.target.value);
    } else {
      formValues.addon.splice(formValues.addon.indexOf(e.target.value), 1);
    }
  });
  storageCheck.addEventListener("click", (e) => {
    if (storageCheck.checked) {
      formValues.addon.push(e.target.value);
    } else {
      formValues.addon.splice(formValues.addon.indexOf(e.target.value), 1);
    }
  });
  profileCheck.addEventListener("click", (e) => {
    if (profileCheck.checked) {
      formValues.addon.push(e.target.value);
    } else {
      formValues.addon.splice(formValues.addon.indexOf(e.target.value), 1);
    }
  });
  checkbox.addEventListener("click", (e) => {
    if (checkbox.checked) {
      montlyPlan.classList.remove("active");
      yearlyPlan.classList.add("active");
      advancedPrice.textContent = "$120/yr";
      arcadePrice.textContent = "$90/yr";
      proPrice.textContent = "$150/yr";
      onlineAddon.textContent = "$10/yr";
      profileAddon.textContent = "$20/yr";
      storageAddon.textContent = "$20/yr";
      yearlyPromo.forEach((p) => (p.style.display = "inline"));
      formValues.plan = { ...formValues.plan, sub: "yearly" };
    } else {
      montlyPlan.classList.add("active");
      yearlyPlan.classList.remove("active");
      advancedPrice.textContent = "$9/yr";
      arcadePrice.textContent = "$12/yr";
      proPrice.textContent = "$15/yr";
      onlineAddon.textContent = "$1/yr";
      profileAddon.textContent = "$2/yr";
      storageAddon.textContent = "$2/yr";
      yearlyPromo.forEach((p) => (p.style.display = "none"));
      formValues.plan = { ...formValues.plan, sub: "monthly" };
    }
  });
  const handleDisplayFinish = () => {
    finishup.innerHTML = `<li>
                    <p>
                      <span id="selected-plan">${
                        formValues.plan.type.split(" ")[0] +
                        "(" +
                        formValues.plan.sub +
                        ")"
                      }</span>
                      <a href="/">Change</a>
                    </p>
                    <p id="selected-amount">${
                      formValues.plan.sub === "monthly"
                        ? "$" + formValues.plan.type.split(" ")[1]
                        : ""
                    }
                    ${
                      formValues.plan.sub === "yearly"
                        ? "$" + formValues.plan.type.split(" ")[2]
                        : ""
                    }
                    /mo</p>
                  </li> <li>
                      <p>
                        <span id="selected-plan">${
                          formValues.addon[0].split(" ")[0] +
                          formValues.addon[1].split(" ")[1]
                        }</span>
                      </p>
                      <p id="selected-amount">${
                        "$" + formValues.addon[0].split(" ")[2]
                      }/mo</p>
                    </li> 
                    <li>
                      <p>
                        <span id="selected-plan">${
                          formValues.addon[1].split(" ")[0] +
                          formValues.addon[1].split(" ")[1]
                        }</span>
                      </p>
                      <p id="selected-amount">${
                        "$" + formValues.addon[1].split(" ")[2]
                      }/mo</p>
                    </li>`;
  };
  let selectedPlan =
    formValues.plan.sub === "monthly"
      ? formValues.plan.type?.split(" ")[1]
      : formValues.plan.type?.split(" ")[2];
  class FormHandler {
    constructor(pageOne, pageTwo, pageThree, pageFour) {
      this.allPages = [
        {
          id: 1,
          name: "form-page",
          element: pageOne,
          pageNum: pagenumOne,
          validation: () => this.handleValidation("personalNfo"),
        },
        {
          id: 2,
          name: "plan-page",
          element: pageTwo,
          pageNum: pagenumTwo,
          validation: () => this.handleValidation("plan"),
        },
        {
          id: 3,
          name: "addons-page",
          element: pageThree,
          pageNum: pagenumThree,
          validation: () => this.handleValidation("personalNfo"),
        },
        {
          id: 4,
          name: "finish-page",
          element: pageFour,
          pageNum: pagenumFour,
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
      stepsWrapper.style.display = "none";
      completionPage.style.display = "flex";
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
        case "plan":
          if (!formValues.plan.type) {
            valid = false;
            planErr.style.display = "inline";
          }
        default:
          break;
      }
      return valid;
    }
    gotoNext() {
      let validated = this.currentPage.validation();
      if (!validated) return;
      this.prevPage = this.currentPage;
      this.currentPage = this.allPages.filter(
        (page) => page.id === this.currentPage.id + 1
      )[0];
      prevBtn.style.opacity = 1;
      prevBtn.disabled = false;
      this.prevPage.element.classList.remove("activePage");
      this.prevPage.pageNum.classList.remove("active");
      this.currentPage.element.classList.add("activePage");
      this.currentPage.pageNum.classList.add("active");

      if (this.currentPage.id === 4) {
        handleDisplayFinish();
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
      this.prevPage.pageNum.classList.remove("active");
      this.currentPage.pageNum.classList.add("active");
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
