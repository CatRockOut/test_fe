import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useToast } from '../components/Toast/Toast.jsx';

const UsersContext = createContext(null);

function splitName(full) {
	if (!full) return { firstName: '', lastName: '' };
	
	const parts = String(full).trim().split(/\s+/);
	if (parts.length === 1) return { firstName: parts[0], lastName: '' };
	
	return { firstName: parts.slice(0, -1).join(' '), lastName: parts.at(-1) };
}

export function UsersProvider({ children }) {
	const { addToast } = useToast();
	const [users, setUsers] = useState([]);
	const [status, setStatus] = useState('idle'); // idle | loading | error | ready
	const [error, setError] = useState(null);
	
	const fetchUsers = async () => {
		setStatus('loading');
		setError(null);
		try {
			const res = await fetch('https://jsonplaceholder.typicode.com/users');
			
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			
			const raw = await res.json();
			const mapped = raw.map((user) => {
				const { firstName, lastName } = splitName(user.name);
				return {
					id: user.id,
					firstName,
					lastName,
					username: user.username,
					email: user.email,
					phone: user.phone,
					website: user.website,
					company: user.company?.name ?? '',
					city: user.address?.city ?? '',
					avatar: `https://i.pravatar.cc/128?u=${user.id}`,
				};
			});
			
			setUsers(mapped);
			setStatus('ready');
		} catch (error) {
			setStatus('error');
			setError(error);
			addToast('Failed to load user list. Please try again.', 'error');
		}
	};
	
	useEffect(() => {
		fetchUsers();
	}, []);
	
	const getById = (id) => users.find((u) => String(u.id) === String(id));
	
	const value = useMemo(
		() => ({ users, status, error, reload: fetchUsers, getById }),
		[users, status, error],
	);
	
	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
	const context = useContext(UsersContext);
	if (!context) throw new Error('useUsers must be used within UsersProvider');
	return context;
}
