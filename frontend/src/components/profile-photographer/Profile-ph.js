import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProfilePh() {
  const [photographerData, setPhotographerData] = useState([]);
  const param = useParams();
  const id = param.id;
  //   console.log("the ID", id);
  //   console.log("photographerData ===", photographerData);
  useEffect(() => {
    fetchPhotographerData();
  }, []);

  function fetchPhotographerData() {
    axios
      .get(`http://localhost:4000/photographers/${id}`)
      .then((res) => {
        // console.log("array of photographer Data", res.data);

        if (res.data._id === id) {
          setPhotographerData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div key={photographerData._id}>
        <h1>{photographerData.firstName} {photographerData.lastName}</h1>
        <p>{photographerData.biography}</p>
      </div>
    </>
  );
}
