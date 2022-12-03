import { useAuth } from "../authClient";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export const MainLayout = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (!auth.isLoggedIn) {
			navigate("/");
		}
		setTimeout(() => {
			setAnimate((setThis) => auth.isLoggedIn);
		}, 100);
	});

	const changePage = (event) => {
		navigate(`/${event.target.value}`);
	};

	return (
		<div className="flex w-screen h-screen bg-slate-100">
			<div
				className={`h-screen flex-col w-1/4 shadow-xl ${
					animate ? "translate-x-0" : "-translate-x-full"
				} ease-in-out duration-300`}
				style={{ backgroundColor: "#4C566A" }}
			>
				<div className="grid place-items-center h-1/2">
					{auth.isLoggedIn && (
						<div>
							<h1 className="text-white text-4xl w-full text-center">
								{auth.user}
							</h1>
							<h2 className="text-white text-base w-full text-center">
								{auth.roll}
							</h2>
						</div>
					)}
				</div>
				<div className="grid place-items-center h-1/2">
					<div>
						<button
							className="w-full text-white border-solid border-x-white border-y-white/0 hover:border-2 active:border-y-white"
							onClick={changePage}
							value="home"
						>
							Home
						</button>
						<button
							className="w-full text-white border-solid border-x-white border-y-white/0 hover:border-2 active:border-y-white"
							onClick={changePage}
							value="home/attendance"
						>
							Attendance
						</button>
						<button
							className="w-full text-white border-solid border-x-white border-y-white/0 hover:border-2 active:border-y-white"
							onClick={changePage}
							value="home/marks"
						>
							Marks
						</button>
						<button
							className="w-full text-white border-solid border-x-white border-y-white/0 hover:border-2 active:border-y-white"
							onClick={auth.logout}
						>
							Log Out
						</button>
					</div>
				</div>
			</div>
			<div className="h-screen w-full">
				<Outlet />
			</div>
		</div>
	);
};
