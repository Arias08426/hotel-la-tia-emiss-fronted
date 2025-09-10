// src/pages/Home/Home.jsx
import React from 'react';
import Banner from '../../components/Banner/Banner';
import TiposHabitacion from '../../components/TiposHabitacion/TiposHabitacion';
import Servicios from '../../components/Servicios/Servicios';
import Ubicacion from '../../components/Ubicacion/Ubicacion';

const Home = () => {
  return (
    <>
  <Banner />
  <TiposHabitacion />
  <Servicios />
  <Ubicacion />
    </>
  );
};

export default Home;
