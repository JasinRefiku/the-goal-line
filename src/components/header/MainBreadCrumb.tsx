import { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { GlobalHeaderContext, IGlobalHeader } from '../../contexts/GlobalHeader.context';
import DarkModeToggle from './DarkModeToggle';

export default function MainBreadCrumb() {
	const { breadcrumbs } = useContext<IGlobalHeader>(GlobalHeaderContext);

	return (
		<section className="flex items-center justify-between py-2 sm:px-2 sm:py-4">
			<nav
				className="flex"
				aria-label="Breadcrumb"
			>
				<ol className="flex items-center gap-x-4">
					<li>
						<Link
							to="/"
							className="text-gray-200 hover:text-gray-100"
						>
							<img
								className="h-8 w-auto sm:hidden"
								src="/logo-no-background-sm.png"
								alt="Your Company"
							/>
							<AiFillHome
								className="hidden h-5 w-5 shrink-0 sm:block"
								aria-hidden="true"
							/>
							<span className="sr-only">Home</span>
						</Link>
					</li>
					{breadcrumbs.map((page) => (
						<li key={page.name}>
							<div className="flex items-center">
								<HiOutlineChevronRight
									className="h-5 w-5 shrink-0 text-gray-200"
									aria-hidden="true"
								/>
								<Link
									to={page.href}
									className="ml-4 text-xs font-medium text-gray-200 hover:text-gray-100 sm:text-sm"
								>
									{page.name}
								</Link>
							</div>
						</li>
					))}
				</ol>
			</nav>
			<DarkModeToggle className="hidden sm:block" />
		</section>
	);
}