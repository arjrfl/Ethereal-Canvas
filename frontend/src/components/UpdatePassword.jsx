import usePostData from '../hooks/usePostData';
import { showToast } from '../utils/toastUtils';

const PasswordUpdateForm = ({ endpoint, onSuccess }) => {
	const { postData, isPosting } = usePostData();

	const handlePasswordSubmit = async e => {
		e.preventDefault();

		const currentPassword = e.target.currentPassword.value.trim();
		const newPassword = e.target.newPassword.value.trim();
		const confirmNewPassword = e.target.confirmNewPassword.value.trim();

		if (newPassword !== confirmNewPassword) {
			showToast.error('New password and confirm password do not match.');
			return;
		}

		const { responseData, error } = await postData(
			endpoint,
			{ currentPassword, newPassword },
			'PUT'
		);

		if (!error) {
			e.target.reset(); // Clear the form inputs
			showToast.success('Password changed successfully!');
			onSuccess(); // Trigger callback on success
		} else {
			// Show specific error message from the server response
			const errorMessage = error?.response?.data?.message || 'Failed to change password.';
			showToast.error(errorMessage);
			console.error('Error changing password:', error);
		}
	};

	return (
		<form onSubmit={handlePasswordSubmit}>
			<h2>Change Password</h2>
			<div>
				<label>Current Password:</label>
				<input type='password' name='currentPassword' required disabled={isPosting} />
			</div>

			<div>
				<label>New Password:</label>
				<input type='password' name='newPassword' required disabled={isPosting} />
			</div>

			<div>
				<label>Confirm New Password:</label>
				<input type='password' name='confirmNewPassword' required disabled={isPosting} />
			</div>

			<button type='submit' disabled={isPosting}>
				{isPosting ? 'Updating...' : 'Change Password'}
			</button>
		</form>
	);
};

export default PasswordUpdateForm;
