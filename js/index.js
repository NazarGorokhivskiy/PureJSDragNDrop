import {
  addItemToPage,
  clearInputs,
  renderItemsList,
  getInputValues,
} from "./dom_util.js";

const submitButton = document.getElementById("submit_button");

let hamsters = [];

const addItem = ({ title, desc }) => {
  const generatedId = uuid.v1();

  const newItem = {
    id: generatedId,
    title,
    desc,
  };

  hamsters.push(newItem);

  addItemToPage(newItem);
};

submitButton.addEventListener("click", (event) => {
  // Prevents default page reload on submit
  event.preventDefault();

  const { title, description } = getInputValues();

  clearInputs();

  addItem({
    title,
    desc: description,
  });
});

// main code

renderItemsList(hamsters);
