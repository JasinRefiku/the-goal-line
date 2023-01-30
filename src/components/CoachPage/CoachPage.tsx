/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import fetchData from '../../../lib/helpers/Fetch';
import { ICoaches } from '../../../types/CoachesPage.types';

export default function CoachPage() {
	const [coaches, setCoaches] = useState<ICoaches[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchData<ICoaches[]>('https://api.npoint.io/e471eb968617878ba05f')
			.then((data) => {
				setCoaches(data);
				console.log(data.slice(0, 1));
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="bg-gray-900 py-[6%]">
			<div className="mx-auto h-auto w-full rounded-[20px] bg-white text-black  md:w-[85%]">
				<div className="h-auto w-full">
					<div className="h-auto w-full gap-[4%] lg:grid lg:grid-cols-2">
						{coaches.map((coach) => (
							<>
								<div className="col-span-1 flex w-full   ">
									<div className=" w-1/2 flex-row items-center justify-center gap-[9%]">
										<img
											src={coach.photo}
											alt=""
											className=" md:[10%] mx-auto mt-[15%] w-[50%] rounded-full  bg-gradient-to-r  from-red-400 to-slate-900 p-[2%]  md:w-1/2"
										/>
										<div className="mx-auto my-[4%] w-1/2 bg-gradient-to-r  from-red-400 to-slate-900 bg-clip-text text-center text-[22px] font-extrabold text-transparent">
											Age: {coach.age}
										</div>
									</div>
									<div className="my-auto w-1/2  ">
										<h1 className=" mt-[10%] bg-gradient-to-r from-red-600 to-slate-900 bg-clip-text p-[1%] text-left text-[16px] font-extrabold text-transparent sm:text-[25px] md:text-[27px] lg:text-[23px] 2xl:text-[27px] ">
											{coach.name}, an absolute legend at {coach.team.name}, is a graduate of the {coach.team.name}
											youth system who has gone on to manage the senior team
										</h1>
									</div>
								</div>
								<div className=" col-span-1 my-auto w-full">
									<h1 className="my-[7%] text-center text-[28px] font-semibold">
										{coach.firstname} {coach.lastname}
									</h1>
									<h1 className="p-2 pl-[2%] text-[16px] text-gray-700">
										Born in {coach.birth.place} on {coach.birth.date}, {coach.firstname} {coach.lastname} became first
										team manager in {coach.career.map((c, index) => <i key={index}>{c.start}</i>)[0]}. Thus began his
										second spell at {coach.team.name} His first era at the club was a huge success and lasted 24 years;
										he started as an U12 and progressed all the way up to the first team. He then left {coach.team.name}
										for Al Sadd in Qatar and with that experienced learned, he is coming back home.
									</h1>
								</div>
							</>
						))}
					</div>
					<div className="mt-[2%] h-auto w-full bg-gradient-to-r  from-red-600 to-slate-700 md:grid md:grid-cols-3">
						<div className="col-span-1  text-left text-white">
							<div className="mt-[5%] w-full  rounded-[2px] border-b-[5px] border-yellow-300">
								<p className="p-[2%] text-2xl font-semibold"> HISTORY</p>
							</div>
							{coaches.map((coach) => (
								<ul
									key={coach.id}
									className="mb-[5%] list-disc gap-[4%] pl-[5%] text-[15px] font-semibold"
								>
									{coach.career.map((c, index) => (
										<li
											key={index - coach.id}
											className="mt-2"
										>
											Team: {c.team.name} - from {c.start} to {c.end}
										</li>
									))}
								</ul>
							))}
						</div>
						<div className="col-span-1    text-left text-white">
							<img
								src="../src/images/33.png"
								alt=""
								className=" mx-auto h-auto w-auto md:mt-[20%]"
							/>
						</div>
						<div className="col-span-1  text-left text-white">
							<div className="mt-[5%] w-full  rounded-[2px] border-b-[5px] border-yellow-300">
								<p className="p-[2%]  text-2xl  font-semibold"> Personal Details</p>
							</div>
							{coaches.map((coach) => (
								<div key={coach.id}>
									<p className="mt-4 pl-[2%] text-[14px]">Name</p>
									<h1 className="pl-[2%] text-[25px] italic text-gray-100">
										{coach.firstname}
										{coach.lastname}
									</h1>
									<p className="mt-3 pl-[2%] text-[14px]">Place of birth</p>
									<h1 className="pl-[2%] text-[25px] italic text-gray-100">
										{coach.birth.place} {coach.birth.country}
									</h1>
									<p className="mt-3 pl-[2%] text-[14px]">Date of birth</p>
									<h1 className="pl-[2%] pb-5 text-[25px] italic text-gray-100">{coach.birth.date}</h1>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
