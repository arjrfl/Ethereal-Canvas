import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';
import { Link } from 'react-router-dom';
import { FaLink, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbArrowBigDown } from 'react-icons/tb';

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
	if (!artist) return <p>Artist not found</p>;

	// Utility function to extract the social media handle/username from the URL
	const extractUsername = link => {
		const url = new URL(link);
		const path = url.pathname; // Get the path of the URL
		const username = path.split('/').filter(Boolean).pop(); // Extract the last part of the path
		return username;
	};

	// Utility function to determine the icon based on the URL
	const getSocialIcon = link => {
		if (link.includes('facebook.com')) return <FaFacebook />;
		if (link.includes('x.com')) return <FaXTwitter />;
		if (link.includes('instagram.com')) return <FaInstagram />;
		if (link.includes('youtube.com')) return <FaYoutube />;
		return <FaLink />;
	};

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
				<div className='grid grid-cols-4 grid-rows-1 gap-x-10'>
					<div className='col-span-1 px-5 pt-5 pb-20 drop-shadow-lg bg-white'>
						<div className='aspect-square w-full h-fit shadow-sm'>
							<a href={artist.avatar} target='_blank'>
								<img
									src={artist.avatar}
									alt={artist.fullName}
									className='w-full h-full object-cover rounded-lg'
								/>
							</a>
						</div>
					</div>

					<div className='col-span-2'>
						<div className='space-y-1 mb-10'>
							<p className='text-4xl font-semibold tracking-wider'>{artist.fullName}</p>
							<p className='text-2xl'>Artist from {artist.location}</p>
							<p className='text-2xl pb-3'>
								Became Member In {new Date(artist.createdAt).getFullYear()}
							</p>
							<p className='tracking-wide leading-relaxed text-pretty'>{artist.aboutYourself}</p>
						</div>
					</div>

					{/* SOCIALS (only show if artist has social links) */}
					{artist.socialLinks && artist.socialLinks.length > 0 && (
						<div className='col-span-1'>
							<div className='bg-white p-6 pb-7 rounded-xl drop-shadow-lg'>
								<div className='text-slate-700 flex items-center gap-x-2 mb-3'>
									<h3 className='text-xl tracking-widest italic font-semibold'>Social Links</h3>
									<TbArrowBigDown className='animate-bounce text-lg' />
								</div>

								<div className='space-y-2'>
									{artist.socialLinks.map((link, index) =>
										link ? (
											<a
												key={index}
												href={link}
												target='_blank'
												rel='noopener noreferrer'
												className='text-slate-500 hover:underline hover:text-blue-600 flex items-center space-x-2 w-full truncate overflow-hidden whitespace-nowrap'
											>
												{getSocialIcon(link)}
												<span className='truncate'>
													{extractUsername(link)
														? extractUsername(link)
														: `Social Link ${index + 1}`}
												</span>
											</a>
										) : null
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* UPLOADED ARTWORKS */}
				<div className='mt-8'>
					<h3 className='text-lg font-semibold mb-4'>Uploaded Artworks</h3>
					<div className='grid grid-cols-4 gap-x-5'>
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
