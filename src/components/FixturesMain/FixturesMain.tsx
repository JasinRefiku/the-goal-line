import { useState, useEffect } from 'react';
import moment from 'moment';
import { FaInfoCircle } from 'react-icons/fa';

import fetchData from '../../../lib/helpers/Fetch';
import { FootballMatch } from '../../../types/Fixture-Main.types';
import FixtureHeader from './Fixture-Header';
import FixtureMainInfo from './Fixture-Main-Info';
import FixtureLoader from '../Index-Loaders/Fixtures-Loader';
import LogoAndImage, { LogoAndImageReversed } from '../image/LogoAndImage';

const urls = [
	'https://api.npoint.io/cfdd9340ece0aa795c9e',
	'https://api.npoint.io/832db32c2f7ed1d3b542',
	'https://api.npoint.io/1ba04a17c40d1ca4244d',
];

export default function FixturesMain() {
	const [matches, setMatches] = useState<FootballMatch[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [currentUrl, setCurrentUrl] = useState<string>(urls[0]);
	const [activeButton, setActiveButton] = useState<number>(0);
	const [hoveredMatchId, setHoveredMatchId] = useState<number | null>(null);

	const handleButtonClick = (index: number) => {
		setCurrentUrl(urls[index]);
		setActiveButton(index);
	};

	useEffect(() => {
		const fetchAPI = async () => {
			const data = await fetchData<FootballMatch[]>(currentUrl);
			setMatches(data.slice(20, 30));
			setLoading(false);
		};
		fetchAPI();
	}, [currentUrl]);

	return (
		<section className="mx-auto md:max-w-7xl">
			<FixtureHeader
				activeButton={activeButton}
				handleButtonClick={handleButtonClick}
			/>
			{loading ? (
				<div>
					<FixtureLoader />
				</div>
			) : (
				matches.map((match: FootballMatch, index: number) => (
					<div
						key={match.fixture.id}
						className={`${
							index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-600'
						} relative grid grid-cols-12 items-center rounded-xl py-3`}
					>
						<FixtureMainInfo
							match={match}
							hoverdMatchId={hoveredMatchId}
						/>
						<div className="col-span-3 justify-self-end">
							<LogoAndImageReversed
								src={match.teams.home.logo}
								alt={match.teams.home.name}
								name={match.teams.home.name}
							/>
						</div>
						<p className="col-span-1 mx-auto w-max rounded-lg bg-slate-500 px-4 text-center text-lime-400">
							{match.goals.home}:{match.goals.away}
						</p>
						<div className="col-span-3 justify-self-start">
							<LogoAndImage
								src={match.teams.away.logo}
								alt={match.teams.away.name}
								name={match.teams.away.name}
							/>
						</div>
						<p
							className={`${
								match.fixture.status.short === 'FT' ? 'bg-red-200 text-red-500' : 'bg-lime-400 text-slate-800'
							}col-span-1 w-max rounded-lg px-4 py-1 text-center text-sm font-semibold text-gray-600`}
						>
							{match.fixture.status.short}
						</p>
						<p className="text-yellow-400">Time: {moment(match.fixture.date).format('HH:MM')}</p>
						<FaInfoCircle
							className="col-start-12 text-yellow-400"
							onMouseEnter={() => setHoveredMatchId(match.fixture.id)}
							onMouseLeave={() => setHoveredMatchId(null)}
						/>
					</div>
				))
			)}
		</section>
	);
}