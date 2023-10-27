import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;
const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Username = styled.span`
  font-size: 15px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 10px;
`;
const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({}); //

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        //get user from here
        `/users/find/${comment.userId}`
      );
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Username>
          {channel.name} <Date>1 day ago</Date>
        </Username>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
