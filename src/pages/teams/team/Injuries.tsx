import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { IPlayerInjury } from '../../../types/Player.types';
import MainLoadingSpinner from '../../../components/MainLoadingSpinner';
import TeamInjuriesTable from '../../../components/tabs/team/injuries/Table';

export default function TeamInjuriesPage() {
	const { injuries } = useLoaderData() as { injuries: IPlayerInjury[] };

	return (
		<Suspense fallback={<MainLoadingSpinner />}>
			<Await resolve={injuries}>
				{(injuriesData: IPlayerInjury[]) => <TeamInjuriesTable injuriesData={injuriesData} />}
			</Await>
		</Suspense>
	);
}