import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import styles from './Toast.module.scss';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);
	
	const removeToast = useCallback((id) => {
		setToasts((list) => list.filter((t) => t.id !== id));
	}, []);
	
	const addToast = useCallback((message, type = 'error') => {
		const id = crypto.randomUUID();
		
		setToasts((list) => [...list, { id, message, type }]);
		setTimeout(() => removeToast(id), 3500);
	}, [removeToast]);
	
	const value = useMemo(() => ({ addToast }), [addToast]);
	
	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className={styles.toasts}>
				{toasts.map((toast) => (
					<div key={toast.id} className={`${styles.toast} ${toast.type === 'error' ? styles.error : ''}`}>
						{toast.message}
						<button className={styles.toastClose} onClick={() => removeToast(toast.id)}>
							&times;
						</button>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) throw new Error('useToast must be used within ToastProvider');
	return context;
}
