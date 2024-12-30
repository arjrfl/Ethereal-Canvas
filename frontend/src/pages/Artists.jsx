import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useFetchArtists from '../hooks/useFetchArtists';

import artistBanner from '../assets/images/label-images/bg-artist.jpg';

const Artists = () => {
	const { isDropdownOpen } = useOutletContext();
	const [selectedLetter, setSelectedLetter] = useState(null);
	const { artists, loading, error } = useFetchArtists(selectedLetter);

	const handleLetterClick = letter => {
		setSelectedLetter(letter); // Update the selected letter
	};

	return (
		<div
			className={`font-custom container max-w-[90rem] mx-auto mt-5 px-4 relative ${
				isDropdownOpen ? '-z-50' : ''
			}`}
		>
			<div>
				{/* Banner */}
				<div
					className='bg-cover bg-center py-10 px-10 relative rounded-2xl mb-7'
					style={{
						backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0) 70%), url(${artistBanner})`,
					}}
				>
					<h2 className='text-white text-4xl font-bold tracking-widest'>Artists</h2>
				</div>

				{/* FILTER */}
				<div className='mb-10 grid grid-cols-3 text-sm'>
					<div className='col-span-1'>
						<h3 className='font-semibold text-slate-700 tracking-widest'>Browse artists</h3>
					</div>

					<ul className='flex flex-wrap col-span-2 gap-x-3 gap-y-2 text-xs font-medium text-gray-800'>
						<li>
							<button
								onClick={() => handleLetterClick(null)} // 'All' shows all artists
								className={`px-4 py-1 border rounded-lg text-white font-medium tracking-wider ${
									selectedLetter === null ? 'bg-blue-500' : 'bg-gray-400'
								}`}
							>
								All
							</button>
						</li>
						{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
							<li key={letter}>
								<button
									onClick={() => handleLetterClick(letter)}
									className={`px-4 py-1 border rounded-lg text-white font-medium tracking-wider ${
										selectedLetter === letter ? 'bg-blue-500' : 'bg-gray-400'
									}`}
								>
									{letter}
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* ARTISTS ITEMS */}
				<div>
					<div className='grid grid-cols-4 gap-6'>
						{loading ? (
							<p>Loading...</p>
						) : error ? (
							<p className='text-red-500'>{error}</p>
						) : artists.length === 0 ? (
							<p>No artists found.</p>
						) : (
							artists.map(artist => (
								<Link
									to={`/artist/${artist._id}`}
									key={artist._id}
									className='flex flex-col bg-orange-100'
								>
									<div className=''>
										<img
											src={artist.avatar}
											alt={artist.fullName}
											className='w-10 h-10 object-cover'
										/>
									</div>

									<div className=''>
										<div>
											<p>{artist.fullName}</p>
											<p>{artist.location}</p>
											<p>{artist.email}</p>
										</div>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Artists;
