import React from "react";

const Article = props => (
  <div className="article p-1">
    <h4>{props.article.title}</h4>
    <div className="container-article">
      <img src={props.article.urlToImage} alt="Article" />
    </div>
  </div>
);

export default Article;
