import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { events } from "./data/events";
import EventDetail from "./pages/EventDetail";

function HomePage() {
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.country.toLowerCase().includes(search.toLowerCase()) ||
    event.category.toLowerCase().includes(search.toLowerCase()) ||
    event.year.toString().includes(search)
  );

  const recentIds = JSON.parse(localStorage.getItem("recentEvents")) || [];

  const recentEvents = recentIds
    .map((id) => events.find((event) => event.id === id))
    .filter(Boolean);

  const timelineEvents = [...events]
    .sort((a, b) => a.year - b.year)
    .slice(0, 10);

  return (
    <div>
      <header className="hero">
        <nav className="navbar">
          <h2>HistoryScope</h2>
          <div>
            <a href="#timeline">Timeline</a>
            <a href="#events">Events</a>
            <a href="#footer">About</a>
          </div>
        </nav>

        <div className="hero-content">
          <span className="tag">Explore the past</span>
          <h1>Explore Humanity's Most Significant Moments</h1>
          <p>
            Discover major disasters, conflicts, discoveries and turning points
            that changed the course of history.
          </p>

          <input
            className="search"
            placeholder="Search events, countries or years..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <a href="#events" className="hero-button">
            Start Exploring
          </a>
        </div>
      </header>

      <section className="stats">
        <div>
          <h3>20+</h3>
          <p>Historical Events</p>
        </div>
        <div>
          <h3>100+</h3>
          <p>Years Covered</p>
        </div>
        <div>
          <h3>10+</h3>
          <p>Countries & Regions</p>
        </div>
      </section>

      <main className="container">
        {recentEvents.length > 0 && (
          <>
            <section className="section-title">
              <h2>Recently Viewed</h2>
              <p>Your recently visited historical events</p>
            </section>

            <div className="cards recent-cards">
              {recentEvents.map((event) => (
                <div className="card" key={event.id}>
                  <div className="image-box">
                    <img src={event.image} alt={event.title} />
                    <span className="year">{event.year}</span>
                  </div>

                  <div className="card-body">
                    <span className="category">{event.category}</span>
                    <h3>{event.title}</h3>
                    <p>{event.country}</p>

                    <Link to={`/event/${event.id}`} className="read-more">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <section className="timeline-section" id="timeline">
          <h2>Historical Timeline</h2>

          <div className="timeline">
            {timelineEvents.map((event) => (
              <div className="timeline-item" key={event.id}>
                <div className="timeline-year">{event.year}</div>
                <div className="timeline-content">
                  <h3>{event.title}</h3>
                  <p>{event.country}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-title" id="events">
          <h2>Featured Historical Events</h2>
          <p>{filteredEvents.length} event found</p>
        </section>

        <div className="cards">
          {filteredEvents.map((event) => (
            <div className="card" key={event.id}>
              <div className="image-box">
                <img src={event.image} alt={event.title} />
                <span className="year">{event.year}</span>
              </div>

              <div className="card-body">
                <span className="category">{event.category}</span>
                <h3>{event.title}</h3>
                <p>{event.country}</p>

                <Link to={`/event/${event.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer" id="footer">
        <h2>HistoryScope</h2>
        <p>Historical Events Explorer — Final Project</p>
        <span>© 2026</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event/:id" element={<EventDetail />} />
    </Routes>
  );
}

export default App;