import { createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/404';
import MatchPage from './pages/match';
import MatchesPage from './pages/matches';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MatchesPage />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: 'Home',
				index: true,
			},
		],
	},
]);

export default router;
