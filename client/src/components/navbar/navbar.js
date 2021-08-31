import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Profile from "../profile/profile";
import { getAllUsers } from "../../services/UserService";
import Articles from "../Articles/Articles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Navbar = ({ user, authState }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState(false);
  const [profileAll, setProfileAll] = useState(false);
  const open = Boolean(anchorEl);
  const [users, setUsers] = useState(null);
  const [showArticles, setShowArticles] = useState(false);

  useEffect(() => {
    getAllUserForProfile();
  }, []);

  const getAllUserForProfile = async () => {
    const response = await getAllUsers();
    setUsers(response.data);
  };
  const showAllUsers = () => {
    if (profile === true || showArticles === true) {
      setProfile(false);
      setShowArticles(false);
    }
    setProfileAll(!profileAll);
    setAnchorEl(null);
  };
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      authState();
      console.log("User logged out");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const showMyProfile = () => {
    if (profileAll === true || showArticles === true) {
      setProfileAll(false);
      setShowArticles(false);
    }
    setProfile(!profile);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleArticles = () => {
    if (profileAll === true || profileAll === true) {
      setProfileAll(false);
      setProfile(false);
    }
    setShowArticles(!showArticles);
    setAnchorEl(null);
  };
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Dashboard
            </Typography>
            <div>
              <MenuItem onClick={handleArticles}>Articles</MenuItem>
            </div>
            <div>
              {user && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                    {user.name}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={showMyProfile}>My Profile</MenuItem>
                    <MenuItem onClick={showAllUsers}>All Users</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {user && profile && <Profile users={[user]} />}
      {user && profileAll && <Profile users={users} />}
      {user && showArticles && <Articles user={user} />}
    </div>
  );
};
export default Navbar;
