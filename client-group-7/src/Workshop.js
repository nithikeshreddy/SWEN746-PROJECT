import React, { useState } from 'react';

const Workshop = () => {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: 'Sushi Making Workshop',
      description: 'Learn the art of sushi making from a professional chef.',
      location: 'Room A, Culinary Building',
      time: '10:00 AM - 12:00 PM, Dec 10th',
      tools: 'Sushi mat, Knife, Ingredients (provided)',
      registered: false,
    },
    {
      id: 2,
      title: 'Italian Pasta Cooking',
      description: 'Master the techniques of authentic Italian pasta making.',
      location: 'Room B, Culinary Building',
      time: '2:00 PM - 4:00 PM, Dec 12th',
      tools: 'Rolling pin, Pasta cutter, Ingredients (provided)',
      registered: false,
    },
  ]);

  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    description: '',
    location: '',
    time: '',
    tools: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkshop((prevWorkshop) => ({ ...prevWorkshop, [name]: value }));
  };

  const handleAddWorkshop = () => {
    if (!newWorkshop.title || !newWorkshop.description || !newWorkshop.location || !newWorkshop.time || !newWorkshop.tools) {
      alert('Please fill out all fields.');
      return;
    }

    setWorkshops((prevWorkshops) => [
      ...prevWorkshops,
      { ...newWorkshop, id: Date.now(), registered: false },
    ]);
    setNewWorkshop({ title: '', description: '', location: '', time: '', tools: '' });
  };

  const handleRegister = (id) => {
    setWorkshops((prevWorkshops) =>
      prevWorkshops.map((workshop) =>
        workshop.id === id
          ? { ...workshop, registered: !workshop.registered }
          : workshop
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Workshops</h1>
      <p style={styles.subtitle}>Explore and register for available workshops.</p>
      <div style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Workshop Title"
          value={newWorkshop.title}
          onChange={handleInputChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newWorkshop.description}
          onChange={handleInputChange}
          style={styles.textarea}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newWorkshop.location}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="time"
          placeholder="Time"
          value={newWorkshop.time}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="tools"
          placeholder="Tools (comma-separated)"
          value={newWorkshop.tools}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={handleAddWorkshop} style={styles.addButton}>
          Add Workshop
        </button>
      </div>
      <div style={styles.grid}>
        {workshops.map((workshop) => (
          <div key={workshop.id} style={styles.card}>
            <h2 style={styles.cardTitle}>{workshop.title}</h2>
            <p style={styles.cardDescription}>{workshop.description}</p>
            <p style={styles.cardDetail}>
              <strong>Location:</strong> {workshop.location}
            </p>
            <p style={styles.cardDetail}>
              <strong>Time:</strong> {workshop.time}
            </p>
            <p style={styles.cardDetail}>
              <strong>Tools/Ingredients:</strong>
              <ul style={styles.list}>
                {String(workshop.tools).split(',').map((tool, index) => (
                  <li key={index}>{tool.trim()}</li>
                ))}
              </ul>
            </p>
            <button
              style={{
                ...styles.button,
                backgroundColor: workshop.registered ? '#ff0000' : '#28a745',
              }}
              onClick={() => handleRegister(workshop.id)}
            >
              {workshop.registered ? 'Unregister' : 'Register'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  title: { fontSize: '28px', marginBottom: '10px' },
  subtitle: { fontSize: '18px', marginBottom: '20px', color: '#555' },
  form: { marginBottom: '30px', textAlign: 'center' },
  input: {
    width: '80%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '80%',
    height: '60px',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#ff5900',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  cardTitle: { fontSize: '20px', marginBottom: '10px', color: '#ff5900' },
  cardDescription: { fontSize: '16px', marginBottom: '10px', color: '#333' },
  cardDetail: { fontSize: '14px', marginBottom: '8px', color: '#555' },
  list: { margin: '5px 0 0 20px' },
  button: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Workshop;
