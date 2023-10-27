import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import Search from "./pages/Search";

const Container = styled.div`
  display: flex;
`; //main container of home page STYLE

const Main = styled.div`
  flex: 6.5;
  background-color: ${({ theme }) => theme.bg}; //taken from theme.js
`;
const Wrapper = styled.div`
  padding: 22px 30px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {/* Used to provide the theme as dark or light as we put in theme.js */}
      <Container>
        <Router>
          <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
          {/*  to use in menu function   */}
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  {/* home page>route to video>route to each video */}
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />{" "}
                  {/* prop to use in home.jsx  */}
                  <Route path="sub" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<Signin />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
