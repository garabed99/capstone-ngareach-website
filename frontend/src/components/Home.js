import "./styles/Home.css";
import background from "../imgs/background.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

export default function Home() {
  const [photographers, setPhotographers] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const [firstName, setFirstName] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  let photographerName = searchParams.get("photographer") || "";
  let eventType = searchParams.get("eventType") || "";

  useEffect(() => {
    let abortController = new AbortController();
    function fetchPhotographers() {
      axios
        .get("http://localhost:4000/photographers", {
          params: {
            photographyTypes: currentType,
            firstName: firstName,
          },
          signal: abortController.signal,
        })
        .then((res) => {
          console.log("array of photographers", res.data);
          localStorage.setItem("searchedData", JSON.stringify(res.data));

          setPhotographers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (photographerName || eventType) {
      fetchPhotographers();
    }

    return () => {
      abortController.abort();
    };
  }, [photographerName, eventType]);

  function handleSubmit(e) {
    e.preventDefault();

    let fd = new FormData(e.currentTarget);
    let newPhotographer = fd.get("photographer");
    if (!newPhotographer) return;
    setSearchParams({ photographer: newPhotographer });
  }

  console.log(photographers);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          opacity: 0.9,
        }}
      >
        <div className="header">
          <h1>Welcome to Նկաreach!</h1>
          <h2>Reach out to your photographer today!</h2>
        </div>

        <div className="container">
          {/* <form onSubmit={handleSubmit}> */}
            {/* <form> */}
            <div className="wrapper">
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="search-containter"
              >
                <Tooltip title="Only first letter Capital" placement="bottom">
                  <input
                    name="photographer"
                    type="search"
                    className="photographer-firstname"
                    placeholder="Photographer's First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Tooltip>

                <select
                  name="eventType"
                  onChange={(e) => setCurrentType(e.target.value)}
                >
                  {photographyTypes.map((event) => (
                    <option value={event.genre}>{event.genre}</option>
                  ))}
                </select>

                <button id={"btn"} type="submit" onSubmit={handleSubmit}>
                  Search
                </button>
              </div>
            </div>
          {/* </form> */}
          {/* <h1>{firstName}</h1> */}
          <div>
            {photographers.map((person) => {
              <h1>{person[0]}</h1>;
            })}
          </div>
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
