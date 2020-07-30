const titleInput = document.getElementById("title_input");
const descriptionInput = document.getElementById("description_input");

const itemsContainer = document.getElementById("items_container");

const itemTemplate = ({ id, title, desc }) => `
<div class="item-container card mb-3">
  <img
    src="http://www.vokrugsveta.ru/img/bx/medialibrary/7f3/7f327150a4231009d34ca3190111f089.jpg"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${desc}</p>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-dark" onclick=onItemEdit("${id}")>Edit</button>
    </div>
  </div>
</div>`;

export const clearInputs = () => {
  titleInput.value = "";
  descriptionInput.value = "";
};

export const addItemToPage = ({ id, title, desc }) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, title, desc })
  );
};

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};

export const getInputValues = () => {
  return {
    title: titleInput.value,
    description: descriptionInput.value,
  };
};
