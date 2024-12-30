import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';
import { Link } from 'react-router-dom';

const ArtistDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [artist, setArtist] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArtistDetails = async () => {
			try {
				setLoading(true);
				const response = await axiosInstancePublic.get(`/artist/${id}`);
				setArtist(response.data);
			} catch (err) {
				setError('Failed to load artist details');
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchArtistDetails();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p className='text-red-500'>{error}</p>;
	if (!artist) return <p>artist not found</p>;

	return (
		<div className='font-custom container max-w-7xl mx-auto mt-5 px-4 text-sm'>
			<button
				onClick={() => navigate(-1)}
				className='mb-4 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 font-semibold tracking-widest'
			>
				🠜 Back
			</button>

			<div>
				{/* ARTIST DETAILS */}
				<div>
					<img src={artist.avatar} alt={artist.fullName} className='w-10 h-10 object-cover' />
					<p>{artist.fullName}</p>
					<p>{artist.email}</p>
					<p>{artist.dateOfBirth}</p>
					<p>{artist.location}</p>
					<p>{artist.gender}</p>
					<p>{artist.aboutYourself}</p>
				</div>

				{/* UPLOADED ARTWORKS */}
				<div className='mt-8'>
					<h3 className='text-lg font-semibold mb-4'>Uploaded Artworks</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{artist.artworks && artist.artworks.length > 0 ? (
							artist.artworks.map(artwork => (
								<Link
									to={`${
										artwork.display === 'museum'
											? `/artwork-museum/${artwork._id}`
											: `/artwork-market/${artwork._id}`
									}`}
									key={artwork._id}
									className='border rounded-lg p-4 shadow-md'
								>
									<img
										src={artwork.images.frontView}
										alt={artwork.title}
										className='w-full h-40 object-cover mb-4 rounded-md'
									/>
									<h4 className='font-semibold text-md'>{artwork.title}</h4>
									<p className='text-gray-600'>Year Created: {artwork.yearCreated}</p>
									<p className='text-gray-600'>Medium: {artwork.medium}</p>
									<p className='text-gray-600'>Dimension: {artwork.dimension}</p>
									<p className='text-gray-600'>{artwork.display}</p>
								</Link>
							))
						) : (
							<p className='text-gray-500'>No artworks uploaded yet.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtistDetails;
