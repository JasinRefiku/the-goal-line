/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CountriesLoader from '../../loaders/allMatches-page/CountriesLoader';
import { ICountry } from '../../types/Country.types';
import { ILeagueAndCountry } from '../../types/General.types';

function Countries() {
	const [countries, setCountries] = useState<ICountry[]>([] as ICountry[]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [groupedLeagues, setGroupedLeagues] = useState<ILeagueAndCountry[][]>([] as ILeagueAndCountry[][]);
	const [selectedCountry, setSelectedCountry] = useState<ICountry | false>(
		JSON.parse(localStorage.getItem('selectedCountry') || '{}'),
	);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://api.npoint.io/c1b77191c0cc9d3ae051');
			const data = await response.json();
			setCountries(data);
			setLoading(false);

			const res = await fetch('https://api.npoint.io/484684e50cfa51dfed36');
			const dataC: ILeagueAndCountry[] = await res.json();

			const tempGroupedLeagues: { [key: string]: ILeagueAndCountry[] } = {};
			dataC.forEach((league) => {
				const country = league.country.name;
				if (!tempGroupedLeagues[country]) {
					tempGroupedLeagues[country] = [league];
				} else {
					tempGroupedLeagues[country].push(league);
				}
			});
			setGroupedLeagues(Object.values(tempGroupedLeagues));
		};
		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
	}, [selectedCountry]);

	const topCountries = ['England', 'Italy', 'Spain', 'France', 'Germany'];

	if (loading) {
		return <CountriesLoader />;
	}
	return (
		<div className="flex flex-col">
			<span className="my-auto flex h-14 w-52 items-center bg-gray-200 pl-2 text-lg dark:bg-gray-800 lg:fixed lg:-mt-2">
				<FaSearch />
				<input
					className="ml-2 w-full rounded-md border-0 bg-gray-200 p-2 placeholder-inherit outline-0 focus:border-0 focus:outline-0 active:border-0 dark:bg-gray-800"
					type="text"
					placeholder="Search..."
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</span>
			<span className="w-64 border-[0.2px] border-solid border-gray-200 opacity-30 lg:fixed lg:mt-12" />
			{!selectedCountry ? (
				<div className="lg:mt-12">
					{countries
						.filter((c) => topCountries.includes(c.name))
						.filter((country) => country.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
						.map((country) => (
							<button
								type="button"
								className="flex h-auto p-2"
								onClick={() => setSelectedCountry(country)}
								key={country.name}
							>
								<span className="my-auto">
									<img
										className="rounded-sm"
										src={country.flag === null ? '/images/noimg.png' : country.flag}
										width="30px"
										alt=""
									/>
								</span>
								<span className="ml-2 cursor-pointer text-sm hover:text-sky-600">{country.name}</span>
							</button>
						))}
					{countries
						.filter((c) => !topCountries.includes(c.name))
						.filter((country) => country.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
						.map((country) => (
							<button
								key={country.name}
								type="button"
								className="flex h-auto p-2"
								onClick={() => setSelectedCountry(country)}
							>
								<span className="my-auto">
									<img
										className="rounded-sm"
										src={country.flag === null ? '/images/noimg.png' : country.flag}
										width="30px"
										alt=""
									/>
								</span>
								<span className="ml-2 cursor-pointer text-sm hover:text-sky-600">{country.name}</span>
							</button>
						))}
				</div>
			) : (
				<div className="mt-14">
					<span
						className="mb-2 flex cursor-pointer items-center text-sky-600"
						onClick={() => setSelectedCountry(false)}
					>
						<FaChevronLeft />
						<p className="ml-2 text-lg">Leagues of {selectedCountry.name}</p>
					</span>
					<span>
						{groupedLeagues.map((leagues) =>
							leagues
								.filter((league) => league.country.name === selectedCountry.name)
								.filter((league) => league.league.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
								.map((league) => (
									<Link
										to={`/leagues/${league.league.id}/`}
										rel="noreferrer"
									>
										<span
											className="flex items-center p-2"
											key={league.league.id}
										>
											<img
												className="rounded-sm"
												src={league.league.logo === null ? '/images/noimg.png' : league.league.logo}
												width="20px"
												height="20px"
												alt=""
											/>

											<p className="ml-2 cursor-pointer hover:text-sky-600">{league.league.name}</p>
										</span>
									</Link>
								)),
						)}
					</span>
				</div>
			)}
		</div>
	);
}
export default Countries;
