const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/marks', async (req, res) => {
  let choice;
  axios.get('https://webkiosk.juit.ac.in:9443/StudentFiles/Exam/StudentEventMarksView.jsp', { headers: { Cookie: req.cookies['Cookie'] } })
    .then(resp => {
      let $ = cheerio.load(resp.data);
      choice = $('#exam > option:nth-child(2)').text();
      let marksList = [];
      axios.get(`https://webkiosk.juit.ac.in:9443/StudentFiles/Exam/StudentEventMarksView.jsp?x=&exam=${choice}`, { headers: { Cookie: req.cookies['Cookie'] } })
        .then(resp => {
          let $ = cheerio.load(resp.data);
          $('#table-1 > tbody').children().each((i, el) => {
            let Subject = $('td:nth-child(2)', el).text().trim();
            let subj = { key: i, Subject };
            let test = {};
            for (let x = 3; x <= 8; x++) {
              let key = $(`#table-1 > thead > tr > td:nth-child(${x}) > font > b`).text().trim();
              let value = $(`td:nth-child(${x})`, el).text().trim();
              if (value) test[key] = value;
            }
            subj = { ...subj, test };
            marksList.push(subj);
          })
          res.send(marksList);
        })
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err));
});

module.exports = router;
