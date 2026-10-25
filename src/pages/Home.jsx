import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsList from './ProductsPage';

const Home = () => {
  return (
    <div>
                <Navbar />
               

<ProductsList />
                      <Footer />

    </div>
  )
}

export default Home
