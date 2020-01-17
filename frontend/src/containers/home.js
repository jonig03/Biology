import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showFact } from "../redux/actions/facts";
import facts from "../data/facts.json";
import TabsHome from "./tabs";
import "../css/home/home.css";
import Avatar from "../components/Avatar/";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GroupIcon from "@material-ui/icons/Group";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const Home = props => {
  const [avatar, setAvatar] = useState(null);
  const id = props.userID;
  const { authenticated, fullName } = useSelector(
    state => state.isAuthenticated
  );
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  const dispatch = useDispatch();
  const isFactVisible = useSelector(state => state.showFact).isFactVisible;

  return (
    <React.Fragment>
      <div className="text-center">
        <HomeIcon style={{ fontSize: "2.25rem", color: "rgb(93, 93, 93)" }} />
      </div>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            centered
          >
            <Tab
              label="Item One"
              icon={<BorderColorIcon />}
              {...a11yProps(0)}
            />
            <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
            <Tab label="Item Three" icon={<GroupIcon />} {...a11yProps(2)} />
            <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* <h1>Here is your random fact:</h1>
          <p>{facts[generateRandomNumber()]}</p> */}
          {/* {!isFactVisible ? (
          <button
            id="showFactButton"
            className="p-3"
            onClick={() => dispatch(showFact)}
          >
            Click me to show fact!
          </button>
        ) : (
          <div>
            <h1>Fun Fact!</h1>
            <span>{facts[generateRandomNumber()]}</span>
          </div>
        )} */}
          {/* <div id="articlesHome">
            <TabsHome />
          </div> */}
          <h1 className="display-4">Hello {fullName}!</h1>
          Here would be all unfinished quizzes and courses
        </TabPanel>
        <TabPanel value={value} index={1}>
          Here will be liked quizzes and courses
        </TabPanel>
        <TabPanel value={value} index={2}>
          Here will be all friends and group chats
        </TabPanel>
        <TabPanel value={value} index={3}>
          Here would be all recomended quizzes and courses
        </TabPanel>
      </div>
    </React.Fragment>
  );
};

export default Home;
