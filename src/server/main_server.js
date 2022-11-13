const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(cors());

//import routes
const auth = require('./routes/auth.js');
const nav = require('./routes/navigation.js');
const attendanceFetch = require('./routes/attendance.js');
const detailedAttendance = require('./routes/detailedAttendance.js');
const marks = require('./routes/marks.js');


//use routes
app.use('/api/v1', auth);
app.use('/api/v1', attendanceFetch);
app.use('/api/v1', detailedAttendance);
app.use('/api/v1', nav);
app.use('/api/v1', marks);

app.listen(3000);