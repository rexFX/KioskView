const bent = require('bent');
const formurlencoded = require('form-urlencoded');

const AuthUser = async (userid, password) => {
  let params = {
    txtInst: "Institute",
    InstCode: "JUIT",
    txtuType: "Member Type",
    UserType: "S",
    txtCode: "Enrollment No",
    MemberCode: userid,
    txtPin: "Password/Pin",
    Password: password,
    BTNSubmit: "Submit",
  };

  let myParams = formurlencoded(params);
  const post = bent('https://webkiosk.juit.ac.in:9443', 'POST', 302);
  let response = await post(`/CommonFiles/UserAction.jsp?${myParams}`);
  let cookie = response.headers['set-cookie'][0].match(/[^\sJSESSIONID=][A-Z0-9][A-Z0-9]*/)[0];
  console.log(cookie);
  return cookie;
}

module.exports = { AuthUser };