import { ITeamStatistics } from '../../../../types/Team.types';
import SmallTableCell from '../../../table/SmallTableCell';
import TableHead from '../../../table/TableHead';
import TableHeader from '../../../table/TableHeader';
import TableRow from '../../../table/TableRow';

export default function TeamOverviewLineups({ lineups }: { lineups: ITeamStatistics['lineups'] }) {
	return (
		<table className="bg-neutral-700">
			<TableHead className="text-xs">
				<tr>
					<TableHeader className="py-1 pl-3 text-left">Formation Lineup</TableHeader>
					<TableHeader className="py-1 px-3 text-left">Played</TableHeader>
				</tr>
			</TableHead>
			<tbody className="text-xs">
				{lineups.map((lineup, index) => (
					<TableRow
						key={lineup.formation}
						even={index % 2 === 0}
					>
						<SmallTableCell className="w-56">{lineup.formation}</SmallTableCell>
						<SmallTableCell className="text-left">{lineup.played}</SmallTableCell>
					</TableRow>
				))}
			</tbody>
		</table>
	);
}
