// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// import PersonalInfo from '../components/PersonalInfo';
// import ValidIds from '../components/ValidIds';
// import SharedDrive from '../components/SharedDrive';
// import PolicyAgreement from '../components/PolicyAgreement';

// import { TbArrowBigRight, TbArrowBigLeft, TbFileIsr } from 'react-icons/tb';

// const RegisterArtist = () => {
// 	const [step, setStep] = useState(1);
// 	const [isNextEnabled, setIsNextEnabled] = useState(false);
// 	const [isPolicyOpen, setIsPolicyOpen] = useState(false);
// 	const [isPolicyAgreed, setIsPolicyAgreed] = useState(false);

// 	const { register, handleSubmit, watch, setValue, getValues } = useForm();

// 	const values = watch();

// 	useEffect(() => {
// 		const requiredFields = {
// 			1: [
// 				'firstName',
// 				'lastName',
// 				'gender',
// 				'dateOfBirth',
// 				'location',
// 				'email',
// 				'phoneNumber',
// 				'aboutYourself',
// 				'workspace',
// 				'selfieWithWorkspace',
// 			],
// 			2: ['validId', 'selfieWithId'],
// 			3: ['sharedDrive'],
// 		};

// 		const isCurrentStepValid = requiredFields[step].every(field => values[field]);

// 		setIsNextEnabled(isCurrentStepValid);
// 	}, [step, values]);

// 	const onSubmit = data => console.log(data);

// 	const nextStep = () => {
// 		const currentValues = getValues();
// 		console.log(`Step ${step} data:`, currentValues);

// 		setStep(step + 1);
// 	};

// 	const prevStep = () => setStep(step - 1);

// 	const handlePolicyAgree = () => {
// 		setIsPolicyAgreed(true);
// 		setIsPolicyOpen(false);
// 	};

// 	return (
// 		<div className='container max-w-6xl mx-auto px-2 md:px-5 my-10 md:my-20 lg:my-20 font-custom text-sm md:text-base lg:text-base'>
// 			<h2 className='text-2xl font-bold mb-4 text-center md:text-left'>Register as Artist</h2>

// 			<form
// 				onSubmit={handleSubmit(onSubmit)}
// 				className='p-2 md:bg-white md:p-6 md:rounded-lg md:shadow-lg lg:bg-white lg:p-6 lg:rounded-lg lg:shadow-lg'
// 			>
// 				{/* INPUTS */}
// 				{step === 1 && (
// 					<PersonalInfo register={register} setValue={setValue} getValues={getValues} />
// 				)}
// 				{step === 2 && <ValidIds register={register} setValue={setValue} getValues={getValues} />}
// 				{step === 3 && <SharedDrive register={register} />}

// 				{/* BUTTONS */}
// 				<div
// 					className={`border-t-2 flex ${step === 1 ? 'justify-end' : 'justify-between'} font-mono text-base md:text-lg py-5`}
// 				>
// 					{step > 1 && (
// 						<button
// 							type='button'
// 							onClick={prevStep}
// 							className='btn flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer'
// 						>
// 							<TbArrowBigLeft className='text-lg' />
// 							Previous
// 						</button>
// 					)}
// 					{step < 3 && (
// 						<button
// 							type='button'
// 							onClick={nextStep}
// 							className={`btn flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer ${
// 								!isNextEnabled ? 'opacity-50 cursor-not-allowed' : ''
// 							}`}
// 							disabled={!isNextEnabled}
// 						>
// 							Next
// 							<TbArrowBigRight className='text-lg' />
// 						</button>
// 					)}
// 					{step === 3 && (
// 						<>
// 							<button
// 								type='button'
// 								onClick={() => setIsPolicyOpen(true)}
// 								className='btn flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg'
// 							>
// 								Policy Agreement
// 							</button>
// 							<button
// 								type='submit'
// 								disabled={!isPolicyAgreed}
// 								className={`btn flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg ${
// 									isPolicyAgreed ? 'bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
// 								}`}
// 							>
// 								Submit
// 								<TbFileIsr className='text-lg' />
// 							</button>
// 						</>
// 					)}
// 				</div>
// 			</form>

// 			{/* Policy Agreement Popup */}
// 			<PolicyAgreement
// 				isOpen={isPolicyOpen}
// 				onClose={() => setIsPolicyOpen(false)}
// 				onAgree={handlePolicyAgree}
// 			/>
// 		</div>
// 	);
// };

