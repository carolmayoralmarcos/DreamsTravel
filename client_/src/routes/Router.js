import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import AllTravels from '../views/AllTravels';
import ViewTravel from '../views/ViewTravel';
import UpdateTravel from '../views/UpdateTravel';
import { TravelsProvider } from '../context/TravelsContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddTravel from '../views/AddTravel';

function Router() {


    return (
        <BrowserRouter>
            <Navbar />
            <TravelsProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/travels" element={<AllTravels />} />
                    <Route path="/travels/:name" element={<ViewTravel />} />
                    <Route path="/travels/edit/:name" element={<UpdateTravel />} />
                    <Route path="/add-travel" element={<AddTravel />} />
                    <Route path="/mytravels" element={<mytravels />} />
                </Routes>
            </TravelsProvider>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;
