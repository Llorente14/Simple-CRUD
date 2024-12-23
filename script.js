const datas = [
  { nim: "535240143", nama: "Axel", prodi: "TI" },
  { nim: "535240083", nama: "Apan", prodi: "TI" },
  { nim: "535240147", nama: "Chirgia", prodi: "TI" },
  { nim: "838240143", nama: "Jojon", prodi: "SI" },
  { nim: "838240147", nama: "King Idris", prodi: "SI" },
];

const tableBody = document.querySelector(".table");

function loadData() {
  datas.forEach((data) => {
    let tr = document.createElement("tr");
    Object.values(data).forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
      tr.addEventListener("click", openFormUpdate);
    });
    tableBody.appendChild(tr);
  });
}

//Membuka Form
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".btn.cancel");
const forms = document.querySelector(".forms");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputNim.value = "";
  inputNama.value = "";
  submitBtn.style.display = "flex"; //A = V
  delBtn.style.display = "none";
  updateBtn.style.display = "none";
  forms.classList.toggle("muncul");
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  forms.classList.toggle("muncul");
});

//Add to table
const inputNim = document.querySelector(".nim");
const inputNama = document.querySelector(".nama");
function getSelectedProdi() {
  const radioProdi = document.getElementsByName("prodi");
  let inputProdi = null;
  radioProdi.forEach((radio) => {
    if (radio.checked) {
      inputProdi = radio.value;
    }
  });
  return inputProdi;
}
const submitBtn = document.querySelector(".btn.submit");
function addData() {
  const inputProdi = getSelectedProdi(); // Ngambil nilai dari loop radio
  if (
    inputNim.value.trim() === "" ||
    inputNama.value.trim() === "" ||
    !inputProdi
  ) {
    alert("Mohon isi yang benar");
  } else {
    let tr = document.createElement("tr");
    let tdNim = document.createElement("td");
    let tdNama = document.createElement("td");
    let tdProdi = document.createElement("td");
    tdNim.textContent = inputNim.value;
    tdNama.textContent = inputNama.value;
    tdProdi.textContent = inputProdi;
    tr.appendChild(tdNim);
    tr.appendChild(tdNama);
    tr.appendChild(tdProdi);
    tr.addEventListener("click", openFormUpdate);
    tableBody.appendChild(tr);
    inputNim.value = "";
    inputNama.value = "";
    forms.classList.toggle("muncul");
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addData();
});

//Delete
let targetRow = null;
const delBtn = document.querySelector(".delete");
delBtn.classList.add("delete");

delBtn.addEventListener("click", () => {
  deleteRow();
  delBtn.style.display = "none"; // D = X
  forms.classList.remove("muncul");
});

function deleteRow() {
  targetRow.remove();
  targetRow = null;
}
//Update
const updateBtn = document.createElement("button");
updateBtn.textContent = "Update";
updateBtn.classList.add("btn");
updateBtn.classList.add("submit");
updateBtn.setAttribute("type", "submit");
updateBtn.style.display = "none";

const groupBtn = document.querySelector(".btn-confirm");

function changeUpdate() {
  groupBtn.appendChild(updateBtn);
  updateBtn.style.display = "flex";
  delBtn.style.display = "flex";
  submitBtn.style.display = "none";
}

function openFormUpdate(e) {
  changeUpdate();
  targetRow = e.target.closest("tr");

  const rowData = Array.from(targetRow.children).map(
    (kolom) => kolom.textContent
  );

  inputNim.value = rowData[0];
  inputNama.value = rowData[1];
  const radios = document.getElementsByName("prodi");
  radios.forEach((radio) => {
    radio.checked = radio.value === rowData[2];
  });
  if (!forms.classList.contains("muncul")) {
    forms.classList.add("muncul");
  }
}

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const updatedProdi = getSelectedProdi();

  if (
    inputNim.value.trim() === "" ||
    inputNama.value.trim() === "" ||
    !updatedProdi
  ) {
    alert("Mohon isi semua data dengan benar.");
    return;
  } // Validasi agar update form tidak kosong, jika kosong ada alert

  targetRow.children[0].textContent = inputNim.value;
  targetRow.children[1].textContent = inputNama.value;
  targetRow.children[2].textContent = updatedProdi;

  forms.classList.remove("muncul");
  updateBtn.style.display = "none";
  targetRow = null;
});
loadData();
