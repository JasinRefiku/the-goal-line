/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { useEffect, useState } from 'react';
import { faFutbol, faRug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import SummaryLoader from '../../loaders/match-page/SummaryLoader';

function Summary() {
	const [summary, setSummary] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://api.npoint.io/6c7dc019d30ed2833962');
			const data = await response.json();
			setSummary(data);
			setLoading(false);
		};
		fetchData();
	}, [summary]);

	if (loading) {
		return <SummaryLoader />;
	}

	return (
		<div className="mx-auto mt-2 w-full rounded-md bg-gray-200 p-2 dark:bg-gray-800 md:w-4/5 lg:w-full">
			<table className="w-full items-center">
				{summary.events.map((event) => {
					return (
						<tr className="flex h-10 items-center rounded-md border-b-[0.2px] border-solid border-gray-400 border-opacity-30 text-center">
							<td className="ml-2 w-8 items-center text-center">{event.time.elapsed}&apos;</td>
							<td className="ml-10 flex items-center p-2 md:ml-36 lg:ml-52">
								<span className="flex flex-col">
									<p className="text-sm">{event.team.id === 33 ? event.player.name : ''}</p>
									<p className="text-xs text-gray-400">{event.team.id === 33 ? event.assist.name : ''}</p>
								</span>
							</td>
							<td className="absolute ml-52 flex items-center justify-center p-2 text-center md:ml-80 lg:ml-96">
								{event.type === 'Goal' ? (
									<FontAwesomeIcon
										icon={faFutbol}
										className="my-auto text-[20px]"
									/>
								) : (
									''
								)}
								{event.type === 'Card' && event.detail === 'Yellow Card' ? (
									<FontAwesomeIcon
										icon={faRug}
										className="my-auto rotate-90 text-yellow-500"
									/>
								) : (
									''
								)}
								{event.type === 'Card' && event.detail === 'Red Card' ? (
									<FontAwesomeIcon
										icon={faRug}
										className="my-auto rotate-90 text-red-500"
									/>
								) : (
									''
								)}
								{event.type === 'subst' ? (
									<span className="-ml-1.5 flex">
										<FaArrowUp className="text-green-500" />
										<FaArrowDown className="text-red-500" />
									</span>
								) : (
									''
								)}
							</td>
							<td className="ml-40 flex items-center p-2 md:ml-[12rem]">
								<span className="flex flex-col">
									<p className="text-sm">{event.team.id === 34 ? event.player.name : ''}</p>
									<p className="text-xs text-gray-400">{event.team.id === 34 ? event.assist.name : ''}</p>
								</span>
							</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
}

export default Summary;
