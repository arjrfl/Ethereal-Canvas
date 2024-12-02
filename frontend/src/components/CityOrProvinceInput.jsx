import React, { useState, forwardRef } from 'react';

const cities = [
	'Alaminos',
	'Antipolo',
	'Bacolod',
	'Baguio',
	'Bais',
	'Batac',
	'Bayawan',
	'Bogo',
	'Borongan',
	'Butuan',
	'Cabadbaran',
	'Cadiz',
	'Calapan',
	'Calbayog',
	'Caloocan',
	'Candon',
	'Catbalogan',
	'Cauayan',
	'Cebu City',
	'Cotabato',
	'Dagupan',
	'Danao',
	'Dapitan',
	'Davao City',
	'Digos',
	'Dipolog',
	'Dumaguete',
	'Escalante',
	'General Santos',
	'Gingoog',
	'Guihulngan',
	'Himamaylan',
	'Ilagan',
	'Iligan',
	'Iloilo City',
	'Isabela',
	'Kabankalan',
	'Kidapawan',
	'Koronadal',
	'La Carlota',
	'Lamitan',
	'Laoag',
	'Lapu-Lapu',
	'Las Piñas',
	'Legazpi',
	'Ligao',
	'Lipa',
	'Lucena',
	'Maasin',
	'Makati',
	'Malabon',
	'Malaybalay',
	'Malolos',
	'Mandaluyong',
	'Mandaue',
	'Manila',
	'Marawi',
	'Marikina',
	'Masbate City',
	'Mati',
	'Meycauayan',
	'Minglanilla',
	'Muntinlupa',
	'Naga',
	'Navotas',
	'Olongapo',
	'Ormoc',
	'Oroquieta',
	'Ozamiz',
	'Pagadian',
	'Palayan',
	'Panabo',
	'Parañaque',
	'Pasay',
	'Pasig',
	'Philippine City',
	'Puerto Princesa',
	'Quezon City',
	'Roxas',
	'Sagay',
	'San Carlos',
	'San Fernando',
	'San Jose del Monte',
	'San Juan',
	'San Pablo',
	'San Pedro',
	'Santa Rosa',
	'Santiago',
	'Silay',
	'Sipalay',
	'Sorsogon City',
	'Surigao',
	'Tabaco',
	'Tabuk',
	'Tacloban',
	'Tagaytay',
	'Tagbilaran',
	'Taguig',
	'Tagum',
	'Talisay',
	'Tanauan',
	'Tandag',
	'Tangub',
	'Tanjay',
	'Tarlac',
	'Toledo',
	'Trece Martires',
	'Tuguegarao',
	'Urdaneta',
	'Valencia',
	'Valenzuela',
	'Victorias',
	'Vigan',
	'Zamboanga City',
];

const provinces = [
	'Abra',
	'Agusan del Norte',
	'Agusan del Sur',
	'Aklan',
	'Albay',
	'Antique',
	'Apayao',
	'Aurora',
	'Basilan',
	'Bataan',
	'Batanes',
	'Batangas',
	'Benguet',
	'Biliran',
	'Bohol',
	'Bukidnon',
	'Bulacan',
	'Cagayan',
	'Camarines Norte',
	'Camarines Sur',
	'Camiguin',
	'Capiz',
	'Catanduanes',
	'Cavite',
	'Cebu',
	'Compostela Valley',
	'Cotabato',
	'Davao de Oro',
	'Davao del Norte',
	'Davao del Sur',
	'Davao Occidental',
	'Davao Oriental',
	'Dinagat Islands',
	'Eastern Samar',
	'Guimaras',
	'Ifugao',
	'Ilocos Norte',
	'Ilocos Sur',
	'Iloilo',
	'Isabela',
	'Kalinga',
	'La Union',
	'Laguna',
	'Lanao del Norte',
	'Lanao del Sur',
	'Leyte',
	'Maguindanao',
	'Marinduque',
	'Masbate',
	'Misamis Occidental',
	'Misamis Oriental',
	'Mountain Province',
	'Negros Occidental',
	'Negros Oriental',
	'Northern Samar',
	'Nueva Ecija',
	'Nueva Vizcaya',
	'Occidental Mindoro',
	'Oriental Mindoro',
	'Palawan',
	'Pampanga',
	'Pangasinan',
	'Quezon',
	'Quirino',
	'Rizal',
	'Romblon',
	'Samar',
	'Sarangani',
	'Siquijor',
	'Sorsogon',
	'South Cotabato',
	'Southern Leyte',
	'Sultan Kudarat',
	'Sulu',
	'Surigao del Norte',
	'Surigao del Sur',
	'Tarlac',
	'Tawi-Tawi',
	'Zambales',
	'Zamboanga del Norte',
	'Zamboanga del Sur',
	'Zamboanga Sibugay',
];

const CityOrProvinceInput = forwardRef(({ query, setQuery, setValue }, ref) => {
	const [filteredCities, setFilteredCities] = useState([]);
	const [filteredProvinces, setFilteredProvinces] = useState([]);

	const handleSearch = event => {
		const value = event.target.value.toLowerCase();
		setQuery(value);
		setValue('location', value);

		if (value.trim() !== '') {
			setFilteredCities(cities.filter(city => city.toLowerCase().includes(value)));
			setFilteredProvinces(provinces.filter(province => province.toLowerCase().includes(value)));
		} else {
			setFilteredCities([]);
			setFilteredProvinces([]);
		}
	};

	const handleSelection = selectedItem => {
		setQuery(selectedItem);
		setValue('location', selectedItem);
		setFilteredCities([]);
		setFilteredProvinces([]);
	};

	return (
		<div className='relative'>
			<input
				type='text'
				id='location'
				ref={ref}
				value={query}
				onChange={handleSearch}
				className='w-full px-4 py-3 border rounded text-sm'
				placeholder='Search City or Province'
			/>

			{query && (filteredCities.length > 0 || filteredProvinces.length > 0) && (
				<div className='absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto shadow-lg'>
					<div>
						<h3 className='font-bold p-2'>Cities</h3>
						<ul>
							{filteredCities.length > 0 ? (
								filteredCities.map((city, index) => (
									<li
										key={index}
										className='py-1 px-2 cursor-pointer hover:bg-gray-200'
										onClick={() => handleSelection(city)}
									>
										{city}
									</li>
								))
							) : (
								<li className='py-1 px-2 text-gray-500'>No matching cities</li>
							)}
						</ul>
					</div>

					<div className='mt-2'>
						<h3 className='font-bold p-2'>Provinces</h3>
						<ul>
							{filteredProvinces.length > 0 ? (
								filteredProvinces.map((province, index) => (
									<li
										key={index}
										className='py-1 px-2 cursor-pointer hover:bg-gray-200'
										onClick={() => handleSelection(province)}
									>
										{province}
									</li>
								))
							) : (
								<li className='py-1 px-2 text-gray-500'>No matching provinces</li>
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
});

export default CityOrProvinceInput;
