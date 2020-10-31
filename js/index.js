import {
  EDIT_BUTTON_PREFIX,
  addItemToPage,
  clearInputs,
  renderItemsList,
  getInputValues,
} from "./dom_util.js";
import { deleteHamster, getAllHamsters, postHamster, updateHamster } from "./api.js";

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");

let hamsters = [];

const addItem = ({ description, title }) => {
  const generatedId = uuid.v1();

  const newItem = {
    id: generatedId,
    title,
    description,
  };

  addItemToPage(newItem);
};


const onEditItem = async (e) => {
  const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");

  await updateHamster(itemId, getInputValues())

  clearInputs();
  
  refetchAllHamsters();
};

const onRemoveItem = (id) => deleteHamster(id).then(refetchAllHamsters);

export const refetchAllHamsters = async () => {
  const allHamsters = await getAllHamsters();

  hamsters = allHamsters;

  renderItemsList(hamsters, onEditItem, onRemoveItem);
};

submitButton.addEventListener("click", (event) => {
  // Prevents default page reload on submit
  event.preventDefault();

  const { title, description } = getInputValues();

  clearInputs();

  postHamster({
    title,
    description,
  }).then(refetchAllHamsters);
});

findButton.addEventListener("click", () => {
  const foundHamsters = hamsters.filter(
    (hamster) => hamster.title.search(findInput.value) !== -1
  );

  renderItemsList(foundHamsters, onEditItem, onRemoveItem);
});

cancelFindButton.addEventListener("click", () => {
  renderItemsList(hamsters, onEditItem, onRemoveItem);

  findInput.value = "";
});

// main code
refetchAllHamsters();
