import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store').then(module => ({ default: module.Store })));
const Location = lazy(() => import('./pages/Location'));
const Scan = lazy(() => import('./pages/Scan'));

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar/>
      <Container className="mb-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/Location" element={<Location />} />
            <Route path="/Scan" element={<Scan />} />
          </Routes>
        </Suspense>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App;