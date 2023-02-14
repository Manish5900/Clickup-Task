// script for popup
const addRecordPop = () => {
  let data = document.querySelector("#popup");

  if (data.classList.contains("disblank")) {
    data.classList.remove("disblank");
  } else {
    data.classList.add("disblank");
  }
  tableRefresh();
};

const tableRefresh = () => {
  document.getElementById("insert_data").innerHTML = "";
  if (localStorage.getItem("TABLE")) {
    let tabel_data = localStorage.getItem("TABLE");
    //  converting  readable data from json

    tabel_data = JSON.parse(tabel_data);
    tabel_data.forEach((data) => {
      let ID = String(data.ID);

      document.getElementById("insert_data").innerHTML += `
        <tr>
            <td>${data.srno}</td>
            <td>${data.ID}</td>
            <td>${data.LocationName}</td>
            <td>${data.address}</td>
            <td>
              <div>
                <button Onclick = "view(${data.srno})"><i class="fa-regular fa-eye"></i>View</button>
                <button Onclick= "open_delete_popup(${data.srno})"><i class="fa-solid fa-trash"></i>Delete</button>
                <button Onclick= "edit_data_popup(${data.srno},${ID})"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
              </div>
            </td>
          </tr>`;
    });
  }
};

const close_box = () => {
  const data = document.getElementById("view_data");
  data.classList.add("disblank");
};

const close_box_del = () => {
  const data = document.getElementById("Delete_view");
  data.classList.add("disblank");
};

const close_box_edit = () => {
  const data = document.getElementById("edit_data_popup");
  data.classList.add("disblank");
};

const edit_data_popup = (srno, ID) => {
  const data = document.getElementById("edit_data_popup");
  data.classList.remove("disblank");
  const call_fun = document.getElementById("Ebutton-popup");
  console.log(call_fun);
  call_fun.innerHTML = `<button onclick="edit_data(${srno},${ID})" type="submit" class="no"> Save </button> `;
};

const edit_data = (srno, ID) => {
  let data = localStorage.getItem("TABLE");
  data = JSON.parse(data);
  let cur_data = data.filter((data) => data.srno != srno);
  let new_loc = document.getElementById("E_Location_name").value;
  let new_address = document.getElementById("E_textbox").value;
  console.log(new_loc);
  console.log(new_address);
  var updated_data = {
    srno: srno,
    ID: ID,
    LocationName: new_loc,
    address: new_address,
  };

  cur_data.push(updated_data);
  localStorage.removeItem("TABLE");
  localStorage.setItem("TABLE", JSON.stringify(cur_data));
};

// this will insiate popup of delete  and then connect it with  delete function
const open_delete_popup = (srno) => {
  console.log("hello1");
  const data = document.getElementById("Delete_view");
  data.classList.remove("disblank");

  const call_fun = document.getElementById("button-popup");
  console.log(data);
  call_fun.innerHTML = `<button onclick="Delete(${srno})" type="button" class="yes"> YES </button> 
                        <button onclick="close_box_del()" type="submit" class="no">NO</button>`;
};

// to delete data
const Delete = (srno) => {
  console.log("inside-delete");
  let table;

  table = localStorage.getItem("TABLE");
  console.log(table);
  table = JSON.parse(table);
  console.log(table);

  if (table.length <= 1) {
    localStorage.removeItem("TABLE");
  } else {
    let cur = table.filter((data) => data.srno != srno);
    console.log(cur);

    localStorage.removeItem("TABLE");
    localStorage.setItem("TABLE", JSON.stringify(cur));
  }
  close_box_del();
  tableRefresh();
};

// to view data

const view = (srno) => {
  const ID = document.getElementById("ID_veiw_data");
  const name_veiw_data = document.getElementById("name_veiw_data");
  const location_drcr = document.getElementById("location_drcr_veiw_data");
  const viewbox = document.getElementById("view_data");
  viewbox.classList.remove("disblank");

  let table = localStorage.getItem("TABLE");
  table = JSON.parse(table);

  let cur = table.filter((data) => {
    return data.srno == srno;
  });

  ID.value = cur[0].ID;
  name_veiw_data.value = cur[0].LocationName;
  location_drcr.value = cur[0].address;
};

// script for data opreation
const addData = () => {
  let Location_name = document.querySelector("#Location_name").value;
  let Address = document.querySelector("#textbox").value;
  let ID = document.querySelector("#ID").value;

  console.log(Address);
  console.log(ID);

  console.log(Location_name);

  if (Location_name && Address) {
    // data opreation
    let erro = document.getElementById("total-error");
    erro.innerText = "";

    if (localStorage) {
      console.log("data");

      if (localStorage.getItem("TABLE")) {
        let lo = localStorage.getItem("TABLE");

        lo = JSON.parse(lo);
        var data = {
          srno: lo.length + 1,
          ID: ID,
          LocationName: Location_name,
          address: Address,
        };

        lo.push(data);
        localStorage.removeItem("TABLE");
        localStorage.setItem("TABLE", JSON.stringify(lo));
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
