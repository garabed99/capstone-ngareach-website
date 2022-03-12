import NavBar from "./NavBar";
import Footer from "./Footer";
import "./styles/Home.css";
import background from "../imgs/background.jpg";
export default function Home() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <NavBar />
      <div style={{ marginLeft: "60px", marginRight: "60px" }}>
        <h1>Welcome to Ngareach!</h1>
      </div>

      <form className="flex-form">
        <input
          type="search"
          className="searchField"
          placeholder="Name of Photographer"
        />
        
        <select name="eventType" id="">
          <option selected value="0">
            Select
          </option>
          <option value="advertising">Advertising</option>
          <option value="birthday">Birthday</option>
          <option value="documentary">Documentary</option>
          <option value="events">Events</option>
          <option value="family">Family</option>
          <option value="fashion">Fashion</option>
          <option value="graduation">Graduation</option>
          <option value="landscape">Landscape</option>
          <option value="wedding">Wedding</option>
        </select>

        <label for="minPrice">Min Price</label>
        <input type="number" min="0" name="minPrice" />
        <label for="maxPrice">Max Price</label>
        <input type="number" min="0" name="maxPrice" />
        <button type="submit">Search</button>
      </form>

      <Footer />
    </div>
  );
}
