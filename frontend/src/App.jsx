import './styles/App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Artworks from './pages/Artworks';
import Marketplace from './pages/Marketplace';
import About from './pages/About';

import Login from './pages/Login';
import RegisterArtist from './pages/RegisterArtist';
import RegisterCollector from './pages/RegisterCollector';

import CollectorDashboard from './pages/CollectorDashboard';

const App = () => {
	return (
		<Router>
			<div>
				<Navbar />

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/artists' element={<Artists />} />
					<Route path='/artworks' element={<Artworks />} />
					<Route path='/marketplace' element={<Marketplace />} />
					<Route path='/about' element={<About />} />

					<Route path='/login' element={<Login />} />
					<Route path='/register/artist' element={<RegisterArtist />} />
					<Route path='/register/collector' element={<RegisterCollector />} />

					{/* PRIVATE ROUTES */}
					<Route path='/collector/dashboard' element={<CollectorDashboard />}></Route>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
