import { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import { BsChevronRight } from 'react-icons/bs';
import { GiTrophy } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import fetchData from '../../../lib/helpers/Fetch';
import { TeamStatistics } from '../../../types/Standings-Main.types';
import StandingsMainLoader from '../Index-Loaders/Standings-Loader-Main';
import TableHead from '../table/Head';
import TableHeader from '../table/Header';
import GetRankColor from '../../lib/helpers/rank-color';
import SmallTableCell from '../table/SmallCell';
import LogoAndImage from '../image/LogoAndImage';
import FormIconArray from '../icons/FormIconArray';

export default function StandingsMain() {
	const [data, setData] = useState<TeamStatistics[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchData<TeamStatistics[]>('https://api.npoint.io/782a05439d88d05d9069').then((_data) => {
			setData(_data);
			setLoading(false);
		});
	}, []);

	return (
		<section className="md:mx-auto md:max-w-7xl">
			<div className="flex items-center">
				<GiTrophy className="rounded-full text-4xl text-yellow-500" />
				<header className="flex text-xl font-bold text-gray-200">Standings</header>
			</div>
			<div className="mt-8 flex w-full flex-col items-center bg-gray-800">
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center gap-2 text-gray-200">
						<img
							className="h-8 w-8 rounded-full bg-white"
							src="/39.png"
							alt="Premier League Logo"
						/>
						Premier League
					</div>
					<h1 className="text-lg font-medium text-gray-200">2020-21 Season</h1>
					<Link
						to="/leagues/"
						className="flex items-center gap-1 text-right text-gray-200"
					>
						<span>View All</span> <BsChevronRight className="text-xs" />
					</Link>
				</div>
				<div className="mt-1 max-h-[30rem] w-full flex-col overflow-auto">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-0 ">
						<div className="shadow sm:rounded-lg">
							{loading ? (
								<StandingsMainLoader />
							) : (
								<table className="w-full">
									<TableHead className="sticky top-0">
										<tr>
											<TableHeader className="px-6 py-3">#</TableHeader>
											<TableHeader className="p-3 text-left">Team</TableHeader>
											<TableHeader className="p-3 text-left">MP</TableHeader>
											<TableHeader className="hidden p-3 text-left md:table-cell">W</TableHeader>
											<TableHeader className="hidden p-3 text-left md:table-cell">D</TableHeader>
											<TableHeader className="hidden p-3 text-left md:table-cell">L</TableHeader>
											<TableHeader className="hidden p-3 text-left sm:table-cell">GF</TableHeader>
											<TableHeader className="hidden p-3 text-left sm:table-cell">GA</TableHeader>
											<TableHeader className="p-3 text-left">PTS</TableHeader>
											<TableHeader className="hidden p-3 text-left sm:table-cell">Form</TableHeader>
										</tr>
									</TableHead>
									<tbody className="text-gray-300">
										{data.map((standing, index) => {
											const backgroundColor = GetRankColor(standing.rank, index);

											const { team, form } = standing;
											const formArray = form.split('');
											return (
												<tr
													className={`transition-colors duration-300 dark:bg-opacity-40  dark:hover:bg-gray-600 ${backgroundColor}`}
													key={team.id}
												>
													<SmallTableCell className="w-16 text-center">{standing.rank}</SmallTableCell>
													<SmallTableCell>
														<Link to={`/teams/${team.id}/`}>
															<LogoAndImage
																src={team.logo}
																alt={`${team.name} Logo`}
																name={team.name}
															/>
														</Link>
														<div className="mt-1 ml-2 flex flex-col text-xs text-gray-300">
															<div className="flex items-center gap-1 md:hidden">
																<span className="font-semibold">Matches:</span>
																<span>
																	(W: {standing.all.win}, D: {standing.all.draw}, L: {standing.all.lose})
																</span>
															</div>
															<div className="flex items-center gap-1 sm:hidden">
																<span className="font-semibold">Goals:</span>
																<span>
																	(GF: {standing.all.goals.for}, GA: {standing.all.goals.against})
																</span>
															</div>
															<div className="flex items-center gap-1 sm:hidden">
																<span className="font-semibold">Form:</span>
																<FormIconArray array={formArray} />
															</div>
														</div>
													</SmallTableCell>
													<SmallTableCell>{standing.all.played}</SmallTableCell>
													<SmallTableCell className="hidden md:table-cell">{standing.all.win}</SmallTableCell>
													<SmallTableCell className="hidden md:table-cell">{standing.all.draw}</SmallTableCell>
													<SmallTableCell className="hidden md:table-cell">{standing.all.lose}</SmallTableCell>
													<SmallTableCell className="hidden sm:table-cell">{standing.all.goals.for}</SmallTableCell>
													<SmallTableCell className="hidden sm:table-cell">{standing.all.goals.against}</SmallTableCell>
													<SmallTableCell>{standing.points}</SmallTableCell>
													<SmallTableCell className="hidden sm:table-cell">
														<FormIconArray array={formArray} />
													</SmallTableCell>
												</tr>
											);
										})}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
				<div className="mt-1 flex w-full flex-col gap-2">
					<p className=" flex items-center gap-2 text-gray-200">
						<FaCircle className=" text-green-800 dark:text-green-600" />
						Champions League
					</p>
					<p className=" flex items-center gap-2 text-gray-200">
						<FaCircle className=" text-green-600 " />
						Europa League
					</p>
				</div>
			</div>
		</section>
	);
}