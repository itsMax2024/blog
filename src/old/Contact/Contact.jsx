import React from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "dbdfe622-fe0e-4227-8e02-71bdfde241e8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact container">
      <div className="contact-col ">
        <h3>
          Get in tuch with us <img src={msg_icon} alt="" />
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          fugiat exercitationem maxime mollitia accusantium possimus ut officiis
          deserunt aspernatur sapiente!
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="" /> Max@gmail.com
          </li>
          <li>
            <img src={phone_icon} alt="" /> +1 123-456-7890
          </li>
          <li>
            <img src={location_icon} alt="" /> 77 Massachusetts ave, Cambridge{" "}
            <br /> MA02139, United State
          </li>
        </ul>
      </div>
      <div className="contact-col form-col">
        <form onSubmit={onSubmit}>
          <label>Enter your name</label>
          <input type="text" name="name" placeholder="Name" required />
          <label>Enter your Phone number</label>
          <input
            type="phone"
            name="number"
            placeholder="Phone number"
            required
          />
          <label>What do you want to tell us</label>
          <textarea
            name="messege"
            rows="6"
            placeholder="Enter your messege here..."
          ></textarea>
          <button type="submit" className="btn dark-btn form-btn">
            Submit Now
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
