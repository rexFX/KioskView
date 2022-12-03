import axios from "axios";
import { useEffect, useState } from "react";
import { ReactComponent as LoadingSVG } from "../svg/loading.svg";

const Collapsible = (props) => {
	const [toggle, setToggle] = useState(false);

	const toggleHandler = () => {
		setToggle(!toggle);
	};

	return (
		<div className="m-3 border-solid border-[0.5px] border-black border-spacing-y-2">
			<button
				className={`text-left w-full py-6 pl-2 ${
					parseInt(props.uniqueKey) % 2 === 0
						? "bg-[#81A1C1]"
						: "bg-white"
				}`}
				onClick={toggleHandler}
			>
				{props.subject}
			</button>
			{toggle && (
				<div className="bg-slate-200 w-full grid">
					<table className="my-3">
						<thead>
							<tr>
								<th>Test</th>
								<th>Marks</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(props.elem).map((keys, idx) => {
								return (
									<tr key={idx}>
										<td className="text-center">{keys}</td>
										<td className="text-center">
											{props.elem[keys]}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export const Marks = () => {
	const [examMarks, setExamMarks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.post("http://localhost:3001/api/v1/marks", null, {
				withCredentials: true,
			})
			.then((res) => {
				setExamMarks(res.data);
				setLoading(false);
			})
			.catch((err) => alert(err));
	});

	return (
		<div className="grid place-items-center h-screen w-full">
			{loading && (
				<div className="grid h-screen w-full z-1 place-items-center">
					<LoadingSVG fill="#4C566A" />
				</div>
			)}
			{!loading && (
				<div className="grid h-3/4 w-3/4 shadow-2xl bg-slate-300 overflow-y-auto overflow-x-hidden scrollProps2">
					{examMarks.map((item) => {
						return (
							<Collapsible
								subject={item["Subject"]}
								key={item["key"]}
								uniqueKey={item["key"]}
								elem={item["test"]}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};
