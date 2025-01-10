import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsBookmarkHeartFill } from 'react-icons/bs';
import { BsFillBookmarkXFill } from 'react-icons/bs';
import { PiFrameCornersFill } from 'react-icons/pi';

import useFetchUserData from '../hooks/useFetchUserData';
import usePostData from '../hooks/usePostData';

const CollectorFavorites = () => {
	const [refetchTrigger, setRefetchTrigger] = useState(0);
	const { userData, loading, error } = useFetchUserData('/collector/favorites', refetchTrigger);
	const { postData, isPosting } = usePostData();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	if (userData.favorites && userData.favorites.length === 0) {
		return <div>No favorites yet.</div>;
	}

	const handleRemoveFavorite = async artworkId => {
		const collectorId = localStorage.getItem('id');

		const { responseData, error } = await postData(
			'/collector/remove-favorite',
			{ collectorId, artworkId },
			'PUT'
		);

		if (!error) {
			setRefetchTrigger(prev => prev + 1);
		}
	};

	return (
		<div>
			<div className='mb-8'>
				<div className='flex items-center gap-x-2 mb-1'>
					<h1 className='text-2xl text-slate-800 font-semibold'>Saved Favorites</h1>
					<p className='text-2xl text-green-500'>
						<BsBookmarkHeartFill />
					</p>
				</div>
				<p className='text-xs'>View and remove added favorites.</p>
			</div>

			<div className='grid grid-cols-3 gap-24'>
				{userData.favorites.map(artwork => (
					<div key={artwork._id} className='grid gap-y-3'>
						<div className='h-40 w-40 aspect-square frameSm'>
							<img
								src={artwork.images.frontView}
								alt={artwork.artistName}
								className='w-full h-full object-cover rounded-lg'
							/>
						</div>

						<div className='flex justify-between'>
							<Link
								to={`/artwork-${artwork.display === 'museum' ? 'museum' : 'market'}/${artwork._id}`}
								className='flex items-center gap-x-1 text-sm text-slate-700 px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md'
							>
								<span className='font-medium'>View artwork</span>{' '}
								<span>
									<PiFrameCornersFill />
								</span>
							</Link>

							<button
								onClick={() => handleRemoveFavorite(artwork._id)}
								disabled={isPosting}
								className='text-red-500 text-xl'
							>
								{isPosting ? (
									'Removing...'
								) : (
									<p className='flex items-center gap-x-1 text-sm px-4 py-1 hover:bg-red-600 hover:text-white rounded-md'>
										<span className='font-medium'>Remove</span>{' '}
										<span>
											<BsFillBookmarkXFill />
										</span>
									</p>
								)}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CollectorFavorites;
