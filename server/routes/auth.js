const express = require('express');
const router = express.Router();
const bent = require('bent');
const formurlencoded = require('form-urlencoded');

router.post('/login', async (req, res) => {
  let params = {
    txtInst: "Institute",
    InstCode: "JUIT",
    txtuType: "Member Type",
    UserType: "S",
    txtCode: "Enrollment No",
    MemberCode: req.body['user'],
    txtPin: "Password/Pin",
    Password: req.body['pass'],
    BTNSubmit: "Submit",
  };

  let myParams = formurlencoded(params);
  const post = bent('https://webkiosk.juit.ac.in:9443', 'POST', 302);
  try {
    let response = await post(`/CommonFiles/UserAction.jsp?${myParams}`);
    let cookie = response.headers['set-cookie'][0].match(/^J[=A-Z0-9]*/)[0];
    res.cookie('Cookie', `${cookie}`);
    res.status(200);
    res.write(`${cookie}`);
    res.end();
  }
  catch (err) {
    res.status(401);
    res.send("error: wrong credentials");
  };
});

module.exports = router;