import React, { useState, useEffect } from "react";
import "./index.css";

const Content = ({ setTab }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "https://www.reddit.com/r/reactjs.json";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setData(data.data.children);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const fixedData =
    data &&
    data.map((el) => {
      let encryptedText = el.data.title;
      let fixedtitle = encryptedText.replace(/[\u0300-\u036F]/g, "");
      const decodedText = new DOMParser().parseFromString(
        el.data.selftext_html,
        "text/html"
      ).body.textContent;
      let htmlText = decodedText.replace(/<!--[\s\S]*?-->/g, "");
      let url = el.data.url;
      let score = el.data.score;
      return {
        fixedtitle,
        htmlText,
        url,
        score
      };
    });

  const scrollToEl = () => {
    setTimeout(() => {
      const el = document.getElementById("first-element");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="content-container">
      <h1 id="first-element">You can see all the cards here</h1>
      <div className="cards-container">
        {fixedData &&
          fixedData.map((post, index) => (
            <div
              key={index}
              className={index % 2 === 0 ? "even-cards" : "odd-cards"}
            >
              <h2>{post.fixedtitle}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.htmlText }} />
              <div className="url-field">
                URL:{" "}
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.url}
                </a>
              </div>
              <p className="score-field">Score: {post.score}</p>
            </div>
          ))}
      </div>
      <div className="goto-container">
        <button onClick={() => scrollToEl()} className="gotop">
          Top
        </button>
      </div>
    </div>
  );
};

export default Content;
