import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { events } from "../data/events";

function EventDetail() {
  const { id } = useParams();
  const event = events.find((item) => item.id === Number(id));

  useEffect(() => {
    if (event) {
      const recentEvents =
        JSON.parse(localStorage.getItem("recentEvents")) || [];

      const updatedEvents = [
        event.id,
        ...recentEvents.filter((item) => item !== event.id),
      ].slice(0, 5);

      localStorage.setItem("recentEvents", JSON.stringify(updatedEvents));
    }
  }, [event]);

  if (!event) {
    return <h1>Event not found</h1>;
  }

  const similarEvents = events.filter(
    (item) => item.category === event.category && item.id !== event.id
  );

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to Home</Link>

      <img src={event.image} alt={event.title} className="detail-image" />

      <div className="detail-content">
        <span className="category">{event.category}</span>
        <h1>{event.title}</h1>

        <div className="detail-grid">
          <div>
            <h4>Year</h4>
            <p>{event.year}</p>
          </div>

          <div>
            <h4>Country</h4>
            <p>{event.country}</p>
          </div>

          <div>
            <h4>Location</h4>
            <p>{event.location || "Unknown"}</p>
          </div>

          <div>
            <h4>Casualties</h4>
            <p>{event.casualties || "Not specified"}</p>
          </div>
        </div>

        <h2>Overview</h2>
        <p className="detail-description">{event.description}</p>

        <h2>Historical Impact</h2>
        <p className="detail-description">{event.impact}</p>
      </div>

      {similarEvents.length > 0 && (
        <div className="similar-section">
          <h2>Similar Events</h2>

          <div className="similar-cards">
            {similarEvents.map((item) => (
              <Link
                to={`/event/${item.id}`}
                className="similar-card"
                key={item.id}
              >
                <img src={item.image} alt={item.title} />

                <div>
                  <span>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetail;