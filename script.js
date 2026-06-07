const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const messageFontSelect = document.getElementById("message-font");
const nameFontSelect = document.getElementById("name-font");

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
    (nameInput.value || "Name");

  //previewCard.style.fontFamily =
   // fontSelect.value;

    previewMessage.style.fontFamily =
  messageFontSelect.value;

previewName.style.fontFamily =
  nameFontSelect.value;

  previewCard.style.backgroundImage =
  `url(images/backgrounds/${designSelect.value}.png)`;

  previewCard.style.backgroundSize = "cover";
  previewCard.style.backgroundPosition = "center";

  document.getElementById("char-count")
    .textContent =
    `${length} / 400文字`;

  if(length <= 30){

    previewMessage.style.fontSize = "28px";

  }else if(length <= 60){

    previewMessage.style.fontSize = "24px";

  }else if(length <= 100){

    previewMessage.style.fontSize = "22px";
  
  }else if(length <= 150){

    previewMessage.style.fontSize = "20px";

  }else if(length <= 200){

    previewMessage.style.fontSize = "18px";

  }else{

    previewMessage.style.fontSize = "16px";

  }

setStamp("stamp-tl", "img-tl");
setStamp("stamp-tr", "img-tr");
setStamp("stamp-bl", "img-bl");
setStamp("stamp-br", "img-br");
}


function setStamp(selectId, imgId){ 
  const value = document.getElementById(selectId).value; 
  const img = document.getElementById(imgId); 
  if(value === "none"){ 
    img.style.display = "none"; 
  }
  else{ img.style.display = "block"; 
    img.src = stampMap[value]; 
  } 
  console.log(selectId, value, stampMap[value]);
}


const stampMap = {
rose: "images/stamps/rose.png",
beerR: "images/stamps/beer-r.png",
HR: "images/stamps/H-r.png",
KR: "images/stamps/K-r.png",
champagneR: "images/stamps/champagne-r.png",
ringR: "images/stamps/ring-r.png",
beerL: "images/stamps/beer-l.png",
HL: "images/stamps/H-l.png",
KL: "images/stamps/K-l.png",
champagneL: "images/stamps/champagne-l.png",
ringL: "images/stamps/ring-l.png",
kagi: "images/stamps/kagi.png",
DM: "images/stamps/dm.png",
hat: "images/stamps/hat.png",
bottleL: "images/stamps/bottle-l.png",
bottleR: "images/stamps/bottle-r.png",
HBtYL: "images/stamps/HBtY-l.png",
HBtYR: "images/stamps/HBtY-r.png",
crackerL: "images/stamps/cracker-l.png",
crackerR: "images/stamps/cracker-r.png"
};



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

//fontSelect.addEventListener(
//  "change",
//  updatePreview
//);

messageFontSelect.addEventListener(
  "change",
  updatePreview
);

nameFontSelect.addEventListener(
  "change",
  updatePreview
);

document.getElementById("stamp-tl")
  .addEventListener("change", updatePreview);

document.getElementById("stamp-tr")
  .addEventListener("change", updatePreview);

document.getElementById("stamp-bl")
  .addEventListener("change", updatePreview);

document.getElementById("stamp-br")
  .addEventListener("change", updatePreview);

updatePreview();

const GAS_URL = "https://script.google.com/macros/s/AKfycbzI-cWtN9dfnl6nolNTbN_Em89ptADTPjiwHeHGfyXu4a8RNLZRZAOl2nQONvV_qqKh/exec";

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async () => {

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "送信中...";

    const canvas = await html2canvas(
      document.getElementById("card-preview")
    );

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
      alert("送信完了！ありがとうございます！");
      submitBtn.textContent = "送信完了";
    }else{
      alert("エラー：" + result.error);
      submitBtn.disabled = false;
      submitBtn.textContent = "送信";
    }

  } catch(err){

    console.error(err);
    alert("送信失敗");
    submitBtn.disabled = false;
    submitBtn.textContent = "送信";
  }

});