import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => (props.type === "sm" ? "320px" : "275px")};
  /* margin-bottom: 45px; */
  margin-bottom: ${(props) =>
    props.type === "sm" ? "10px" : "45px"}; //IF sm,then 10px otherwise 45
  cursor: pointer;
  display: ${(props) =>
    props.type === "sm" && "flex"}; //method to do types,if sm,display:flex
  gap: 10px;
`;
const Img = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  object-fit: cover;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type === "sm" ? "0px" : "16px")};
  gap: 12px;
  flex: 1;
`;
const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 17px;
  font-weight: 500;
  font-family: "DM Sans", sans-serif;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 15px;
  font-weight: 500;
  font-family: "DM Sans", sans-serif;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 0;
`;

const Info = styled.div`
  font-size: 12px;
  font-weight: 500;
  font-family: "DM Sans", sans-serif;
  color: ${({ theme }) => theme.textSoft};
`;
//video taken from home.jsx
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/users/find/${video.userId}`); // Correct endpoint
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error.response); // Log the error response
      }
    };
    fetchChannel();
  }, [video.userId]);
  //PROP is type here
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Img type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImg type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
