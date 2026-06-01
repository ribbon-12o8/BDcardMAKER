const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const fontSelect = document.getElementById("font");

const previewMessage =
  document.getElementById("preview-message");

const previewName =
  document.getElementById("preview-name");

const previewCard =
  document.getElementById("card-preview");

function updatePreview(){

  previewMessage.textContent =
    messageInput.value || "メッセージがここに表示されます";

  previewName.textContent =
    "by " + (nameInput.value || "Name");

  previewCard.style.fontFamily =
    fontSelect.value;
}

nameInput.addEventListener(
  "input",
  updatePreview
);

messageInput.addEventListener(
  "input",
  updatePreview
);

fontSelect.addEventListener(
  "change",
  updatePreview
);