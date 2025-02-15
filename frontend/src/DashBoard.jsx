import axios from "axios";
import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { MyContext } from "./MyContext/ContextApi";
import { Link, useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigation = useNavigate();
  const [url, setUrl] = useState({
    longUrl: "",
    customAlias: "",
  });
  const [user, setUser] = useState({});
  const [response, setResponse] = useState([]);
  const [hover, setHover] = useState(false);

  let backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(backendUrl);
  // console.log(user);

  const getData = async () => {
    try {
      let userId = localStorage.getItem("userId");
      console.log(userId);
      let response = await axios.get(
        `${backendUrl}/user/${userId}`
      );
      // console.log(response);
      // setUser(response.data);
      setResponse(response.data.user.url);
      // getUser();
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async () => {
    try {
      let userId = localStorage.getItem("userId");
      let {
        data: { user },
      } = await axios.get(
        `${backendUrl}/api/auth/userdetails/${userId}`
      );
      console.log(user);
      setUser(user);
    } catch (error) {
      console.error("cannot find", error);
    }
  };
  useEffect(() => {
    getData();
    getUser();
  }, []);

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    console.log(url);
    let userId = localStorage.getItem("userId");
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/shorten`,
      {
        userId: userId,
        longUrl: url.longUrl,
        customAlias: url.customAlias,
      }
    );
    console.log(response);
    getData();
    // let shortUrl = response.data.urlData.url;
    // setResponseushortUrl);
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setUrl({ ...url, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigation("/");
  };

  const { longUrl, customAlias } = url;

  return (
    <div className="container">
      <div className="top_container">
        <div>
          {" "}
          <h3>Hello, {user.name}</h3>
        </div>
        <div className="img_container" onClick={() => setHover(!hover)}>
          <img src={user.picture} alt="avatar" />
          {hover && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
      <div className="user-details">
        <h2>Welcome to URL Shortener!</h2>
      </div>
      <h1>URL Shortener</h1>
      <div className="form_container">
        <form onSubmit={handleUrlSubmit}>
          <input
            type="text"
            placeholder="Enter Url here "
            name="longUrl"
            value={longUrl}
            onChange={handleUrlChange}
            required
          />
          <input
            type="text"
            placeholder="Custom Alias"
            name="customAlias"
            value={customAlias}
            onChange={handleUrlChange}
            required
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Custom Alies name</th>
              <th>Original URL</th>
              <th>Shortened URL</th>
              <th>Total Clicks</th>
            </tr>
          </thead>
          <tbody>
            {response.map((response) => {
              return (
                <tr key={response._id}>
                  <td>{response.customAlias}</td>
                  <td>{response.longUrl}</td>
                  <td>
                    <Link
                      to={`${process.env.REACT_APP_BACKEND_URL}/${response.shortUrl}`}
                    >
                      {response.shortUrl}
                    </Link>
                  </td>
                  <td>{response.totalClicks.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
