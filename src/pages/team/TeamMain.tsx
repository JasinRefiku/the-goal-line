import { useContext, useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import MainBreadCrumb from '../../components/breadcrumb/MainBreadCrumb';
import { BreadcrumbContext, IBreadcrumbContext } from '../../contexts/Breadcrumb.context';
import { ITeamAndVenue } from '../../types/Team.types';
import TeamTabs from './TeamTabs';

export default function TeamMainPage({ team, venue }: ITeamAndVenue) {
	const navigation = useNavigation();
	const { setBreadcrumbs } = useContext<IBreadcrumbContext>(BreadcrumbContext);
	useEffect(() => {
		setBreadcrumbs([
			{
				href: '/teams',
				name: 'Teams',
			},
			{
				href: `/team/${team.id}`,
				name: team.name,
			},
		]);
	}, [team.id, team.name, setBreadcrumbs]);

	return (
		<section className="flex grow flex-col">
			<div className="sticky top-0 z-20 flex flex-col bg-sky-900 p-2">
				<MainBreadCrumb />
				<TeamTabs />
			</div>
			<section
				className={`container mx-auto shrink-0 grow-0 overflow-y-auto p-2 ${
					navigation.state === 'loading' ? 'animate-pulse opacity-25 transition-opacity duration-300' : ''
				}`}
			>
				<Outlet context={{ team, venue }} />
			</section>
		</section>
	);
}