import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Comments from "../components/Comments/Comments";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess, like, dislike } from "../redux/videoSlice";
import { format } from "timeago.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation.jsx/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
  font-family: "DM Sans", sans-serif;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
  flex: 5;
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  font-family: "DM Sans", sans-serif;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  border: 0cap.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.div`
  font-weight: 600;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
`;

const Channeldesc = styled.p`
  font-size: 14px;
`;

const SubscribeBtn = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user) || {}; // Ensure currentUser is an object or an empty object if null/undefined
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state

  const path = useLocation().pathname.split("/")[2];
  // const [video, setVideo] = useState({}); //going to use it from video slice
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        // setVideo(videoRes.data);
        setChannel(channelRes.data);
        console.log(videoRes.data, "VRD");
        console.log(channelRes.data, "CRD");

        dispatch(fetchSuccess(videoRes.data));

        // Update view count in the database
        await axios.put(`/videos/view/${path}`);
        setLoading(false); // Set loading to false after successful data fetch
      } catch (err) {
        console.error("Error fetching video:", err);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, [path, dispatch]);
  // Render loading state or component content based on loading state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any loading indicator
  }

  // Define functions for handling like, dislike, and subscribe only if currentUser is defined
  const handleLike = async () => {
    if (currentUser) {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    }
  };
  const handleDislike = async () => {
    if (currentUser) {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    }
  };
  const handleSub = async () => {
    if (currentUser) {
      currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`/users/unsub/${channel._id}`)
        : await axios.put(`/users/sub/${channel._id}`);
      dispatch(subscription(channel._id));
    }
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike} disabled={!currentUser}>
              {currentUser && currentVideo.likes?.includes(currentUser._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpAltOutlinedIcon />
              )}
              {currentVideo.likes.length}
            </Button>
            <Button onClick={handleDislike} disabled={!currentUser}>
              {currentUser &&
              currentVideo.dislikes?.includes(currentUser._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOutlinedIcon />
              )}
              Dislikes
            </Button>
            <Button>
              <ReplyIcon /> Share
            </Button>
            <Button>
              <LibraryAddIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
              <Channeldesc>{currentVideo?.desc}</Channeldesc>
            </ChannelDetail>
          </ChannelInfo>
          <SubscribeBtn onClick={handleSub}>
            {currentUser && currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </SubscribeBtn>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
      {/*importing card to use in recommend cus its jsut like using in home page  */}
    </Container>
  );
};

export default Video;
