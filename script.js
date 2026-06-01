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

  const message = messageInput.value;
  const length = message.length;

  previewMessage.textContent =
    message || "メッセージがここに表示されます";

  previewName.textContent =
    "by " + (nameInput.value || "Name");

  previewCard.style.fontFamily =
    fontSelect.value;

  document.getElementById("char-count")
    .textContent =
    `${length} / 400文字`;

  if(length <= 100){

    previewMessage.style.fontSize = "28px";

  }else if(length <= 200){

    previewMessage.style.fontSize = "24px";

  }else if(length <= 300){

    previewMessage.style.fontSize = "20px";

  }else{

    previewMessage.style.fontSize = "18px";

  }
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

updatePreview();