import { Link } from 'react-router-dom';

import smallIcon from '../assets/images/small-icon.png';

import { TbBrandFacebook } from 'react-icons/tb';
import { TbBrandInstagram } from 'react-icons/tb';
import { TbBrandTwitter } from 'react-icons/tb';
import { TbBrandTiktok } from 'react-icons/tb';

const Footer = () => {
	return (
		<div className='border-t border-gray-300 dark:border-gray-700 mt-10 bg-white dark:bg-transparent dark:text-white'>
			<div className='px-5 py-7 flex flex-col gap-7 md:grid md:grid-cols-2 lg:px-8'>
				{/* LOGO SECTION */}
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col gap-3'>
						<div className='shrink-0 flex pb-1 gap-1'>
							<img src={smallIcon} alt='logo' className='w-auto max-h-10 h-full' />
							<div className='text-xl font-semibold flex flex-col leading-5 font-ranchers'>
								<p className='text-cyan-600'>ETHEREAL</p>
								<p>CANVAS</p>
							</div>
						</div>
						<p className='font-custom text-xs font-medium text-slate-800 dark:text-white lg:tracking-wider'>
							Bringing artists and art lovers together <br /> in one creative space.
						</p>
					</div>

					{/* SOCIAL ICONS */}
					<div>
						<ul className='flex space-x-3'>
							<li className='text-xl p-1 hover:bg-cyan-600 hover:text-white rounded-lg'>
								<TbBrandFacebook />
							</li>

							<li className='text-xl p-1 hover:bg-cyan-600 hover:text-white rounded-lg'>
								<TbBrandInstagram />
							</li>

							<li className='text-xl p-1 hover:bg-cyan-600 hover:text-white rounded-lg'>
								<TbBrandTwitter />
							</li>

							<li className='text-xl p-1 hover:bg-cyan-600 hover:text-white rounded-lg'>
								<TbBrandTiktok />
							</li>
						</ul>
					</div>
				</div>

				{/* SECTIONS */}
				<div>
					<ul className='font-bold font-custom text-slate-700 dark:text-white text-sm flex flex-col gap-2 sm:flex-row sm:gap-x-9 md:flex-col md:items-end lg:flex-row xl:justify-end'>
						{['Home', 'Artists', 'Artworks', 'Marketplace', 'About'].map(link => (
							<li key={link} className='py-1 tracking-wider hover:text-cyan-600'>
								<Link to={`/${link.toLowerCase()}`} className=''>
									{link}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='bg-gray-100 text-center py-4 dark:bg-slate-600 dark:border-t-0 border-t'>
				<p className='text-xs font-custom'>&copy; 2024 Ethereal Canvas. All rights reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
