import { TextField, Container, Stack, Button } from "@mui/material";
import { useState, useContext } from "react";
import { CookieContext } from "../../context/cookie.context";
import axios from "axios";

const Signin = () => {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");

	const { cookie, setCookie } = useContext(CookieContext);
	const userHandler = (event) => {
		setUser(event.target.value);
	};

	const passHandler = (event) => {
		setPass(event.target.value);
	};

	const sendAuth = async () => {
		let config = {
			user,
			pass,
		};
		axios
			.post(
				"http://localhost:3000/api/v1/login",
				{ user, pass },
				{ headers: { "Content-Type": "application/json" } }
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
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
