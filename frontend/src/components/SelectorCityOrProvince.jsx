import React from 'react';
import { useCityOrProvinceFilter } from '../hooks/useCityOrProvinceFilter';

const CityOrProvinceSelector = ({ value, onChange }) => {
	const {
		query,
		filteredCities,
		filteredProvinces,
		isDropdownVisible,
		handleInputChange,
		handleSelect,
		setDropdownVisible,
	} = useCityOrProvinceFilter();

	return (
		<div className='relative'>
			<input
				type='text'
				value={value || query} // Sync with parent state or internal state
				onChange={e => {
					handleInputChange(e.target.value);
					onChange?.(e.target.value); // Update parent state if provided
				}}
				className='w-full bg-transparent'
				onFocus={() => setDropdownVisible(true)}
				onBlur={() => setTimeout(() => setDropdownVisible(false), 200)} // Delay for click handling
			/>

			{isDropdownVisible && (filteredCities.length > 0 || filteredProvinces.length > 0) && (
				<div className='absolute mt-1 bg-white border border-gray-300 rounded-xl shadow-md max-h-40 overflow-y-auto z-10'>
					{filteredCities.length > 0 && (
						<div>
							<div className='p-2 font-bold'>Cities</div>
							{filteredCities.map(city => (
								<div
									key={city}
									className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
									onClick={() => {
										handleSelect(city);
										onChange?.(city);
									}}
								>
									{city}
								</div>
							))}
						</div>
					)}

					{filteredProvinces.length > 0 && (
						<div>
							<div className='p-2 font-bold'>Provinces</div>
							{filteredProvinces.map(province => (
								<div
									key={province}
									className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
									onClick={() => {
										handleSelect(province);
										onChange?.(province);
									}}
								>
									{province}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CityOrProvinceSelector;
