// script for popup
const addRecordPop = () => {
  let data = document.querySelector("#popup");
  if (data.classList.contains("disblank")) {
    data.classList.remove("disblank");
  } else {
    data.classList.add("disblank");
  }
};

// Code for pagination
const changePage = (i) => {
  let elementId = "select" + i;
  const changeStyle = document.getElementById(elementId);
  changeStyle.classList.add("selected");

  tableRefresh(i);
  // dataList();
};

const dataList = () => {
  document.getElementById("insert-page").innerHTML = "";
  let noOfPage = localStorage.getItem("TABLE");
  noOfPage = JSON.parse(noOfPage);
  for (let i = 0; i < noOfPage.length / 10; i++) {
    document.getElementById("insert-page").innerHTML =
      document.getElementById("insert-page").innerHTML +
      ` <li class="" id="select${i}"> <a href="#" onclick="changePage(${i})">${
        i + 1
      }</a></li>`;
  }
};
const search_data = () => {
  let data = document.getElementById("inputsearch");
  let curSearch = data.value;
  let table = localStorage.getItem("TABLE");
  table = JSON.parse(table);
  let search_result = table.filter((data) => {
    if (data.address === curSearch || data.LocationName === curSearch) {
      return data;
    }
  });
  tableRefresh(0, search_result);
};

