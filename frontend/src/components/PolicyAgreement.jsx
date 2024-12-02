import React, { useState, useEffect } from 'react';

const PolicyAgreement = ({ isOpen, onClose, onAgree }) => {
	const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const handleScroll = event => {
			const element = event.target;

			// Detect when the user has scrolled to the bottom with a small tolerance for precision errors
			const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

			console.log({
				scrollTop: element.scrollTop,
				scrollHeight: element.scrollHeight,
				clientHeight: element.clientHeight,
				isAtBottom,
			}); // Debugging output

			setHasScrolledToBottom(isAtBottom);
		};

		const modalContent = document.getElementById('policy-content');
		if (modalContent) {
			modalContent.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (modalContent) {
				modalContent.removeEventListener('scroll', handleScroll);
			}
		};
	}, [isOpen]);

	const handleCheckboxChange = () => {
		setIsCheckboxChecked(prev => !prev);
	};

	const handleAgree = () => {
		if (isCheckboxChecked) {
			onAgree();
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
				<h2 className='text-lg font-bold mb-4'>Policy Agreement</h2>
				<div
					id='policy-content'
					className='overflow-y-auto max-h-64 border rounded p-4 mb-4 text-sm'
					style={{ maxHeight: '250px' }}
				>
					{/* Add your policy text here */}
					<p>1. You agree to comply with all our terms and conditions.</p>
					<p>2. You consent to the collection and processing of your data.</p>
					<p>3. You understand and accept the rules of this platform.</p>
					<p>4. Further terms and conditions...</p>
					<p>5. Continue scrolling for additional terms...</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
					<p>6. You have now reached the end of the policy agreement. Please confirm to proceed.</p>
				</div>

				{/* Checkbox that only appears after scrolling to the bottom */}
				{hasScrolledToBottom && (
					<div className='flex items-center mb-4'>
						<input
							type='checkbox'
							id='agree-checkbox'
							checked={isCheckboxChecked}
							onChange={handleCheckboxChange}
							className='mr-2'
						/>
						<label htmlFor='agree-checkbox' className='text-sm'>
							I agree to the terms and policies
						</label>
					</div>
				)}

				<div className='flex justify-end gap-2'>
					<button
						onClick={onClose}
						className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded hover:bg-gray-400'
					>
						Close
					</button>
					<button
						onClick={handleAgree}
						disabled={!isCheckboxChecked}
						className={`px-4 py-2 text-sm font-medium text-white rounded ${
							isCheckboxChecked ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
						}`}
					>
						Agree
					</button>
				</div>
			</div>
		</div>
	);
};

export default PolicyAgreement;
