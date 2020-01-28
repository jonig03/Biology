import React, { useEffect, useState } from "react";
import {
  TextField,
  Container,
  Card,
  CardActions,
  Button,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useParams } from "react-router-dom";

const CoursesList = () => {
  const [CoursesList, setCoursesList] = useState([]);
  console.log(useParams());
  useEffect(() => {
    //Ask from server course details
    fetch("http://localhost:5000/courses/")
      .then(async res => {
        const data = await res.json();
        console.log(data);
        //Update state
        setCoursesList(data.courses);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <React.Fragment>
      {/* <Paper component="div" className="d-flex align-items-center rounded p-2"> */}
      <Container className="d-flex align-items-center rounded p-2 mb-2">
        <TextField
          label="Search"
          variant="outlined"
          className="w-100"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Container>
      <Container>
        <section>
          <Card style={{ maxWidth: "280px" }}>
            <CardMedia
              style={{ height: "140px" }}
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Cell_membrane_detailed_diagram_en.svg/877px-Cell_membrane_detailed_diagram_en.svg.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              {/* startLearning + topic name + course name */}
              <Link to="/startLearning/cell/qwe">
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </section>
      </Container>
      {/* </Paper> */}
    </React.Fragment>
  );
};

export default CoursesList;
