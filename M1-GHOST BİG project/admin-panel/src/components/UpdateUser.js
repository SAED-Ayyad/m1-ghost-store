import React, { useState } from 'react';

const UpdateUser = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/update-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, oldPassword, newPassword })
        });
        const data = await response.json();
        if (data.success) {
            alert('Password updated successfully');
        } else {
            alert('Failed to update password');
        }
    };

    return (
        <div>
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Old Password:
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                </label>
                <label>
                    New Password:
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </label>
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default UpdateUser;
