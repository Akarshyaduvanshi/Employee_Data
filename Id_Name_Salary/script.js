var calc = document.querySelector("#button2");
var save = document.querySelector("#button1");
const form = document.querySelector(".main-container");
const container = document.getElementById("container");
const containerI = document.getElementById("containerI");
let headerCreated = false;
// const clark = new bootstrap.Modal(document.getElementById('inspect')); 

// -------- Start CSS ------

calc.setAttribute(
  "style",
  "border: none; padding: 15px 20px; border-radius: 7px; font-size: 16px;"
);

save.setAttribute(
  "style",
  "border: none; padding: 15px 30px; border-radius: 7px; font-size: 16px;"
);

var label = document.querySelectorAll("label");

label.forEach(function (labels) {
  labels.style.fontSize = "20px";
});

var input = document.querySelectorAll("input");

input.forEach(function (inputs) {
  inputs.style.border = "none";
  inputs.style.outline = "none";
  inputs.style.height = "30px";
  inputs.style.width = "20rem";
  inputs.style.borderRadius = "5px";
});

// --------- End CSS ---------

// *************** For create user input table *******************

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const name = String(document.getElementById("name").value);
  const salary = parseInt(document.getElementById("salary").value);

  if (!headerCreated) {
    createHeader();
    headerCreated = true;
  }

  addRow(name, id, salary);

  form.reset();
});

function createHeader() {
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  const idHeader = document.createElement("th");
  idHeader.textContent = "Employee ID";
  headerRow.appendChild(idHeader);

  const nameHeader = document.createElement("th");
  nameHeader.textContent = "Employee Name";
  headerRow.appendChild(nameHeader);

  const salaryHeader = document.createElement("th");
  salaryHeader.textContent = "Employee Salary";
  headerRow.appendChild(salaryHeader);

  table.appendChild(headerRow);
  container.appendChild(table);
}

function addRow(name, id, salary) {
  const table = container.querySelector("table");
  const row = document.createElement("tr");

  const userId = document.createElement("td");
  userId.textContent = id;
  row.appendChild(userId);

  const userName = document.createElement("td");
  userName.textContent = name;
  row.appendChild(userName);

  const userSalary = document.createElement("td");
  userSalary.textContent = salary;
  row.appendChild(userSalary);

  table.appendChild(row);
}

var edit = document.getElementById("button3");
var saveData = document.getElementById("saveData");
var cancelSave = document.getElementById("cancelSave");
saveData.style.display = "none";
cancelSave.style.display = "none";

let forName = "";
let forSalary = null;

// *************** For append input box in table data *******************

function connectToTable() {
  const editUserId1 = document.getElementById("search-id");
  const editUserId = (editUserId1.value);
  const userId = container.querySelectorAll("td:nth-child(1)");
  const userName = container.querySelectorAll("td:nth-child(2)");
  const userSalary = container.querySelectorAll("td:nth-child(3)");
  const idInArray = Array.from(userId);
  const nameInArray = Array.from(userName);
  const salaryInArray = Array.from(userSalary);
  const editBox = document.createElement("input");
  editBox.id = "input";
  const editBox1 = document.createElement("input");
  editBox1.id = "input1";
  editBox.setAttribute("type", "text");
  editBox1.setAttribute("type", "text");
  editBox.style.cssText = "width: 200px; margin-bottom: 0;";
  editBox1.style.cssText = "width: 200px; margin-bottom: 0;";

  for (let x = 0; x < idInArray.length; x++) {
    if (editUserId === idInArray[x].textContent) {
      editBox.setAttribute("value", nameInArray[x].textContent);
      editBox1.setAttribute("value", salaryInArray[x].textContent);
      forName = nameInArray[x].innerHTML;
      forSalary = parseInt(salaryInArray[x].innerHTML);
      nameInArray[x].innerHTML = "";
      salaryInArray[x].innerHTML = "";
      nameInArray[x].appendChild(editBox);
      salaryInArray[x].appendChild(editBox1);

      saveData.style.display = "inline-block";
      cancelSave.style.display = "inline-block";
      edit.style.display = "none";
      break;
    } else if (x == [idInArray.length - 1] && editUserId !== idInArray[idInArray.length - 1]) {
      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("closeI")[0];

      showModal = function () {
          modal.style.display = "block";
      }

      span.onclick = function () {
          modal.style.display = "none";
      }

      window.onclick = function (event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
      showModal();
    }
  }
  editUserId1.value = "";  
};

// ****************** For save the change on data table ********************

saveData.onclick = function () {
  const userName = container.querySelectorAll("td:nth-child(2)");
  const userSalary = container.querySelectorAll("td:nth-child(3)");
  const nameInArray = Array.from(userName);
  const salaryInArray = Array.from(userSalary);
  const editBox = container.querySelector("#input");
  const editBox1 = container.querySelector("#input1");

  for (let y = 0; y < nameInArray.length; y++) {
    if (
      nameInArray[y].firstChild === editBox &&
      salaryInArray[y].firstChild === editBox1
    ) {
      nameInArray[y].removeChild(editBox);
      salaryInArray[y].removeChild(editBox1);
      nameInArray[y].append(editBox.value);
      salaryInArray[y].append(editBox1.value);
      break;
    }
  }
  saveData.style.display = "none";
  cancelSave.style.display = "none";
  edit.style.display = "inline-block";
};

// ******************** For cancel the change in table data *********************

cancelSave.onclick = function () {
  const userName = container.querySelectorAll("td:nth-child(2)");
  const userSalary = container.querySelectorAll("td:nth-child(3)");
  const nameInArray = Array.from(userName);
  const salaryInArray = Array.from(userSalary);
  const editBox = container.querySelector("#input");
  const editBox1 = container.querySelector("#input1");

  for (let z = 0; z < nameInArray.length; z++) {
    if (
      nameInArray[z].firstChild === editBox &&
      salaryInArray[z].firstChild === editBox1
    ) {
      nameInArray[z].removeChild(editBox);
      salaryInArray[z].removeChild(editBox1);
      nameInArray[z].append(forName);
      salaryInArray[z].append(forSalary); 
      break;
    }
  }
  saveData.style.display = "none";
  cancelSave.style.display = "none";
  edit.style.display = "inline-block";
};

// ****************** For calculate salary **********************

calc.onclick = function () {
  const userSalary = container.querySelectorAll("td:nth-child(3)");
  const salaryInArray = Array.from(userSalary);
  let sum = 0;
  for (var i = 0; i < salaryInArray.length; i++) {
    sum += parseInt(salaryInArray[i].textContent);
  }
  containerI.innerHTML = "<span>" + sum + "&#8377;" + "</span>";
};

// ****************** For delete the row ************************

function deleteRow() {
  const deleteTheRow1 = document.getElementById("delete-id");
  const deleteTheRow = (deleteTheRow1.value);
  const tableRow = container.querySelectorAll("tr");
  const rowInArray = Array.from(tableRow);

  for(let a = 0; a < rowInArray.length; a++) {
    if(deleteTheRow === rowInArray[a].firstChild.textContent) {
      rowInArray[a].classList.add("fadeOut");
      setTimeout(() => {
      rowInArray[a].remove();
    }, 500);
    break;
    }  else if (a == [rowInArray.length - 1] && deleteTheRow !== rowInArray[rowInArray.length - 1]) {
      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("closeI")[0];

      showModal = function () {
          modal.style.display = "block";
      }

      span.onclick = function () {
          modal.style.display = "none";
      }

      window.onclick = function (event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
      showModal();

    }
  }
  deleteTheRow1.value = "";
};