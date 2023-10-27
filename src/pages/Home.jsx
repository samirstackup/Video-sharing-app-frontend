import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVids = async () => {
      try {
        const res = await axios.get(`/videos/${type}`); // Correct endpoint
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error.response); // Log the error response
      }
    };
    fetchVids();
  }, [type]);

  return (
    <Container>
      {
        //gonna cover card in video and return a card for each vid
      }{" "}
      {videos.map((video) => (
        <Card key={video._id} video={video} /> //*have to give a unique key when using+passing video as prop
      ))}
    </Container>
  );
};

export default Home;
