$(document).ready(function () {
  $(".voucher").mask("0000000000");
  $(".phone").mask("(00) 00000-0000");
  $(".pnr").mask("AAAAAA");

  const mainSection = document.querySelector("main.container");
  const sendFormButton = document.getElementById("sendFormButton");
  const form = document.querySelector(".form");
  const tryAgainLaterModal = new bootstrap.Modal(
    document.getElementById("tryAgainLaterModal"),
    {
      keyboard: false,
    }
  );

  function getDataFromForm(form, fieldsToSearchOnForm) {
    const data = {};
    const inputsOnForm = form.elements;

    fieldsToSearchOnForm.forEach((fieldName) => {
      const findedInput = inputsOnForm[fieldName];

      if (findedInput) {
        data[fieldName] = findedInput.value;
      }
    });

    return data;
  }

  async function fakeRequest() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        // reject();
      }, 1500);
    });
  }

  form.addEventListener("submit", async function (evt) {
    evt.preventDefault();

    const data = getDataFromForm(evt.target, [
      "voucher",
      "pnr",
      "email",
      "name",
      "phone",
      "lastname",
    ]);

    sendFormButton.innerText = "Enviando...";
    console.log(data, "sendFormButton");

    await axios
      .post(
        "http://localhost:3000/posts",
        // "https://voeazuldev.service-now.com/api/x_alabs_callcenter/call_center/newvouchercase",
        {
          title: "Some title",
          author: "Some author",
        }
        // {
        //   auth: {
        //     username: "integracao.teste",
        //     password: "@VoeAzul#123",
        //   },
        // }
      )
      .then((res) => {
        mainSection.classList.add("done");
      })
      .catch(() => {
        tryAgainLaterModal.show();
      });

    sendFormButton.innerText = "Confirmar";
  });

  const selectOtherVoucher = document.getElementById("selectOtherVoucher");
  selectOtherVoucher.addEventListener("click", () => {
    mainSection.classList.remove("done");

    const allInputs = document.querySelectorAll("input");

    allInputs.forEach((input, index) => {
      if (index === 0) input.focus();
    });
  });
});
