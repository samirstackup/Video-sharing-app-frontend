import React from "react";
import styled from "styled-components";
import MeTubeLogo from "../../img/MeTube_Logo.jpg";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ExploreIcon from "@mui/icons-material/Explore";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import HistoryIcon from "@mui/icons-material/History";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 2;
  background-color: ${({ theme }) => theme.bgLighter}; //Taken from theme.js
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  overflow-y: auto;
  position: sticky;
  top: 0;

  /* Webkit-based browsers */
  &::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
  }
`;
const Wrapper = styled.div`
  padding: 18px 10px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  background-color: ${({ theme }) => theme.logo};
`;
const Img = styled.img`
  height: 50px;
  width: 150px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  font-weight: 400;
  align-items: center;
  justify-content: flex-start;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  padding: 7.5px 0px;
  margin-left: 20px;
  transition: background-color 0.3s ease, color 0.3s ease; /* Apply smooth transitions to background-color and color properties */

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  margin-left: 20px;
`;
const LoginButton = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  display: flex;
  gap: 8px;
  margin-top: 10px;
  cursor: pointer;
  align-items: center;
  text-align: center;
`;
const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={MeTubeLogo} />
          </Logo>
        </Link>
        <Item>
          <OtherHousesIcon /> Home
        </Item>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreIcon /> Explore
          </Item>
        </Link>
        <Link to="sub" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <LoyaltyIcon /> Subscriptions
          </Item>
        </Link>

        <Hr />

        <Item>
          <LibraryAddIcon /> Library
        </Item>
        <Item>
          <HistoryIcon /> History
        </Item>
        <Hr />
        {!currentUser && ( //if no currentuser then display
          <>
            <Login>
              Sign in to like videos, comment or subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <LoginButton>
                  <AccountCircleIcon /> SIGN IN
                </LoginButton>
              </Link>
            </Login>

            <Hr />
          </>
        )}
        <Item>
          <MusicNoteIcon /> Music
        </Item>
        <Item>
          <SportsHandballIcon /> Sports
        </Item>
        <Item>
          <SportsEsportsIcon /> Gaming
        </Item>
        <Item>
          <LocalMoviesIcon /> Movies
        </Item>
        <Item>
          <NewspaperIcon /> News
        </Item>
        <Item>
          <LiveTvIcon /> Live
        </Item>
        <Hr />

        <Item>
          <SettingsIcon /> Settings
        </Item>
        <Item>
          <ReportIcon /> Report
        </Item>
        <Item>
          <HelpIcon /> Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          {/* if true,sets false. If false,sets true */}
          <LightModeIcon />
          {darkMode ? "Light" : "Dark"} Mode{" "}
          {/* for changing string dark to light */}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
