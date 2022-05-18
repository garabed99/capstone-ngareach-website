import "./styles/Home.css";
import background from "../imgs/background.jpg";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [photographers, setPhotographers] = useState([]);
  const [type, setType] = useState("");

  function fetchPhotographers(e) {
    axios
      .get("http://localhost:4000/photographers", {params: {photographyTypes:e.genre}})
      .then((res) => {
        console.log("array of photographers", res.data);
        setPhotographers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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

                <select name="event_type">
                  {photographyTypes.map((event) => (
                    <option value={event.genre.toLocaleLowerCase()}>
                      {event.genre}
                    </option>
                  ))}
                </select>
                <button type="submit" onClick={fetchPhotographers}>Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const photographyTypes = [
  { genre: "Event Type" },
  { genre: "Advertising" },
  { genre: "Architecture" },
  { genre: "Astrophotography" },
  { genre: "Baby and child" },
  { genre: "Baptism" },
  { genre: "Birthday" },
  { genre: "Branding" },
  { genre: "Concert" },
  { genre: "Documentary" },
  { genre: "Erotic" },
  { genre: "Family" },
  { genre: "Fashion" },
  { genre: "Film" },
  { genre: "Fine art" },
  { genre: "Food" },
  { genre: "Graduation" },
  { genre: "Landscape" },
  { genre: "Macro" },
  { genre: "Micro" },
  { genre: "Panoramic" },
  { genre: "Paparazzi" },
  { genre: "Pet" },
  { genre: "Photojournalism" },
  { genre: "Portrait" },
  { genre: "Real Estate" },
  { genre: "Sports" },
  { genre: "Stock" },
  { genre: "Street" },
  { genre: "Travel" },
  { genre: "Underwater" },
  { genre: "Vehicle" },
  { genre: "Wedding" },
  { genre: "Wildlife" },
];
