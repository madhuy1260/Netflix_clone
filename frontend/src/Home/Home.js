import React, { useEffect, useState } from "react";
import Featured from "../components/featured/Featured";
import List from "../components/List/List";
import Navbar from "../components/Navbar/Navbar";
import "./Home.scss";
import axios from "axios";

function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const response = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjA3NTcwN2M3YjAwMDk5MGNiNmVmMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjMwODE2NjEsImV4cCI6MTY2MzUxMzY2MX0.jzuJa8oe4CeY80I77E8Vq1ry39pR9eAkmzzuBgCSjfM",
            },
          }
        );
        console.log(response);
        setLists(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [genre, type]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((each) => (
        <List list={each} />
      ))}
    </div>
  );
}

export default Home;
