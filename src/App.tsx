import React, { useState } from "react";
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  ListItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import CameraIcon from "@material-ui/icons/Camera";
import UploadIcon from "@material-ui/icons/CloudUploadRounded";

import "./App.scss";
import theme from "./styles/theme";
import Home from "./Container/Home";
import Camera from "./Container/Camera";
import Upload from "./Container/Upload";

type IPage = "Home" | "Camera" | "Upload";

function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>();
  const [page, setPage] = useState<IPage>("Home");

  const pageMenuItem = (pageItem: IPage) => (
    <ListItem
      button
      key={pageItem}
      onClick={() => {
        setPage(pageItem);
        setMenuOpen(false);
      }}
    >
      <ListItemIcon>
        {pageItem === "Home" && <HomeIcon />}
        {pageItem === "Camera" && <CameraIcon />}
        {pageItem === "Upload" && <UploadIcon />}
      </ListItemIcon>
      <ListItemText primary={pageItem} />
    </ListItem>
  );
  const pages: IPage[] = ["Home", "Camera", "Upload"];

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Portal Offline Web App</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="top"
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false);
          }}
        >
          {pages.map((p) => pageMenuItem(p))}
        </Drawer>
        {page === "Home" && <Home />}
        {page === "Camera" && <Camera />}
        {page === "Upload" && <Upload />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
