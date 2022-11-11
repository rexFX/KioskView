const express = require('express');
const auth = require('./components/signin/auth.js');
const nav = require('./components/navigation/navigation.js');
const attendance = require('./components/attendance/attendance.js');
const app = express();

app.post('/login', async (req, res) => {
  let cookie = await auth.AuthUser(req.user, req.pass);
  res.send(cookie);
});

app.get('/attendance', async (req, res) => {
  let attendance = await attendance.attendanceReport(req.cookie); //array
});

app.listen(3000);