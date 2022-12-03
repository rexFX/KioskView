import { useEffect, useState } from "react";
import { useAuth } from "../context/authClient";

export const Home = () => {
	const auth = useAuth();
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setAnimate((setThis) => auth.isLoggedIn);
		}, 100);
	}, [auth.isLoggedIn]);

	return (
		<div>
			<div className="grid place-items-center h-screen">
				<h1
					className={`font-coda text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-slate-600 ${
						animate ? "opacity-100" : "opacity-0"
					} ease-in-out duration-300`}
				>
					Webkiosk
				</h1>
			</div>
		</div>
	);
};
