import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Article from "./article";

const TabsHome = props => {
  const [key, setKey] = useState("home");
  const [dataFetched, setDataFetched] = useState({ articles: [] });
  const fetchData = keyWord => {
    const url =
      "https://newsapi.org/v2/everything?" +
      `q=${keyWord}&` +
      "from=2019-11-29&" +
      "sortBy=popularity&" +
      "apiKey=70bda0720c85427a8bc793d4319f12d2";
    fetch(url)
      .then(res => res.json())
      .then(dataRes => {
        dataRes.articles = dataRes.articles.slice(0, 10);
        console.log(dataRes.articles.slice(0, 10));
        setDataFetched(dataRes);
      });
  };

  const handleSelect = k => {
    console.log(k);
    fetchData(k);
    setKey(k);
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={k => handleSelect(k)}
    >
      <Tab eventKey="all" title="Home">
        {console.log(dataFetched)}
        <ul>
          {dataFetched.articles.map(article => (
            <Article key={article.url} article={article} />
          ))}
        </ul>
      </Tab>
      <Tab eventKey="biology" title="Biology">
        <ul>
          {dataFetched.articles.map(article => (
            <Article key={article.url} article={article} />
          ))}
        </ul>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled></Tab>
    </Tabs>
  );
};

export default TabsHome;
