import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';

const ArtworkDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate(); // Hook to navigate programmatically
	const [artwork, setArtwork] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArtworkDetails = async () => {
			try {
				setLoading(true);
				const response = await axiosInstancePublic.get(`/artwork/${id}`);
				setArtwork(response.data);
			} catch (err) {
				setError('Failed to load artwork details. Please try again later.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchArtworkDetails();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p className='text-red-500'>{error}</p>;

	return artwork ? (
		<div className='container mx-auto mt-5'>
			<button
				onClick={() => navigate(-1)} // Goes back to the previous page
				className='mb-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
			>
				Back
			</button>

			<p className=''>{artwork.title}</p>
			<p className=''>{artwork.user?.fullName}</p>
			<p className=''>{artwork.medium}</p>
			<p className=''>{artwork.yearCreated}</p>
			<p className=''>{artwork.dimension}</p>
			<p className=''>{artwork.description}</p>
			<p className=''>{artwork.price}</p>
			<div className='mt-5'>
				<img
					src={artwork.images?.frontView}
					alt={artwork.title}
					className='w-full max-w-md rounded-lg shadow-lg'
				/>
				<img
					src={artwork.images?.artworkWithMaterials}
					alt={artwork.title}
					className='w-full max-w-md rounded-lg shadow-lg'
				/>
				<img
					src={artwork.images?.selfieWithArtwork}
					alt={artwork.title}
					className='w-full max-w-md rounded-lg shadow-lg'
				/>
				<img
					src={artwork.images?.angleOne}
					alt={artwork.title}
					className='w-full max-w-md rounded-lg shadow-lg'
				/>
				<img
					src={artwork.images?.angleTwo}
					alt={artwork.title}
					className='w-full max-w-md rounded-lg shadow-lg'
				/>
				<img
					src={artwork.images?.angleThree}
					alt={artwork.title}
					className='w-full max-w-md rounded-lg shadow-lg'
				/>
			</div>

			{/* Add more artwork details as needed */}
		</div>
	) : (
		<p>Artwork not found</p>
	);
};

export default ArtworkDetails;
