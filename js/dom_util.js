import { onDragNDrop } from "./drag_n_drop.js";

export const EDIT_BUTTON_PREFIX = 'edit-button-';

const titleInput = document.getElementById("title_input");
const descriptionInput = document.getElementById("description_input");
const itemsContainer = document.getElementById("items_container");

// local functions

const itemTemplate = ({ id, title, description }) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
  <img
    src="http://www.vokrugsveta.ru/img/bx/medialibrary/7f3/7f327150a4231009d34ca3190111f089.jpg"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">
      Edit
    </button>
  </div>
</li>`;

// exposed functions
export const clearInputs = () => {
  titleInput.value = "";

  descriptionInput.value = "";
};

export const addItemToPage = ({ _id: id, title, description }, onEditItem, onRemoveItem) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, title, description })
  );

  const element = document.getElementById(id);
  const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);

  element.onmousedown = onDragNDrop(element, onRemoveItem);
  editButton.addEventListener("click", onEditItem);

  // VERY IMPORTANT
  // Allows not to trigger DragNDrop when user clicks Edit Button
  editButton.onmousedown = e => e.stopPropagation();
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item, onEditItem, onRemoveItem);
  }
};

export const getInputValues = () => {
  return {
    title: titleInput.value,
    description: descriptionInput.value,
  };
};
