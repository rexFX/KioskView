import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./attendance.css";
import { ReactComponent as LoadingSVG } from "../svg/loading.svg";
import axios from "axios";
import { useAuth } from "../context/authClient";

const DetailsToggle = (ref, handler) => {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			handler();
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};

export const Attendance = () => {
	const auth = useAuth();
	const [data, setData] = useState([]);
	const [details, setDetails] = useState([]);
	const ref = useRef();

	const [overviewFetched, setOverviewFetched] = useState(false);
	const [show, setShow] = useState(false);
	const [showDet, setShowDet] = useState(false);

	const toggleView = async (event) => {
		setShow(!show);

		const baseUrl =
			"https://webkiosk-api.onrender.com/api/v1/detailedAttendance";
		axios
			.post(baseUrl, {
				link: event.target.value,
				Cookie: auth.cookie,
			})
			.then((res) => {
				setDetails(res.data);
				setShowDet(true);
			})
			.catch((err) => {
				setShow(false);
				console.log(err);
			});
	};

	DetailsToggle(ref, () => {
		setShowDet(false);
		setShow(false);
	});

	useEffect(() => {
		const baseUrl = "https://webkiosk-api.onrender.com/api/v1/attendance";
		axios
			.post(baseUrl, { Cookie: auth.cookie })
			.then((res) => {
				setData(res.data);
				setOverviewFetched(true);
			})
			.catch((err) => alert(err));
	});

	return (
		<div className="h-screen grid place-items-center z-0 relative">
			{!overviewFetched ? (
				<div className="grid h-screen w-full z-1 place-items-center">
					<LoadingSVG fill="#4C566A" />
				</div>
			) : (
				<div
					className="grid h-3/4 w-3/4 shadow-2xl overflow-y-auto scrollProps"
					style={{
						backgroundColor: "#81A1C1",
						border: "0.5px solid gray",
						borderCollapse: "collapse",
					}}
				>
					<table className="table-auto rounded-lg">
						<thead
							className="sticky top-0 mx-0 my-0 shadow-md"
							style={{ backgroundColor: "#81A1C1" }}
						>
							<tr>
								<th className="text-left py-3 pl-4">SUBJECT</th>
								<th className="text-center py-3 pr-8">
									ATTENDANCE
								</th>
								<th className="text-center py-3 pr-4">
									DETAILS
								</th>
							</tr>
						</thead>
						<tbody className="bg-[#e3e9f1]">
							{data.map((el) => {
								return (
									<tr
										key={el["key"]}
										style={{
											borderTop: "0.5px solid gray",
											borderSpacing: "0",
											borderCollapse: "collapse",
										}}
									>
										<td className="text-left pl-4">
											{el["name"]}
										</td>
										<td
											className={`text-center pr-8 ${
												parseInt(
													el["totalAttendance"]
												) >= 80
													? "text-green-800 font-bold"
													: "text-red-800 font-bold"
											}`}
										>
											{el["totalAttendance"]}
										</td>
										<td className="text-center pr-4">
											<button
												key={el["key"]}
												className="rounded bg-zinc-400 p-1 px-3 hover:bg-cyan-500 active:px-2 focus:bg-cyan-600"
												style={{
													border: "0.5px solid gray",
												}}
												onClick={toggleView}
												value={el["detailedAttendance"]}
											>
												View
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			{show && !showDet && (
				<div className="absolute backdrop-blur-lg grid h-screen w-full z-1 place-items-center">
					<LoadingSVG fill="#4C566A" />
				</div>
			)}
			{show && (
				<div
					className={`${
						showDet ? "" : "hidden"
					} absolute backdrop-blur-lg grid h-screen w-full z-1 place-items-center`}
				>
					<div
						ref={ref}
						className="grid h-3/5 w-3/5 shadow-2xl overflow-y-auto overflow-x-auto scrollProps"
						style={{ backgroundColor: "#81A1C1" }}
					>
						<table
							className="table-auto"
							style={{
								borderCollapse: "collapse",
							}}
						>
							<thead
								className="sticky top-0 mx-0 my-0 shadow-md"
								style={{ backgroundColor: "#81A1C1" }}
							>
								<tr>
									<th className="text-center py-3">Date</th>
									<th className="text-center py-3 pr-8 mx-4">
										Attendance By
									</th>
									<th className="text-center py-3 pr-4">
										Status
									</th>
								</tr>
							</thead>
							<tbody style={{ backgroundColor: "#D8DEE9" }}>
								{details.map((el) => {
									return (
										<tr key={el["key"]}>
											<td className="text-center">
												{el["Date"]}
											</td>
											<td className="text-center pr-8">
												{el["Attendance By"]}
											</td>
											<td
												className={`text-center pr-4 ${
													el["Status"] === "Present"
														? "text-green-800 font-bold"
														: "text-red-800 font-bold"
												}`}
											>
												{el["Status"]}
											</td>
										</tr>
									);
								})}
							</tbody>
							<tfoot></tfoot>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};
