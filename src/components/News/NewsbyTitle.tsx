/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../lib/helpers/Fetch';
import { News } from '../../../types/News.types';

export default function NewsByTitle() {
	const { title } = useParams();
	const [data, setData] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		fetchData<News[]>('../src/data/news.json')
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	const currentNews = data.find((news) => news.title === title);

	const currentDate = moment().format('MM/DD/YYYY');
	const threeHoursAgo = moment().subtract(3, 'hours').format('hh:mm A');
	return (
		<div className=" mx-auto h-full w-full gap-[1%]  dark:bg-gray-800  md:w-[70%] ">
			<div className="w-full  md:col-span-5">
				{!currentNews || loading ? (
					<Bars
						height="80"
						width="80"
						color="#4fa94d"
						ariaLabel="bars-loading"
						wrapperStyle={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100vh',
							width: '100%',
						}}
						wrapperClass=""
						visible
					/>
				) : (
					<div className="rounded-[10px] border-[2px] border-violet-400 dark:border-gray-400">
						<div className="mx-auto mt-[5%] w-[90%] text-[1.2rem] font-bold text-gray-800 dark:text-white sm:text-[1.5rem] md:text-[1.5rem] lg:text-3xl 2xl:text-4xl">
							{currentNews.title}
						</div>
						<div className="mt-[3%] flex w-full items-center space-x-1">
							<img
								className=" h-11  w-11 rounded-full md:h-16 md:w-16"
								src="/news-user.png"
								alt=""
							/>
							<div className="text-[0.8rem] font-medium text-gray-700 dark:text-gray-200 lg:text-lg">
								<div>Jese Leos</div>
								<div className="text-[0.8rem] text-gray-700 dark:text-gray-200 2xl:text-[1.5rem]">Joined in 2023</div>
							</div>
						</div>
						<div className="mx-auto mt-[1%]  w-full  md:mx-auto  ">
							<img
								className="mx-auto h-full w-full"
								src={`../${currentNews.largeImage}`}
								alt=""
							/>
						</div>
						<div className=" mt-[1%] grid w-[100%] grid-cols-2 sm:text-[1.1rem]">
							<p className=" col-span-1 w-full justify-start px-3 text-violet-800 dark:text-yellow-400">
								Date: {currentDate}
							</p>
							<p className="col-span-1 w-full px-3 text-right text-violet-800 dark:text-yellow-400">
								Time: {threeHoursAgo}
							</p>
						</div>

						<div className="mx-auto mt-5 w-[95%] break-words text-gray-800 dark:text-gray-300 sm:text-[1.2rem] lg:text-[1.1rem] 2xl:text-[1.8rem]">
							{currentNews.body}
						</div>

						<div className="mt-[3%]">
							<img
								className="h-full w-full  dark:bg-white dark:opacity-[0.8]"
								src="/gjirafavideo.jpeg"
								alt=""
							/>
						</div>
						<div className="dark:text-gray-300sm:text-[1.2rem] mx-auto my-[5%] w-[95%]  break-words text-gray-800 dark:text-gray-300 lg:text-[1.1rem] 2xl:text-[1.8rem]">
							{currentNews.body}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
