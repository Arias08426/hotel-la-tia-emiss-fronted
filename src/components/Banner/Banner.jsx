import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Calendar, Users, MapPin } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Banner.css';

const Banner = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Búsqueda de reserva:', formData);
    // Aquí iría la lógica de búsqueda
  };

  // Imágenes del carrusel - Reemplazar con imágenes reales del hotel
  const images = [
    {
      url: 'https://www.elranchosalento.com/_next/image?url=https%3A%2F%2Fus-east-1-shared-usea1-02.graphassets.com%2FAOvSBUTjQle5HZUNCXgSbz%2Fcmabtbog677or07ld378hk1oq&w=3840&q=75',
      title: 'Vista Principal del Hotel'
    },
    {
      url: 'https://www.elranchosalento.com/_next/image?url=https%3A%2F%2Fus-east-1-shared-usea1-02.graphassets.com%2FAOvSBUTjQle5HZUNCXgSbz%2Fcmabtbofp7nmw08lj5pk7limt&w=3840&q=75',
      title: 'Paisaje Cafetero'
    },
    {
      url: 'https://www.elranchosalento.com/_next/image?url=https%3A%2F%2Fus-east-1-shared-usea1-02.graphassets.com%2FAOvSBUTjQle5HZUNCXgSbz%2Fcmabtbog077om07lduohrqajw&w=3840&q=75',
      title: 'Ambiente Acogedor'
    },
    {
      url: 'https://www.elranchosalento.com/_next/image?url=https%3A%2F%2Fus-east-1-shared-usea1-02.graphassets.com%2FAOvSBUTjQle5HZUNCXgSbz%2Fcmabtbol06q6g07iqckxmxuig&w=3840&q=75',
      title: 'Habitaciones Confortables'
    }
  ];

  return (
    <section className="banner">
      <div className="banner-carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            el: '.swiper-pagination-custom',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom'
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          speed={1000}
          className="banner-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="slide-container">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="slide-image"
                />
                <div className="slide-overlay"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom navigation-btn">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-custom navigation-btn">
          <ChevronRight size={24} />
        </button>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom"></div>
      </div>

      {/* Banner Content */}
      <div className="banner-content">
        <div className="container">
          <div className="banner-text">
            <div className="location-badge">
              <MapPin size={16} />
              <span>Salento, Quindío, Colombia</span>
            </div>
            
            <h1 className="banner-title">
              Hospédate y explora con nosotros los lugares más 
              <span className="highlight"> emblemáticos</span> de nuestra 
              <span className="highlight"> cultura cafetera</span>
            </h1>
            
            <p className="banner-subtitle">
              Vive una experiencia única en el corazón del eje cafetero colombiano
            </p>
          </div>

          {/* Search Form */}
          <div className="search-form-container">
            <form className="search-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">
                    <Calendar size={16} />
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOut">
                    <Calendar size={16} />
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                    placeholder="dd/mm/aaaa"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guests">
                    <Users size={16} />
                    Huéspedes
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5+ personas</option>
                  </select>
                </div>

                <button type="submit" className="search-btn">
                  <span>Buscar</span>
                </button>
              </div>
            </form>
            
            <p className="search-note">
              ✨ Reserva ahora y disfruta de tarifas especiales
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;