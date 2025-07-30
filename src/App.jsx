import { Routes, Route, Navigate } from 'react-router-dom';

import { UsersProvider } from './context/UsersContext.jsx';
import { ToastProvider } from './components/Toast/Toast.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

export default function App() {
	return (
		<ToastProvider>
			<UsersProvider>
				<NavBar/>
				<main className="container">
					<Routes>
						<Route path="/" element={<Navigate to="/about" replace/>}/>
						<Route path="/about" element={<AboutPage/>}/>
						<Route path="/users" element={<UsersPage/>}/>
						<Route path="/users/:id" element={<UserDetailsPage/>}/>
						<Route path="*" element={<NotFoundPage/>}/>
					</Routes>
				</main>
			</UsersProvider>
		</ToastProvider>
	);
}
