import NavBar from "./NavBar";
import Footer from "./Footer";
import "./styles/Home.css";
import background from "../imgs/background.jpg";
export default function Home() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <NavBar />
      <div style={{ marginLeft: "60px", marginRight: "60px" }}>
        <h1>this is home</h1>
        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos sapiente
          officiis modi at sunt excepturi expedita sint? Sed quibusdam
          recusandae alias error harum maxime adipisci amet laborum.
          Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
          cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit
          doloribus tenetur fugiat, temporibus enim commodi iusto libero magni
          deleniti quod quam consequuntur! Commodi minima excepturi repudiandae
          velit hic maxime doloremque. Quaerat provident commodi consectetur
          veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates
          pariatur est explicabo fugiat, dolorum eligendi quam cupiditate
          excepturi mollitia maiores labore suscipit quas? Nulla, placeat.
          Voluptatem quaerat non architecto ab laudantium modi minima sunt esse
          temporibus sint culpa, recusandae aliquam numquam totam ratione
          voluptas quod exercitationem fuga. Possimus quis earum veniam quasi
          aliquam eligendi, placeat qui corporis!
        </p> */}
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