// export default RegisterArtist;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import PersonalInfo from '../components/PersonalInfo';
import ValidIds from '../components/ValidIds';
import SharedDrive from '../components/SharedDrive';
import PolicyAgreement from '../components/PolicyAgreement';

import { TbArrowBigRight, TbArrowBigLeft, TbFileIsr } from 'react-icons/tb';

const RegisterArtist = () => {
	const [step, setStep] = useState(1);
	const [isNextEnabled, setIsNextEnabled] = useState(false);
	const [isPolicyOpen, setIsPolicyOpen] = useState(false);
	const [isPolicyAgreed, setIsPolicyAgreed] = useState(false);

	const { register, handleSubmit, watch, setValue, getValues } = useForm();

	const values = watch();

	useEffect(() => {
		const requiredFields = {
			1: [
				'firstName',
				'lastName',
				'gender',
				'dateOfBirth',
				'location',
				'email',
				'phoneNumber',
				'aboutYourself',
				'workspace',
				'selfieWithWorkspace',
			],
			2: ['validId', 'selfieWithId'],
			3: ['sharedDrive'],
		};

		const isCurrentStepValid = requiredFields[step].every(field => values[field]);

		setIsNextEnabled(isCurrentStepValid);
	}, [step, values]);

	const onSubmit = data => console.log(data);

	const nextStep = () => {
		const currentValues = getValues();
		console.log(`Step ${step} data:`, currentValues);

		setStep(step + 1);
	};

	const prevStep = () => setStep(step - 1);

	const handlePolicyAgree = () => {
		setIsPolicyAgreed(true);
		setIsPolicyOpen(false);
	};

	return (
		<div className='container max-w-6xl mx-auto px-2 md:px-5 my-10 md:my-20 lg:my-20 font-custom text-sm md:text-base'>
			<h2 className='text-2xl font-bold mb-4 text-center md:text-left'>Register as Artist</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='p-2 md:bg-white md:p-6 md:rounded-lg md:shadow-lg lg:bg-white lg:p-10 lg:rounded-lg lg:shadow-lg'
			>
				{/* INPUTS */}
				{step === 1 && (
					<PersonalInfo register={register} setValue={setValue} getValues={getValues} />
				)}
				{step === 2 && <ValidIds register={register} setValue={setValue} getValues={getValues} />}
				{step === 3 && <SharedDrive register={register} />}

				{/* Policy Agreement Link */}
				{step === 3 && (
					<div className='mb-4 text-xs md:text-sm'>
						<p>
							To enable the "Submit" button. Click the link to review and accept the{' '}
							<a
								href='#'
								onClick={e => {
									e.preventDefault();
									setIsPolicyOpen(true);
								}}
								className='text-blue-600 underline cursor-pointer'
							>
								Policy Terms and Agreement
							</a>
						</p>
					</div>
				)}

				{/* BUTTONS */}
				<div
					className={`border-t-4 border-slate-400 flex ${step === 1 ? 'justify-end' : 'justify-between'} font-mono text-base md:text-lg py-5`}
				>
					{step > 1 && (
						<button
							type='button'
							onClick={prevStep}
							className='btn flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-white bg-blue-600 rounded-lg cursor-pointer'
						>
							<TbArrowBigLeft className='text-lg' />
							Previous
						</button>
					)}
					{step < 3 && (
						<button
							type='button'
							onClick={nextStep}
							className={`btn flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-white bg-blue-600 rounded-lg cursor-pointer ${
								!isNextEnabled ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={!isNextEnabled}
						>
							Next
							<TbArrowBigRight className='text-lg' />
						</button>
					)}
					{step === 3 && (
						<button
							type='submit'
							disabled={!isPolicyAgreed}
							className={`btn flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg ${
								isPolicyAgreed ? 'bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
							}`}
						>
							Submit
							<TbFileIsr className='text-lg' />
						</button>
					)}
				</div>
			</form>

			{/* Policy Agreement Popup */}
			<PolicyAgreement
				isOpen={isPolicyOpen}
				onClose={() => setIsPolicyOpen(false)}
				onAgree={handlePolicyAgree}
			/>
		</div>
	);
};

export default RegisterArtist;
