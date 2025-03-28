// === FUNCIONES EXCLUSIVAS PARA TALENTO HUMANO ===

function toggleEditorTH() {
  const container = document.getElementById("editorContainerTH");
  const isVisible = container.style.display === "flex" || container.style.display === "block";
  container.style.display = isVisible ? "none" : "flex";
}

function handleFormatChangeTH() {
  const format = document.getElementById("formatSelectTH").value;
  prepareCanvasTH(format);
}

function prepareCanvasTH(format) {
  const [w, h] = format.split("x");
  const editor = document.getElementById("editorTH");
  editor.style.width = w + "px";
  editor.style.height = h + "px";
  document.getElementById("canvasSizeTH").innerText = `Formato: ${w}x${h}`;
}

function clearEditorTH() {
  const editor = document.getElementById("editorTH");
  editor.innerHTML = "";
  editor.style.backgroundImage = "";
}

function cerrarEditorTH() {
  document.getElementById("editorContainerTH").style.display = "none";
}

function addTextTH() {
  const text = document.getElementById("customTextTH").value;
  const color = document.getElementById("textColorTH").value;
  const font = document.getElementById("fontFamilyTH").value;
  const size = document.getElementById("fontSizeTH").value;

  const div = document.createElement("div");
  div.className = "text-box draggable";
  div.setAttribute("data-x", 0);
  div.setAttribute("data-y", 0);
  div.style.color = color;
  div.style.fontFamily = font;
  div.style.fontSize = size + "px";
  div.style.transform = "translate(0px, 0px) rotate(0deg)";
  div.contentEditable = true;
  div.textContent = text;

  const tools = document.createElement("div");
  tools.className = "element-tools";
  tools.innerHTML = `
    <button onclick="rotateElement(this)">↻</button>
    <button onclick="duplicateElement(this)">⧉</button>
    <button onclick="deleteElement(this)">🗑️</button>`;
  div.appendChild(tools);

  document.getElementById("editorTH").appendChild(div);
  enableInteract(div);
}

function deleteElement(btn) {
  const box = btn.closest('.draggable') || btn.closest('.text-box');
  if (box) box.remove();
}

function rotateElement(btn) {
  const box = btn.closest('.draggable') || btn.closest('.text-box');
  if (!box) return;
  let current = box.style.transform.match(/rotate\((\d+)deg\)/);
  let angle = current ? parseInt(current[1]) : 0;
  angle = (angle + 15) % 360;
  const x = box.getAttribute("data-x") || 0;
  const y = box.getAttribute("data-y") || 0;
  box.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
}

function duplicateElement(btn) {
  const original = btn.closest('.draggable') || btn.closest('.text-box');
  if (!original) return;

  const clone = original.cloneNode(true);
  const editor = document.getElementById("editorTH");
  let x = parseFloat(original.getAttribute("data-x") || 0) + 20;
  let y = parseFloat(original.getAttribute("data-y") || 0) + 20;
  const rotation = original.style.transform.match(/rotate\((\d+)deg\)/);
  const rotateValue = rotation ? rotation[1] : 0;
  clone.setAttribute("data-x", x);
  clone.setAttribute("data-y", y);
  clone.style.transform = `translate(${x}px, ${y}px) rotate(${rotateValue}deg)`;
  editor.appendChild(clone);
  enableInteract(clone);
}

function centerSelectedElementTH() {
  const selected = document.querySelector('.draggable.selected');
  const editor = document.getElementById("editorTH");
  if (!selected) return;
  const centerX = (editor.clientWidth - selected.offsetWidth) / 2;
  const centerY = (editor.clientHeight - selected.offsetHeight) / 2;
  selected.style.transform = `translate(${centerX}px, ${centerY}px) rotate(0deg)`;
  selected.setAttribute("data-x", centerX);
  selected.setAttribute("data-y", centerY);
}

function addEmojiTH(emoji) {
  if (!emoji) return;
  const div = document.createElement("div");
  div.className = "text-box draggable";
  div.setAttribute("data-x", 0);
  div.setAttribute("data-y", 0);
  div.style.fontSize = "48px";
  div.style.transform = "translate(0px, 0px) rotate(0deg)";
  div.textContent = emoji;

  const tools = document.createElement("div");
  tools.className = "element-tools";
  tools.innerHTML = `
    <button onclick="rotateElement(this)">↻</button>
    <button onclick="duplicateElement(this)">⧉</button>
    <button onclick="deleteElement(this)">🗑️</button>`;
  div.appendChild(tools);

  document.getElementById("editorTH").appendChild(div);
  enableInteract(div);
}

function applyFilterTH(filterValue) {
  document.getElementById("editorTH").style.filter = filterValue;
}

document.getElementById("uploadImageTH").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    const editor = document.getElementById("editorTH");
    const wrapper = document.createElement("div");
    wrapper.className = "draggable";
    wrapper.setAttribute("data-x", 0);
    wrapper.setAttribute("data-y", 0);
    wrapper.style.transform = "translate(0px, 0px) rotate(0deg)";
    wrapper.style.width = "200px";

    const img = document.createElement("img");
    img.src = event.target.result;

    const tools = document.createElement("div");
    tools.className = "element-tools";
    tools.innerHTML = `
      <button onclick="rotateElement(this)">↻</button>
      <button onclick="duplicateElement(this)">⧉</button>
      <button onclick="deleteElement(this)">🗑️</button>`;
    wrapper.appendChild(tools);
    wrapper.appendChild(img);
    editor.appendChild(wrapper);
    enableInteract(wrapper);
  };
  reader.readAsDataURL(file);
});

document.getElementById("uploadBackgroundTH").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById("editorTH").style.backgroundImage = `url('${event.target.result}')`;
  };
  reader.readAsDataURL(file);
});

function downloadImageTH() {
  const editor = document.getElementById("editorTH");
  const tools = editor.querySelectorAll('.element-tools');
  const draggables = editor.querySelectorAll('.draggable');
  tools.forEach(t => t.style.display = 'none');
  draggables.forEach(el => el.style.border = 'none');

  const watermark = document.createElement("div");
  watermark.innerText = "CREADO POR RESET®";
  watermark.style.position = "absolute";
  watermark.style.bottom = "10px";
  watermark.style.right = "10px";
  watermark.style.fontSize = "14px";
  watermark.style.fontWeight = "bold";
  watermark.style.fontFamily = "'Poppins', sans-serif";
  watermark.style.color = "#FF5E00";
  watermark.style.textShadow = "1px 1px 2px rgba(0,0,0,0.6)";
  editor.appendChild(watermark);

  html2canvas(editor).then(canvas => {
    const format = document.getElementById("formatSelectTH").value;
    const link = document.createElement("a");
    link.download = `diseño_TH_${format}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    editor.removeChild(watermark);
    tools.forEach(t => t.style.display = 'flex');
    draggables.forEach(el => el.style.border = '1px dashed #ccc');
  });
}

prepareCanvasTH('800x600');
