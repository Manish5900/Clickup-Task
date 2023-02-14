// import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="main">
        <form>
          <div id="heading">
            <h1> Add Record </h1>
          </div>
          <div id="closeIcon">
            <a href="/">&times;</a>
          </div>
          <div>
            <label for="location">
              <strong>Location Name </strong>{" "}
            </label>
            <br />
            <br />
            <textarea
              id="location"
              name="location"
              rows="1"
              cols="40"
            ></textarea>
            <br />
          </div>
          <br />
          <div>
            <label for="description">
              <strong>Location Description </strong>{" "}
            </label>
            <br />
            <br />
            <textarea
              id="description"
              name="description"
              rows="8"
              cols="40"
            ></textarea>
            <br />
          </div>
          <br />
          <div id="formStatus">
            <label for="status">
              <strong>Status:</strong>
            </label>
            <br />
            <br />
            <input type="radio" id="Active" name="status" value="Active" />
            <label for="Active">Active</label>
            <input type="radio" id="Inactive" name="status" value="Inactive" />
            <label for="Inactive">Inactive</label>
          </div>
          <br />
          <input type="button" name="Add" id="Add" value=" Add " />
        </form>
      </div>
    </>
  );
}

export default App;
