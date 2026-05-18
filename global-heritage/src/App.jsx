import { useState, useEffect } from 'react';

export default function App() {
  const [explorersOnline, setExplorersOnline] = useState(12842);
  const [times, setTimes] = useState({});
  const [timezoneSet, setTimezoneSet] = useState(0);

  // Timezone sets to rotate through
  const timezoneSets = [
    [
      { city: 'LONDON', offset: 0, zone: 'GMT' },
      { city: 'CAIRO', offset: 2, zone: 'EET' },
      { city: 'ROME', offset: 1, zone: 'CET' }
    ],
    [
      { city: 'TOKYO', offset: 9, zone: 'JST' },
      { city: 'SYDNEY', offset: 10, zone: 'AEDT' },
      { city: 'DUBAI', offset: 4, zone: 'GST' }
    ],
    [
      { city: 'NEW YORK', offset: -5, zone: 'EST' },
      { city: 'LOS ANGELES', offset: -8, zone: 'PST' },
      { city: 'MEXICO CITY', offset: -6, zone: 'CST' }
    ],
    [
      { city: 'PARIS', offset: 1, zone: 'CET' },
      { city: 'ISTANBUL', offset: 3, zone: 'EAT' },
      { city: 'MOSCOW', offset: 3, zone: 'MSK' }
    ]
  ];

  // Update explorer count and times every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate explorer count changing (fluctuate around base with +/- random)
      setExplorersOnline(prev => {
        const change = Math.floor(Math.random() * 100) - 50; // -50 to +50
        const newCount = Math.max(10000, prev + change);
        return newCount;
      });

      // Update times
      const now = new Date();
      const currentSet = timezoneSets[timezoneSet];
      const updatedTimes = {};

      currentSet.forEach(tz => {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const localTime = new Date(utc + 3600000 * tz.offset);
        const hours = String(localTime.getHours()).padStart(2, '0');
        const minutes = String(localTime.getMinutes()).padStart(2, '0');
        updatedTimes[tz.city] = { time: `${hours}:${minutes}`, zone: tz.zone };
      });

      setTimes(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneSet, timezoneSets]);

  // Rotate timezone set every 30 seconds
  useEffect(() => {
    const timezoneRotation = setInterval(() => {
      setTimezoneSet(prev => (prev + 1) % timezoneSets.length);
    }, 30000);

    return () => clearInterval(timezoneRotation);
  }, []);

  const currentSet = timezoneSets[timezoneSet];

  return (
    <div>
      
      {/* --- HEADER --- */}
      <header className="header-container">
        <div className="nav-main">
          <div className="logo font-serif">Global Heritage</div>
          <nav className="nav-links font-mono">
            <a href="#explore" className="active">Explore</a>
            <a href="#continents">Continents</a>
            <a href="#gallery">Gallery</a>
            <a href="#saved">Saved</a>
            <a href="#about">About</a>
          </nav>
        </div>

        {/* Global Ticker Sub-bar */}
        <div className="ticker-bar font-mono">
          <div className="ticker-content">
            <div className="ticker-clocks">
              {currentSet.map(tz => (
                <span key={tz.city}>
                  {tz.city} <span>{times[tz.city]?.time || '--:--'} {times[tz.city]?.zone || tz.zone}</span>
                </span>
              ))}
            </div>
            <div className="ticker-status">
              <span className="icon-globe" aria-hidden="true">🌐</span> Global Explorers Online: {explorersOnline.toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tagline">The Cradle of Civilization</span>
          <h1 className="hero-title font-serif">Witness the Majesty of the Eternal Sands.</h1>
          <button className="btn-primary font-mono">
            Begin Journey <span className="icon-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* --- TRENDING MONUMENTS SECTION --- */}
      <section className="trending-section">
        <div className="trending-max">
          
          <div className="section-header">
            <div>
              <h2 className="font-serif">Trending Monuments</h2>
              <p>Explore the destinations capturing the imagination of historians and travelers worldwide this season.</p>
            </div>
          </div>

          <div className="trending-grid">
            {/* Main Featured */}
            <div className="featured-card">
              <img 
                src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80" 
                alt="Colosseum" 
              />
              <span className="card-meta font-mono">ROME, ITALY • BUILT 70-80 AD</span>
              <h3 className="card-title font-serif">The Flavian Amphitheatre</h3>
              <p className="card-text">
                Standing as a testament to Roman engineering, the Colosseum remains the largest ancient amphitheatre ever built, hosting spectacular gladiatorial contests that defined an empire.
              </p>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              <span className="sidebar-title font-mono">Discovery of the Week</span>
              <div className="mini-card">
                <img 
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80" 
                  alt="Taj Mahal" 
                />
                <h4 className="font-serif">Taj Mahal</h4>
                <p>A symmetrical masterpiece of Mughal architecture.</p>
                <a href="#explore" className="card-link font-mono">Explore Record →</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SPECIAL EXHIBITION --- */}
      <section className="exhibition-section">
        <div className="exhibition-grid">
          <div className="exhibition-img-container">
            <img 
              src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80" 
              alt="Petra" 
            />
          </div>
          <div className="exhibition-content">
            <span className="hero-tagline" style={{ letterSpacing: '0.25em' }}>Special Exhibition</span>
            <h2 className="exhibition-title font-serif">The Echoes of Petra: <br />A City Carved from Time</h2>
            <p className="exhibition-text">
              In the heart of the Jordanian desert lies a marvel of the ancient world. Known as the Rose City due to the color of the stone out of which it is carved, Petra stands as a symbol of resilience and artistic brilliance.
            </p>
            <p className="exhibition-text">
              Our latest digital chapter explores the Nabatean civilization's mastery of water management and trade, revealing how they transformed a barren canyon into a thriving metropolis.
            </p>
            <button className="btn-solid font-mono">Read Featured Chapter</button>
          </div>
        </div>
      </section>

      {/* --- CHRONOLOGY SECTION --- */}
      <section className="chronology-section">
        <h2 className="font-serif">Chronology of Civilization</h2>
        <div className="timeline-grid">
          <div className="timeline-item">
            <span className="year font-mono">2560 BC</span>
            <h4 className="font-serif">The Great Pyramid</h4>
            <p>Completed as a tomb for Pharaoh Khufu, remaining the tallest man-made structure for over 3,800 years.</p>
          </div>
          <div className="timeline-item">
            <span className="year font-mono">447 BC</span>
            <h4 className="font-serif">The Acropolis</h4>
            <p>The center of Athenian democracy and the site of the Parthenon, reflecting the pinnacle of Greek Classical art.</p>
          </div>
          <div className="timeline-item">
            <span className="year font-mono">1450 AD</span>
            <h4 className="font-serif">Machu Picchu</h4>
            <p>The legendary Incan citadel set high in the Andes Mountains of Peru, an architectural marvel of dry-stone walls.</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="font-serif">Global Heritage</h3>
            <p>
              © 2026 Global Heritage. Preserving history through modern discovery. We are a digital archive dedicated to the immersive exploration of humanity's greatest achievements.
            </p>
          </div>
          <div className="footer-col">
            <h4>Discover</h4>
            <ul>
              <li><a href="#europe">Europe</a></li>
              <li><a href="#asia">Asia & Pacific</a></li>
              <li><a href="#americas">Americas</a></li>
              <li><a href="#africa">Africa & Middle East</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Organization</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#accessibility">Accessibility</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom font-mono">
          <div>Designed with veneration for the past.</div>
          <div>Data Feed Sync: Operational</div>
        </div>
      </footer>

    </div>
  );
}