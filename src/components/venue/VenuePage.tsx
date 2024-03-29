import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useContext, useEffect, useState } from 'react';
import fetchData from '../../../lib/helpers/Fetch';
import { IVenue } from '../../types/Venue.types';
import MainLoadingSpinner from '../MainLoadingSpinner';
import { GlobalHeaderContext, IGlobalHeader } from '../../contexts/GlobalHeader.context';

export default function VenuePage() {
	const [venue, setVenue] = useState<IVenue>({} as IVenue);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchData<IVenue[]>('https://api.npoint.io/383138d98ef41e68a0ce')
			.then((data) => {
				const [venueObject] = data;
				setVenue(venueObject);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.error(error);
			});
	}, []);

	const { setBreadcrumbs } = useContext<IGlobalHeader>(GlobalHeaderContext);

	useEffect(() => {
		setBreadcrumbs([
			{
				name: 'Old Trafford',
				href: '/venue/556',
			},
		]);

		return () => {
			setBreadcrumbs([]);
		};
	}, [setBreadcrumbs]);

	if (loading) {
		return <MainLoadingSpinner />;
	}

	if (!venue) {
		throw new Error('No venue found');
	}

	return (
		<div className=" 2xl:mx-auto">
			<div className="mx-auto h-auto w-full rounded-[10px] bg-gray-200   text-black dark:bg-slate-900 dark:text-gray-200  lg:w-[85%]">
				<div className=" h-auto w-full border-b-[1px]  border-gray-400 md:grid md:grid-cols-2 ">
					<div className=" col-span-1 border-r-[1px]  border-gray-400 bg-gray-200 dark:bg-gray-900 ">
						<Carousel>
							<div>
								<img
									src={venue.image}
									alt="a"
								/>
								<p className="absolute bottom-[10%] w-full bg-gray-200 bg-opacity-[0.3] py-[3%] font-mono text-base font-semibold text-black text-opacity-20  hover:bg-opacity-[0.8] hover:text-opacity-100 md:text-lg 2xl:text-2xl">
									{' '}
									The stadium owes its name to the legendary president of the club
								</p>
							</div>
							<div>
								<img
									src="/556.png"
									alt="a"
								/>
								<p className="absolute bottom-[10%] w-full bg-gray-200 bg-opacity-[0.3] py-[3%] font-mono text-base font-semibold text-black text-opacity-10  hover:bg-opacity-[0.9] hover:text-opacity-100 md:text-lg 2xl:text-2xl">
									{' '}
									The Whites` stadium is in the heart of the {venue.city}{' '}
								</p>
							</div>
							<div>
								<img
									src="/556.png"
									alt="a"
								/>
								<p className="absolute bottom-[10%] w-full bg-gray-200 bg-opacity-[0.3] py-[3%] font-mono text-base font-semibold text-black text-opacity-10  hover:bg-opacity-[0.9] hover:text-opacity-100 md:text-lg 2xl:text-2xl">
									{' '}
									The {venue.name}, a stadium with all the mod cons{' '}
								</p>
							</div>
						</Carousel>
					</div>
					<div className="col-span-1">
						<div className="mx-auto  flex h-[100%] w-[90%] flex-col items-center justify-center gap-2 text-center lg:gap-3 2xl:gap-10">
							<h1 className="font-mono text-2xl font-extrabold 2xl:text-4xl ">{venue.name}</h1>
							<h1 className="font-mono text-xl font-extrabold 2xl:text-2xl ">{venue.country}</h1>
							<p className="pb-3 text-left  font-serif md:text-base lg:text-xl 2xl:text-2xl">
								Designed by Scottish architect Archibald Leitch, who designed several other stadia, the ground was
								originally designed with a capacity of {venue.capacity + 20000} spectators and featured seating in the
								south stand under cover, while the remaining three stands were left as terraces and uncovered. Including
								the purchase of the {venue.surface}, the construction of the stadium was originally to have cost £60,000
								all told. However, as costs began to rise, to reach the intended capacity would have cost an extra
								£30,000 over the original estimate and, at the suggestion of club secretary J. J. Bentley, the capacity
								was reduced to approximately {venue.capacity}.
							</p>
						</div>
					</div>
				</div>
				<div className="grid w-full grid-cols-3 rounded-[10px]">
					<div className="flex w-full flex-col items-center justify-center ">
						<div className=" my-[30px] flex w-full  flex-col justify-center  gap-6 border-r-[1px] border-gray-400 text-center lg:w-[80%] lg:text-left ">
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									OPENING
								</p>
								1947
							</div>
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									DIMENSIONS
								</p>
								105 x 68 m
							</div>
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									LIGHTING
								</p>
								1.800 Lux
							</div>
						</div>
					</div>
					<div className="flex w-full flex-col items-center justify-center ">
						<div className=" my-[30px] flex w-full  flex-col justify-center gap-6 border-r-[1px] border-gray-400 text-center lg:w-[80%] lg:text-left ">
							<div className="text-[14px] text-gray-700  dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									CAPACITY
								</p>
								{venue.capacity}
							</div>
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									HOSPITALITY
								</p>
								245
							</div>
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									PHONE{' '}
								</p>
								+34913984300
							</div>
						</div>
					</div>{' '}
					<div className="flex w-full flex-col items-center justify-center ">
						<div className=" my-[30px] flex w-full  flex-col justify-center  gap-6 text-center lg:w-[80%]  lg:text-left ">
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									SUBWAY
								</p>
								{venue.country} L10
							</div>
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">
									ADDRESS
								</p>
								{venue.name} - {venue.country}
							</div>
							<div className="text-[14px] text-gray-700 dark:text-gray-300 2xl:text-xl ">
								<p className=" font-mono text-[15px] text-black dark:text-gray-100 lg:text-[17px] 2xl:text-2xl">NAME</p>
								{venue.name}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
