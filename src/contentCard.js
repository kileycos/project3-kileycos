import { useState, useEffect } from 'react';
import './styles.css';

function useRepoDetails(repoFullName, enabled) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !repoFullName) return;
    setLoading(true);
    Promise.all([
      fetch(`https://api.github.com/repos/${repoFullName}/contributors`).then(r => r.json()),
      fetch(`https://api.github.com/repos/${repoFullName}/releases`).then(r => r.json()),
      fetch(`https://api.github.com/repos/${repoFullName}/tags`).then(r => r.json()),
    ]).then(([contributors, releases, tags]) => {
      setDetails({ contributors, releases, tags });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [enabled, repoFullName]);

  return { details, loading };
}

export default function ContentCard({ title, description, imageUrl, images, href, language, contributed, repoFullName, stars, watchers, openIssues, year, size, medium, statement }) {
  const [flipped, setFlipped] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const { details, loading } = useRepoDetails(repoFullName, flipped);

  const gallery = images?.length > 0 ? images : (imageUrl ? [imageUrl] : []);
  const hasGallery = gallery.length > 1;

  const handleDot = (e, idx) => { e.stopPropagation(); setActiveImg(idx); };
  const handleArrow = (e, dir) => {
    e.stopPropagation();
    setActiveImg(i => (i + dir + gallery.length) % gallery.length);
  };
  const openLightbox = (e) => { e.stopPropagation(); setLightbox(true); };
  const closeLightbox = (e) => { e.stopPropagation(); setLightbox(false); };

  const toggleSection = (e, section) => {
    e.stopPropagation();
    setOpenSection(prev => prev === section ? null : section);
  };

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          {hasGallery && (
            <button className="lightbox-arrow left" onClick={e => {
              e.stopPropagation();
              setActiveImg(i => (i - 1 + gallery.length) % gallery.length);
            }}>‹</button>
          )}
          <img
            src={gallery[activeImg]}
            alt={title}
            className="lightbox-img"
            onClick={e => e.stopPropagation()}
          />
          {hasGallery && (
            <button className="lightbox-arrow right" onClick={e => {
              e.stopPropagation();
              setActiveImg(i => (i + 1) % gallery.length);
            }}>›</button>
          )}
        </div>
      )}

      {/* Card */}
      <div className={`card-flip ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(p => !p)}>
        <div className="card-inner">

          <div className="card-front">
            {gallery.length > 0 ? (
              <div className="card-gallery">
                <img
                  src={gallery[activeImg]}
                  alt={`${title} ${activeImg + 1}`}
                  onClick={openLightbox}
                  style={{ cursor: 'zoom-in' }}
                />
                {hasGallery && (
                  <>
                    <button className="gallery-arrow left" onClick={e => handleArrow(e, -1)}>‹</button>
                    <button className="gallery-arrow right" onClick={e => handleArrow(e, 1)}>›</button>
                    <div className="gallery-dots">
                      {gallery.map((_, i) => (
                        <span
                          key={i}
                          className={`gallery-dot ${i === activeImg ? 'active' : ''}`}
                          onClick={e => handleDot(e, i)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="card-front-placeholder" />
            )}
            <div className="front-label">
              <h3>{title}</h3>
              <span>Click to explore</span>
            </div>
          </div>

          <div className="card-back">

            {/* Overview */}
            <div className="accordion-item">
              <button className="accordion-header" onClick={e => toggleSection(e, 'overview')}>
                Overview
                <span className={`accordion-arrow ${openSection === 'overview' ? 'open' : ''}`}>›</span>
              </button>
              {openSection === 'overview' && (
                <div className="accordion-body">
                  <p><span className="acc-label">Title</span>{title}</p>
                  {year && <p><span className="acc-label">Year</span>{year}</p>}
                  {size && <p><span className="acc-label">Size</span>{size}</p>}
                </div>
              )}
            </div>

            {/* Medium */}
            {medium && (
              <div className="accordion-item">
                <button className="accordion-header" onClick={e => toggleSection(e, 'medium')}>
                  Medium
                  <span className={`accordion-arrow ${openSection === 'medium' ? 'open' : ''}`}>›</span>
                </button>
                {openSection === 'medium' && (
                  <div className="accordion-body">
                    <p>{medium}</p>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="accordion-item">
                <button className="accordion-header" onClick={e => toggleSection(e, 'description')}>
                  Description
                  <span className={`accordion-arrow ${openSection === 'description' ? 'open' : ''}`}>›</span>
                </button>
                {openSection === 'description' && (
                  <div className="accordion-body">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            )}

            {/* Statement */}
            {statement && (
              <div className="accordion-item">
                <button className="accordion-header" onClick={e => toggleSection(e, 'statement')}>
                  Artist Statement
                  <span className={`accordion-arrow ${openSection === 'statement' ? 'open' : ''}`}>›</span>
                </button>
                {openSection === 'statement' && (
                  <div className="accordion-body">
                    <p>{statement}</p>
                  </div>
                )}
              </div>
            )}

            {/* GitHub stats — only shows if repoFullName is passed, so art cards won't see this */}
            {repoFullName && (
              <>
                <div className="card-badges">
                  {language && <span className="lang-badge">{language}</span>}
                  {contributed && <span className="lang-badge contributor-badge">Contributor</span>}
                </div>
                <div className="repo-stats">
                  {stars > 0 && <span>★ {stars}</span>}
                  {watchers > 0 && <span>👁 {watchers}</span>}
                  {openIssues > 0 && <span>⚠ {openIssues} issues</span>}
                </div>
                {loading && <p className="details-loading">Loading details…</p>}
                {details && (
                  <div className="repo-details">
                    {details.contributors?.length > 0 && (
                      <div className="detail-section">
                        <span className="detail-label">Contributors</span>
                        <div className="contributor-list">
                          {details.contributors.slice(0, 5).map(c => (
                            <a key={c.id} href={c.html_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                              <img src={c.avatar_url} alt={c.login} title={c.login} className="contributor-avatar" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {details.releases?.length > 0 && (
                      <div className="detail-section">
                        <span className="detail-label">Latest release</span>
                        <a href={details.releases[0].html_url} target="_blank" rel="noreferrer"
                          className="detail-link" onClick={e => e.stopPropagation()}>
                          {details.releases[0].tag_name}
                        </a>
                      </div>
                    )}
                    {details.releases?.length === 0 && details.tags?.length > 0 && (
                      <div className="detail-section">
                        <span className="detail-label">Latest tag</span>
                        <span className="lang-badge">{details.tags[0].name}</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {href && (
              <a className="learn-btn" href={href} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}>
                View on GitHub
              </a>
            )}

          </div>

        </div>
      </div>
    </>
  );
}