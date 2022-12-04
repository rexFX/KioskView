import { useState } from "react";
import { useAuth } from "../context/authClient.js";
import axios from "axios";

const Signin = () => {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [wrongCred, setWrongCred] = useState(false);
	const auth = useAuth();

	const userHandler = (event) => {
		setUser(event.target.value);
	};

	const passwordHandler = (event) => {
		setPass(event.target.value);
	};

	const authHandler = async (event) => {
		event.preventDefault();
		const baseUrl = "https://webkiosk-api.onrender.com/";
		axios
			.post(baseUrl + "login", { user, pass }, { withCredentials: true })
			.then((res) => {
				if (res.status === 200) {
					document.cookie = `Cookie=${res.data}`;
					axios
						.post(baseUrl + "fetchUsername", null, {
							withCredentials: true,
						})
						.then((resp) => {
							console.log(resp);
							auth.login({
								user: resp.data,
								roll: user,
							});
						})
						.catch((err) => console.log(err));
				} else {
					alert("Error in fetching name");
				}
			})
			.catch((err) => {
				setWrongCred(true);
			});
	};

	return (
		<div className="grid w-screen h-screen place-items-center bg-slate-100">
			<div
				className="container max-w-[25em] min-w-[22em] max-h-[22em] min-h-[20em] shadow-2xl rounded-lg"
				style={{ backgroundColor: "#81A1C1" }}
			>
				<h1 className="text-center mt-7 text-3xl text-white font-bold underline underline-offset-8">
					Login
				</h1>
				<div className="flex justify-center container mt-6">
					<form>
						<div className="mt-6 grid place-items-center">
							<input
								className="w-[90%] py-2 rounded-lg px-3 border focus:border-red-600"
								type="text"
								id="rollNumber"
								placeholder="Roll Number"
								value={user}
								onChange={userHandler}
								required
							></input>
						</div>
						<div className="mt-6 grid place-items-center">
							<input
								className="w-[90%] py-2 rounded-lg px-3"
								type="password"
								id="password"
								placeholder="Password"
								value={pass}
								onChange={passwordHandler}
								required
							></input>
						</div>
						<div className="my-6 grid place-items-center">
							<button
								onClick={authHandler}
								className="bg-black rounded-md px-4 py-2 hover:bg-gray-800 active:bg-gray-700 w-[90%] font-semibold text-white"
							>
								Log in
							</button>
							<div
								className={`pt-1 ${wrongCred ? "" : "hidden"}`}
							>
								<h2 className="text-red-600 text-center">
									Wrong Credentials!
								</h2>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signin;
