import NavBar from "./NavBar";
import Footer from "./Footer";
import "./styles/Home.css";
import background from "../imgs/background.jpg";
import { Box } from "@material-ui/core";
import { positions } from "@material-ui/system";
export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <div style={{ marginLeft: "60px", marginRight: "60px" }}>
        <h1>Welcome to Նկաreach!</h1>
      </div>

      <form className="flex-form">
        <input
          type="search"
          className="searchField"
          placeholder="Name of Photographer"
        />
        <select name="eventType" id="">
          <option selected value="0">
            Event Type
          </option>
          <option value="advertising">Advertising</option>
          <option value="birthday">Birthday</option>
          <option value="documentary">Documentary</option>
          <option value="erotic">Erotic</option>
          <option value="family">Family</option>
          <option value="fashion">Fashion</option>
          <option value="graduation">Graduation</option>
          <option value="landscape">Landscape</option>
          <option value="wedding">Wedding</option>
          <option value="pet">Pet</option>
          <option value="wildlife">Wildlife</option>
          <option value="sports">Sports</option>
          <option value="architecture">Architecture</option>
          <option value="real estate">Real Estate</option>
          <option value="food">Food</option>
          <option value="vehicle">Vehicle</option>
          <option value="panoramic">Panoramic</option>
          <option value="underwater">Underwater</option>
          <option value="baby and child">Baby and child</option>
          <option value="portrait">Portrait</option>
          <option value="branding">Branding</option>
          <option value="fine art">Fine art</option>
          <option value="concert">Concert</option>
          <option value="street">Street</option>
          <option value="baptism">Baptism</option>
          <option value="travel">Travel</option>
          <option value="photojournalism">Photojournalism</option>
          <option value="stock">Stock</option>
          <option value="street">Street</option>
          <option value="paparazzi">Paparazzi</option>
          <option value="macro">Macro</option>
          <option value="micro">Micro</option>
          <option value="film">Film</option>
          <option value="astrophotography">Astrophotography</option>
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
