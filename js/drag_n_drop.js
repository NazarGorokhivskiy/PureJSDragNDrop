const deleteSetionClass = ".delete-section";

let currentDroppable = null;
let isAboveDelete = false;

function enterDroppable() {
  currentDroppable.classList.add("selected");
}

function leaveDroppable() {
  currentDroppable.classList.remove("selected");
}

function placeItemBack(element) {
  element.removeAttribute('style')
}

function removeItem(element) {
  leaveDroppable();
  element.remove();
}

export const onDragNDrop = (element) => (event) => {
  element.style.position = "absolute";
  element.style.zIndex = 1000;

  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  
  function moveAt(element, event) {
    element.style.left = `${event.pageX - shiftX}px`;
    element.style.top = `${event.pageY - shiftY}px`;
  }

  moveAt(element, event);

  function onMouseMove(event) {
    moveAt(element, event);

    element.hidden = true;
    let elemAboveDelete = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
    element.hidden = false;

    if (!elemAboveDelete) return;

    let droppableBelow = elemAboveDelete.closest(deleteSetionClass);

    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        leaveDroppable();
        isAboveDelete = false;
      }

      currentDroppable = droppableBelow;

      if (currentDroppable) {
        enterDroppable();
        isAboveDelete = true;
      }
    }
  }

  document.addEventListener("mousemove", onMouseMove);

  element.onmouseup = () => {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;

    if (isAboveDelete) {
      removeItem(element);
    } else {
      placeItemBack(element);
    }
  };

  element.ondragstart = () => {
    return false;
  };
};
