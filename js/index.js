import {
  addItemToPage,
  clearInputs,
  renderItemsList,
  getInputValues,
} from "./dom_util.js";

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");


let hamsters = [];

const addItem = ({ desc, title }) => {
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

findButton.addEventListener("click", () => {
  const foundHamsters = hamsters.filter(hamster => hamster.title.search(findInput.value) !== -1);

  renderItemsList(foundHamsters);
});

cancelFindButton.addEventListener("click", () => {
  renderItemsList(hamsters);

  findInput.value = "";
})

// main code

renderItemsList(hamsters);
