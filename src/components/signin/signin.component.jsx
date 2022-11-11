import { TextField, Container, Stack, Button } from "@mui/material";
import { useState, useContext } from "react";
import { CookieContext } from "../../context/cookie.context";

const Signin = () => {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");

	const { setCookie } = useContext(CookieContext);
	const userHandler = (event) => {
		setUser(event.target.value);
	};

	const passHandler = (event) => {
		setPass(event.target.value);
	};

	const sendAuth = async () => {
		//server will send a cookie, save it and use it to request other stuff.
		//When cookie expires, redirect user to the login page again.
	};

	return (
		<div>
			<Container>
				<h1>JUIT WEBKIOSK</h1>
				<Stack spacing={2}>
					<TextField
						id="outlined-basic"
						label="User ID"
						variant="outlined"
						onChange={userHandler}
						value={user}
						required
					/>
					<TextField
						id="outlined-basic"
						label="Password"
						variant="outlined"
						type="password"
						onChange={passHandler}
						value={pass}
						required
					/>
				</Stack>
				<Button variant="contained" onClick={sendAuth}>
					Submit
				</Button>
			</Container>
		</div>
	);
};

export default Signin;
