import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import PersonalInfo from '../components/PersonalInfo';
import ValidIds from '../components/ValidIds';
import SharedDrive from '../components/SharedDrive';
import PolicyAgreement from '../components/PolicyAgreement';

import { TbArrowBigRight, TbArrowBigLeft, TbFileIsr } from 'react-icons/tb';

import { useNavigate } from 'react-router-dom';

const RegisterArtist = () => {
	const [step, setStep] = useState(1);
	const [isNextEnabled, setIsNextEnabled] = useState(false);
	const [isPolicyOpen, setIsPolicyOpen] = useState(false);
	const [isPolicyAgreed, setIsPolicyAgreed] = useState(false);

	const { register, handleSubmit, watch, setValue, getValues } = useForm();
	const values = watch();

	const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ddeqjbdzb/image/upload';
	const UPLOAD_PRESETS = {
		workspace: 'artist_registration_workspace',
		selfieWithWorkspace: 'artist_registration_SelfieWithWorkspace',
		validId: 'artist_registration_validID',
		selfieWithId: 'artist_registration_SelfieWithValidID',
	};

	const navigate = useNavigate();

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

		setIsNextEnabled(requiredFields[step].every(field => values[field]));
	}, [step, values]);

	const uploadToCloudinary = async (field, file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', UPLOAD_PRESETS[field]);

		try {
			const response = await fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: formData });
			if (!response.ok) throw new Error(`Failed to upload ${field}: ${response.statusText}`);
			const data = await response.json();
			return data.secure_url;
		} catch (error) {
			console.error(`Error uploading ${field}:`, error);
			return null;
		}
	};

	const onSubmit = async data => {
		console.log('Form Data:', data);

		try {
			// Step 1: VALIDATE IF EMAIL EXISTS
			const emailCheckResponse = await fetch(`http://localhost:5000/check-email/${data.email}`, {
				method: 'GET',
			});

			const emailCheckResult = await emailCheckResponse.json();
			if (!emailCheckResponse.ok) {
				console.error('Email check failed:', emailCheckResult.message);
				alert(emailCheckResult.message || 'Email is already in use');
				return; // IMMEDIATE RETURN IF TRUE
			}

			console.log('Email is available, proceeding with image uploads...');

			// Step 2: IF EMAIL VALIDATION IS FALSE, THIS STEP RUNS
			const imageFields = ['workspace', 'selfieWithWorkspace', 'validId', 'selfieWithId'];
			const uploadResults = {};

			for (const field of imageFields) {
				const file = data[field]?.[0];
				if (file) {
					const url = await uploadToCloudinary(field, file);
					if (url) uploadResults[field] = url;
					else throw new Error(`Failed to upload ${field}`);
				} else {
					alert(`Please upload a file for ${field}`);
					return;
				}
			}

			console.log('Upload results:', uploadResults);

			// Step 3: FINAL PAYLOAD WITH URLs
			const payload = {
				...data,
				workspace: uploadResults.workspace,
				selfieWithWorkspace: uploadResults.selfieWithWorkspace,
				validId: uploadResults.validId,
				selfieWithId: uploadResults.selfieWithId,
			};

			console.log('Sending final data to backend with images:', payload);

			// Step 4: SEND THE FINAL DATA TO BACKEND
			const finalResponse = await fetch('http://localhost:5000/register/artist', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const finalResult = await finalResponse.json();
			console.log('Final Backend Response:', finalResult);

			if (!finalResponse.ok) {
				console.error('Final Backend Error:', finalResult);
				alert(finalResult.message || 'Registration failed');
				return;
			}

			alert(finalResult.message || 'Registration successful!');

			// Step 5: IF SUCCESSFUL, NAVIGATE TO HOMEPAGE
			navigate('/');
		} catch (error) {
			console.error('Error during submission:', error);
			alert(`An error occurred: ${error.message}`);
		}
	};

	const nextStep = () => setStep(prev => prev + 1);
	const prevStep = () => setStep(prev => prev - 1);

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
