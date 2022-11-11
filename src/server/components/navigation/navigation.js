const axios = require('axios');
const cheerio = require('cheerio');

const navBar = async (cookie) => {
  let config = {
    "Cookie": `JSESSIONID=${cookie}`,
  };
  let name = "";
  axios.get('https://webkiosk.juit.ac.in:9443/StudentFiles/PersonalFiles/ShowAlertMessageSTUD.jsp', { headers: config })
    .then(res => {
      let $ = cheerio.load(res.data);
      name = $('body > center > p:nth-child(1) > font > b').text().match(/[^Welcome][A-Z][A-Z]*[\s][\s][A-Z][A-Z]*/)[0].trim();
      console.log(name);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  navBar,
};