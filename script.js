const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const fontSelect = document.getElementById("font");

const designSelect =
  document.getElementById("design");
  
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

  previewCard.style.backgroundImage =
  `url(images/backgrounds/${designSelect.value}.png)`;

  previewCard.style.backgroundSize = "cover";
  previewCard.style.backgroundPosition = "center";

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

designSelect.addEventListener(
  "change",
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

const GAS_URL = "https://script.google.com/macros/s/AKfycbzI-cWtN9dfnl6nolNTbN_Em89ptADTPjiwHeHGfyXu4a8RNLZRZAOl2nQONvV_qqKh/exec";

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async () => {

  try {

    const canvas = await html2canvas(
      document.getElementById("card-preview")
    );

    document.body.appendChild(canvas);

    const image = canvas.toDataURL("image/png");

    const response = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify({
        name: nameInput.value,
        message: messageInput.value,
        design: document.getElementById("design").value,
        image: image
      })
    });

    const result = await response.json();

    if(result.success){
      alert("送信完了！");
    }else{
      alert("エラー：" + result.error);
    }

  } catch(err){

    console.error(err);
    alert("送信失敗");
  }

});