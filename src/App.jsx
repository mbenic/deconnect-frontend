import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer'
//import './App.css'
import JoinAsDev from './pages/JoinAsDev';
import SubmitProject from './pages/SubmitProject';
import BrowseDevs from './pages/BrowseDevs';
import BrowseProjects from './pages/BrowseProjects';
import DevProfile from './pages/DevProfile';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';

function App() {
 
   
  return (
     <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join-as-dev" element={<JoinAsDev />} />
      <Route path="/submit-project" element={<SubmitProject />} />
      <Route path="/devs" element={<BrowseDevs />} />
      <Route path="/projects" element={<BrowseProjects />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/projects/:id/edit" element={<EditProject />} /> */}
      <Route path="/devs/:id" element={<DevProfile />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>} />
    </Routes>
    <Footer />
  </div>
  )
}

export default App
