import Contact from "./Contact";
import Address from "./Address";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="bgImageFadeOut">
        <ul>
          <Contact />

          <Address />
        </ul>
      </div>
    </div>
  );
}

export default Footer;
