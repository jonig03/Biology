import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showFact } from "../redux/actions/facts";
import facts from "../data/facts.json";
import TabsHome from "./tabs";
import "../css/home/home.css";
function Home(props) {
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };
  const dispatch = useDispatch();
  const isFactVisible = useSelector(state => state.showFact).isFactVisible;
  return (
    <div className="container">
      <div>
        <Link to="/startLearning">Start Learning Now</Link>
      </div>

      <div className="showFactHomeDiv">
        {!isFactVisible ? (
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
        )}
      </div>
      <div id="articlesHome">
        <TabsHome />
      </div>
    </div>
  );
}

export default Home;
