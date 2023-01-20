import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import { ILeagueWithStanding } from '../../../types/League.types';
import StandingsTable from '../../components/tabs/team/standings/StandingsTable';
import TeamLeagueTable from '../../components/tabs/team/standings/TeamLeagueTable';

export default function TeamStandings() {
	const { leagueStandings, teamLeagueStandings } = useLoaderData() as {
		leagueStandings: ILeagueWithStanding[];
		teamLeagueStandings: ILeagueWithStanding[];
	};

	return (
		<section className="flex w-full flex-col justify-between gap-4 lg:flex-row">
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={leagueStandings}>
					{({ standings: standingsData }: ILeagueWithStanding) => (
						<StandingsTable standings={standingsData} />
					)}
				</Await>
			</Suspense>

			<section className="order-[-1] flex basis-4/12 flex-col gap-4 lg:order-last">
				<Suspense fallback={<div>Loading...</div>}>
					<Await resolve={teamLeagueStandings}>
						{(teamStandings: ILeagueWithStanding[]) =>
							teamStandings.map((league) => {
								return (
									<TeamLeagueTable
										key={league.id}
										league={league}
									/>
								);
							})
						}
					</Await>
				</Suspense>
			</section>
		</section>
	);
}