const tableRefresh = (i = 0, search_result) => {
  document.getElementById("insert_data").innerHTML = "";
  if (localStorage.getItem("TABLE")) {
    let tableData = localStorage.getItem("TABLE");
    //  converting  readable data from json
    if (search_result) {
      search_result.forEach((data, index) => {
        let ID = String(data.ID);
        document.getElementById("insert_data").innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${data.ID}</td>
            <td>${data.LocationName}</td>
            <td>${data.address}</td>
            <td>${data.status ? "Active" : "Inactive"}</td>
            <td>
              <div>
                <button Onclick = "view(${
                  data.ID
                })"><i class="fa-regular fa-eye"></i>View</button>
                <button Onclick= "editPopUpdate(${
                  index + 1
                },${ID})"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
                <button Onclick= "open_delete_popup(${
                  data.ID
                })"><i class="fa-solid fa-trash"></i>Delete</button>
                
              </div>
            </td>
          </tr>`;
      });
    } else {
      let sliceData = i * 10;
      let tableDat = JSON.parse(tableData);
      let tableUpdate = tableDat.slice(sliceData, sliceData + 10);
      tableUpdate.forEach((data, index) => {
        let ID = String(data.ID);
        document.getElementById("insert_data").innerHTML += `
           <tr>
              <td>${index + 1}</td>
              <td>${data.ID}</td>
              <td>${data.LocationName}</td>
              <td>${data.address}</td>
              <td>${data.status ? "Active" : "Inactive"}</td>
              <td>
                <div>
                  <button Onclick = "view(${
                    data.ID
                  })"><i class="fa-regular fa-eye"></i>View</button>
                  <button Onclick= "open_delete_popup(${
                    data.ID
                  })"><i class="fa-solid fa-trash"></i>Delete</button>
                  <button Onclick= "editPopUpdate(${
                    index + 1
                  },${ID})"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
                </div>
              </td>
            </tr>`;
      });
    }
  }
};

const close_box_view = () => {
  const data = document.getElementById("view_data");
  data.classList.add("disblank");
};

const close_box_edit = () => {
  const data = document.getElementById("edit_data_popup");
  data.classList.add("disblank");
};

const close_box_del = () => {
  const data = document.getElementById("Delete_view");
  data.classList.add("disblank");
};

// Edit updata data
const editPopUpdate = (srno, ID) => {
  const data = document.getElementById("edit_data_popup");
  data.classList.remove("disblank");
  let populateData = localStorage.getItem("TABLE");
  populateData = JSON.parse(populateData);
  let currentData = populateData.filter((data) => data.ID == ID);
  document.getElementById("E_Location_name").value =
    currentData[0].LocationName;
  document.getElementById("E_textbox").value = currentData[0].address;
  const callFunction = document.getElementById("Ebutton-popup");
  callFunction.innerHTML = `<button onclick="edit_Data(${srno},${ID})" type="submit" class="no">Save</button> `;
};

const edit_data = (srno, ID) => {
  let data = localStorage.getItem("TABLE");
  data = JSON.parse(data);
  let cur_data = data.filter((data) => data.srno != srno);
  let new_loc = document.getElementById("E_Location_name").value;
  let new_address = document.getElementById("E_textbox").value;
  let statusActive = document.getElementById("Active").checked || false;
  var updated_data = {
    srno: srno,
    ID: ID,
    LocationName: new_loc,
    address: new_address,
    status: statusActive,
  };

  cur_data.push(updated_data);
  localStorage.removeItem("TABLE");
  localStorage.setItem("TABLE", JSON.stringify(cur_data));
};

// this will insiate popup of delete and then connect it with  delete function
const open_delete_popup = (ID) => {
  const data = document.getElementById("Delete_view");
  data.classList.remove("disblank");
  const call_fun = document.getElementById("button-popup");
  call_fun.innerHTML = `<button onclick="Delete(${ID})" type="button" class="yes"> YES </button> 
                        <button onclick="close_box_del()" type="submit" class="no">NO</button>`;
};

// to delete data
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

// to view data

const view = (ID) => {
  const ID_view = document.getElementById("ID_veiw_data");
  const nameVeiw_data = document.getElementById("name_veiw_data");
  const location_desc = document.getElementById("location_desc_veiw_data");
  const viewbox = document.getElementById("view_data");
  viewbox.classList.remove("disblank");

  let table = localStorage.getItem("TABLE");
  table = JSON.parse(table);
  let cur = table.filter((data) => {
    return data.ID == ID;
  });
  ID_view.value = cur[0].ID;
  nameVeiw_data.value = cur[0].LocationName;
  location_desc.value = cur[0].address;
};

// For data adding
const addData = () => {
  let locationName = document.querySelector("#Location_name").value;
  let Address = document.querySelector("#textbox").value;
  let ID = document.querySelector("#ID").value;
  let statusActive = document.getElementById("Inactive").checked || false;
  console.log(statusActive);

  console.log(Address);
  console.log(ID);

  console.log(locationName);

  if (locationName && Address) {
    // data opreation
    let erro = document.getElementById("total-error");
    erro.innerText = "";

    if (localStorage) {
      if (localStorage.getItem("TABLE")) {
        let tableData = localStorage.getItem("TABLE");
        tableData = JSON.parse(tableData);

        var data = {
          srno: tableData.length,
          ID: ID,
          LocationName: locationName,
          address: Address,
          status: statusActive,
        };

        tableData.push(data);
        tableRefresh();
        localStorage.removeItem("TABLE");
        localStorage.setItem("TABLE", JSON.stringify(tableData));
        tableRefresh();
        alert("Data added successfully");
        addRecordPop();
      } else {
        var data = {
          srno: 0,
          ID: ID,
          LocationName: locationName,
          address: Address,
          status: statusActive,
        };
        localStorage.setItem("TABLE", JSON.stringify([{ ...data }]));
        console.log("Hello else");
        tableRefresh();
        location.reload(true);
        addRecordPop();
        dataList();
      }
      // localStorage.setItem("TABLE",)
    } else if (locationName == "" || Address == "") {
      // error printing
      let erro = document.querySelector("#total-error");
      erro.innerHTML = "Invalid data";
    } else if (locationName == "" && Address == "") {
      // /error message
      let erro = document.querySelector("#total-error");
      erro.innerHTML = "Invalid data";
    }
  }
  tableRefresh();
};

const sortActiveUser = () => {
  let tableData = localStorage.getItem("TABLE");
  table = JSON.parse(tableData);
  const fileteActive = table.filter((data) => data.status === true);
  const updating = table.filter((data) => data.status != true);
  updating.unshift(...fileteActive);
  localStorage.removeItem("TABLE");
  localStorage.setItem("TABLE", JSON.stringify(updating));
  tableRefresh();
};

const sortInactiveUser = () => {
  let tableData = localStorage.getItem("TABLE");
  table = JSON.parse(tableData);
  const fileteActive = table.filter((data) => data.status === false);
  const updating = table.filter((data) => data.status != false);
  updating.unshift(...fileteActive);
  localStorage.removeItem("TABLE");
  localStorage.setItem("TABLE", JSON.stringify(updating));
  tableRefresh();
};

dataList();
tableRefresh();
