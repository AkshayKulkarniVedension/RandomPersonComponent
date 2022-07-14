import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("rp");

  async function fetchUser() {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const newPerson = data.results[0];
    setPerson(() => newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name.first);
  }

  useEffect(function () {
    fetchUser();
  }, []);
  function handleValue(e) {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      if (newValue === "name") {
        setTitle("name");
        setValue(person.name.first + " " + person.name.last);
      }
      if (newValue === "email") {
        setTitle("email");
        setValue(person.email);
      }
      if (newValue === "age") {
        setTitle("age");
        setValue(person.dob.age);
      }
      if (newValue === "street") {
        setTitle("street");
        setValue(
          person.location.street.number + " " + person.location.street.name
        );
      }
      if (newValue === "phone") {
        setTitle("phone number");
        setValue(person.phone);
      }
      if (newValue === "password") {
        setTitle("password");
        setValue(person.login.password);
      }
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.picture.large) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title"> my {title} is</p>
          <p className="user-value">{loading ? "loading..." : value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser></FaUser>
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen></FaEnvelopeOpen>
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes></FaCalendarTimes>
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap></FaMap>
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone></FaPhone>
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock></FaLock>
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchUser}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
