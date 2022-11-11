const axios = require('axios');
const cheerio = require('cheerio');

const attendanceReport = async (cookie) => {
  let config = {
    "Cookie": `JSESSIONID=${cookie}`,
  }

  let myList = [];

  axios.get('https://webkiosk.juit.ac.in:9443/StudentFiles/Academic/StudentAttendanceList.jsp', { headers: config })
    .then(res => {
      let $ = cheerio.load(res.data);
      $('#table-1 > tbody').children().each((i, el) => {
        let name = $('td:nth-child(2)', el).text().trim();
        let totalAttendance, detailedAttendance;
        if (name.includes('LAB')) {
          totalAttendance = $('td:nth-child(6) > a', el).text().trim();
          detailedAttendance = "https://webkiosk.juit.ac.in:9443/StudentFiles/Academic/" + $('td:nth-child(6) > a', el).attr('href');
        }
        else {
          totalAttendance = $('td:nth-child(3) > a', el).text().trim();
          detailedAttendance = "https://webkiosk.juit.ac.in:9443/StudentFiles/Academic/" + $('td:nth-child(3) > a', el).attr('href');
        }
        myList.push({ name, totalAttendance, detailedAttendance });
      });
      console.log(myList);
      return myList;
    })
    .catch(err => {
      console.log(err);
      return myList;
    });
};

module.exports = {
  attendanceReport,
};