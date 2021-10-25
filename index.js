const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const PORT = 8080;

const app = express();

axios("https://abcnews.go.com/")
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(`.ContentList__Item`, html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      console.log(title);
      articles.push({ title, url });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
