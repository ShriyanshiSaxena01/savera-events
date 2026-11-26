import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { galleryItems } from '../data/gallery';

const filterOptions = ['All', 'Weddings', 'Corporate', 'Social Gatherings', 'Private Events', 'Videos'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return galleryItems;
    if (activeFilter === 'Videos') return galleryItems.filter((item) => item.type === 'video');
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!selectedItem) return;
      if (event.key === 'Escape') setSelectedItem(null);
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'ArrowLeft') showPrevious();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem, currentIndex]);

  const showNext = () => {
    if (!filteredItems.length) return;
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    setSelectedItem(filteredItems[(currentIndex + 1) % filteredItems.length]);
  };

  const showPrevious = () => {
    if (!filteredItems.length) return;
    const nextIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(filteredItems[nextIndex]);
  };

  const openItem = (item, index) => {
    setCurrentIndex(index);
    setSelectedItem(item);
  };

  return (
    <main className="page-shell page-section">
      <section className="container gallery-intro">
        <p className="eyebrow">PORTFOLIO</p>
        <h1>Moments Worth Remembering</h1>
        <p>A glimpse into celebrations filled with beauty, joy, and unforgettable details.</p>
      </section>

      <section className="container gallery-wrap">
        <div className="filter-row">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={activeFilter === option ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <button key={item.id} type="button" className="gallery-item" onClick={() => openItem(item, index)}>
              {item.type === 'video' ? (
                <video src={item.video} poster={item.image} muted playsInline />
              ) : (
                <img src={item.image} alt={item.title} />
              )}
              <div className="gallery-meta">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <small>{item.date}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="container cta-center gallery-cta">
        <p>Love What You See? Let’s Plan Yours.</p>
        <Link to="/plan-your-event" className="button button-primary">PLAN YOUR EVENT</Link>
      </section>

      {selectedItem && (
        <div className="lightbox" onClick={() => setSelectedItem(null)}>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setSelectedItem(null)} aria-label="Close gallery view">
              <X size={20} />
            </button>
            <button type="button" className="lightbox-nav prev" onClick={showPrevious} aria-label="Previous item">
              <ArrowLeft size={18} />
            </button>
            <button type="button" className="lightbox-nav next" onClick={showNext} aria-label="Next item">
              <ArrowRight size={18} />
            </button>

            {selectedItem.type === 'video' ? (
              <video controls autoPlay src={selectedItem.video} poster={selectedItem.image} />
            ) : (
              <img src={selectedItem.image} alt={selectedItem.title} />
            )}

            <div className="lightbox-caption">
              <span>{selectedItem.category}</span>
              <h3>{selectedItem.title}</h3>
              <small>{selectedItem.date}</small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
