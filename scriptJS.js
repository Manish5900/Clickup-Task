// script for popup
const addRecordPop = () => {
  let data = document.querySelector("#popup");
  if (data.classList.contains("disblank")) {
    data.classList.remove("disblank");
  } else {
    data.classList.add("disblank");
  }
};

const dataList = () => {
  document.getElementById("insert-page").innerHTML = "";
  let noOfPage = localStorage.getItem("TABLE");
  noOfPage = JSON.parse(noOfPage);

  for (let i = 0; i < noOfPage.length / 4; i++) {
    console.log(noOfPage.length / 4);

    document.getElementById("insert-page").innerHTML =
      document.getElementById("insert-page").innerHTML +
      ` <li class="" id="select${i}"> <a href="#" onclick="changePage(${i})">${
        i + 1
      }</a></li>`;
  }
};

const tableRefresh = () => {
  document.getElementById("insert_data").innerHTML = "";
  if (localStorage.getItem("TABLE")) {
    let table_data = localStorage.getItem("TABLE");
    //  converting  readable data from json
    table_data = JSON.parse(table_data);
    table_data.forEach((data, index) => {
      let ID = String(data.ID);

      document.getElementById("insert_data").innerHTML += `
        <tr>
            <td>${data.srno}</td>
            <td>${data.ID}</td>
            <td>${data.LocationName}</td>
            <td>${data.address}</td>
            <td>
              <div>
                <button Onclick = "view(${
                  data.ID
                })"><i class="fa-regular fa-eye"></i>View</button>
                <button Onclick= "open_delete_popup(${
                  data.ID
                })"><i class="fa-solid fa-trash"></i>Delete</button>
                <button Onclick= "editPopup(${
                  index + 1
                },${ID})"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
              </div>
            </td>
          </tr>`;
    });
  }
};

// For Edit section

const close_box_edit = () => {
  const data = document.getElementById("edit_data_popup");
  data.classList.add("disblank");
};

const editPopup = (srno, ID) => {
  const data = document.getElementById("edit_data_popup");
  data.classList.remove("disblank");
  let populateData = localStorage.getItem("TABLE");
  populateData = JSON.parse(populateData);
  let currentData = populateData.filter((data) => data.ID == ID);
  document.getElementById("E_Location_name").value =
    currentData[0].LocationName;
  document.getElementById("E_textbox").value = currentData[0].address;
  const callFunction = document.getElementById("Ebutton-popup");
  callFunction.innerHTML = `<button onclick="editData(${srno},${ID})" type="submit" class="no">Save</button> `;
};

const editData = (srno, ID) => {
  let data = localStorage.getItem("TABLE");
  data = JSON.parse(data);
  let curData = data.filter((data) => data.ID != ID);
  let newLocation = document.getElementById("E_Location_name").value;
  let newAdress = document.getElementById("E_textbox").value;
  var updatedData = {
    srno: srno,
    ID: ID,
    LocationName: newLocation,
    address: newAdress,
  };
  curData.push(updatedData);
  localStorage.removeItem("TABLE");
  localStorage.setItem("TABLE", JSON.stringify(curData));
};

// For delete section
// this will insiate popup of delete  and then connect it with  delete function
const open_delete_popup = (ID) => {
  const data = document.getElementById("Delete_view");
  data.classList.remove("disblank");

  const call_fun = document.getElementById("button-popup");
  console.log(data);
  call_fun.innerHTML = `<button onclick="Delete(${ID})" type="button" class="yes"> YES </button> 
                        <button onclick="close_box_del()" type="submit" class="no">NO</button>`;
};

const close_box_del = () => {
  const data = document.getElementById("Delete_view");
  data.classList.add("disblank");
};

const Delete = (ID) => {
  try {
    let table;
    table = localStorage.getItem("TABLE");
    table = JSON.parse(table);

    if (table.length == 0) {
      localStorage.removeItem("TABLE");
    } else {
      let cur = table.filter((data) => data.ID != ID);
      localStorage.removeItem("TABLE");
      localStorage.setItem("TABLE", JSON.stringify(cur));
    }
  } catch (err) {
    console.log(err);
  }
  close_box_del();
  tableRefresh();
};

// For view section

const close_box = () => {
  const data = document.getElementById("view_data");
  data.classList.add("disblank");
};

const view = (ID) => {
  const idViewData = document.getElementById("ID_veiw_data");
  const name_veiw_data = document.getElementById("name_veiw_data");
  const location_descr = document.getElementById("location_descr_veiw_data");
  const viewbox = document.getElementById("view_data");
  viewbox.classList.remove("disblank");
  let table = localStorage.getItem("TABLE");
  table = JSON.parse(table);
  let cur = table.filter((data) => {
    return data.ID == ID;
  });

  idViewData.value = cur[0].ID;
  name_veiw_data.value = cur[0].LocationName;
  location_descr.value = cur[0].address;
};

// script for data operation
const addData = () => {
  let Location_name = document.querySelector("#Location_name").value;
  let Address = document.querySelector("#textbox").value;
  let ID = document.querySelector("#ID").value;

  if (Location_name && Address) {
    // data oprertion
    let erro = document.getElementById("total-error");
    erro.innerText = "";

    if (localStorage) {
      if (localStorage.getItem("TABLE")) {
        let tableData = localStorage.getItem("TABLE");

        tableData = JSON.parse(tableData);
        var data = {
          srno: tableData.length + 1,
          ID: ID,
          LocationName: Location_name,
          address: Address,
        };

        tableData.push(data);
        localStorage.removeItem("TABLE");
        localStorage.setItem("TABLE", JSON.stringify(tableData));
        tableRefresh();
        alert("Data added successfully");
        addRecordPop();
      } else {
        var data = {
          srno: 1,
          ID: ID,
          LocationName: Location_name,
          address: Address,
        };

        localStorage.setItem("TABLE", JSON.stringify([{ ...data }]));
        tableRefresh();
        location.reload(true);
        addRecordPop();
      }
    }

    // localStorage.setItem("TABLE",)
  } else if (Location_name == "" || Address == "") {
    // error printing
    let erro = document.querySelector("#total-error");
    erro.innerHTML = "Invalid data";
  } else if (Location_name == "" && Address == "") {
    // /error message
    let erro = document.querySelector("#total-error");
    erro.innerHTML = "Invalid data";
  }
};

tableRefresh();
