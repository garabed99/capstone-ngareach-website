import "./styles/Home.css";
import background from "../imgs/background.jpg";
import { Box } from "@material-ui/core";

export default function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // width: "100vw",

          height: "100vh",
        }}
      >
        <div className="header">
          <h1>Welcome to Նկաreach!</h1>
        </div>

        <div className="container">
          <form>
            <div className="wrapper">
              <div className="search-containter">
                <input
                  type="search"
                  className="photographer-name"
                  placeholder="Photographer Name"
                />

                <select name="eventType" id="">
                  <option selected value="0">
                    Event Type
                  </option>
                  <option value="advertising">Advertising</option>
                  <option value="architecture">Architecture</option>
                  <option value="astrophotography">Astrophotography</option>
                  <option value="baby and child">Baby and child</option>
                  <option value="baptism">Baptism</option>
                  <option value="birthday">Birthday</option>
                  <option value="branding">Branding</option>
                  <option value="concert">Concert</option>
                  <option value="documentary">Documentary</option>
                  <option value="erotic">Erotic</option>
                  <option value="family">Family</option>
                  <option value="fashion">Fashion</option>
                  <option value="film">Film</option>
                  <option value="fine art">Fine art</option>
                  <option value="food">Food</option>
                  <option value="graduation">Graduation</option>
                  <option value="landscape">Landscape</option>
                  <option value="macro">Macro</option>
                  <option value="micro">Micro</option>
                  <option value="panoramic">Panoramic</option>
                  <option value="paparazzi">Paparazzi</option>
                  <option value="pet">Pet</option>
                  <option value="photojournalism">Photojournalism</option>
                  <option value="portrait">Portrait</option>
                  <option value="real estate">Real Estate</option>
                  <option value="sports">Sports</option>
                  <option value="stock">Stock</option>
                  <option value="street">Street</option>
                  <option value="travel">Travel</option>
                  <option value="underwater">Underwater</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="wedding">Wedding</option>
                  <option value="wildlife">Wildlife</option>
                </select>

                <button type="submit">Search</button>
              </div>
            </div>
          </form>
        </div>

        {/* <form className="flex-form">
          <input
            type="search"
            className="searchField"
            placeholder="Photographer Name"
          />
          <select name="eventType" id="">
            <option selected value="0">
              Event Type
            </option>

            <option value="advertising">Advertising</option>
            <option value="architecture">Architecture</option>
            <option value="astrophotography">Astrophotography</option>
            <option value="baby and child">Baby and child</option>
            <option value="baptism">Baptism</option>
            <option value="birthday">Birthday</option>
            <option value="branding">Branding</option>
            <option value="concert">Concert</option>
            <option value="documentary">Documentary</option>
            <option value="erotic">Erotic</option>
            <option value="family">Family</option>
            <option value="fashion">Fashion</option>
            <option value="film">Film</option>
            <option value="fine art">Fine art</option>
            <option value="food">Food</option>
            <option value="graduation">Graduation</option>
            <option value="landscape">Landscape</option>
            <option value="macro">Macro</option>
            <option value="micro">Micro</option>
            <option value="panoramic">Panoramic</option>
            <option value="paparazzi">Paparazzi</option>
            <option value="pet">Pet</option>
            <option value="photojournalism">Photojournalism</option>
            <option value="portrait">Portrait</option>
            <option value="real estate">Real Estate</option>
            <option value="sports">Sports</option>
            <option value="stock">Stock</option>
            <option value="street">Street</option>
            <option value="travel">Travel</option>
            <option value="underwater">Underwater</option>
            <option value="vehicle">Vehicle</option>
            <option value="wedding">Wedding</option>
            <option value="wildlife">Wildlife</option>
          </select>

          <button type="submit">Search</button>
        </form> */}
      </div>
    </>
  );
}
