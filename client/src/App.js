import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "./App.css";

function App() {
  const [role, setRole] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [completedTopics, setCompletedTopics] = useState({});
  const roadmapRef = useRef();

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const generatePlan = async () => {
    if (!role.trim()) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/generate-plan", { role });
      setRoadmap(response.data.data);
      setCompletedTopics({});
    } catch (error) {
      alert("Error generating roadmap");
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = (phaseIndex, topicIndex) => {
    const key = `${phaseIndex}-${topicIndex}`;
    setCompletedTopics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const calculateProgress = () => {
    if (!roadmap) return 0;

    const totalTopics = roadmap.phases.reduce(
      (acc, phase) => acc + phase.topics.length,
      0
    );

    const completed = Object.values(completedTopics).filter(Boolean).length;

    return Math.round((completed / totalTopics) * 100);
  };

  const exportPDF = () => {
    const element = roadmapRef.current;
    html2pdf().from(element).save(`${roadmap.role}-roadmap.pdf`);
  };

  return (
    <div className="app">
      <div className="top-bar">
        <h1>🚀 AI Career Architect</h1>
        <button
          className="toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter career goal (e.g. AI Engineer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={generatePlan}>
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </div>

      {loading && <div className="loader"></div>}

      {roadmap && (
        <div className="card" ref={roadmapRef}>
          <h2>🎯 {roadmap.role}</h2>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {calculateProgress()}% Completed
          </p>

          {roadmap.phases.map((phase, pIndex) => (
            <div key={pIndex} className="phase">
              <h3>{phase.title}</h3>
              <ul>
                {phase.topics.map((topic, tIndex) => {
                  const key = `${pIndex}-${tIndex}`;
                  return (
                    <li key={tIndex}>
                      <label>
                        <input
                          type="checkbox"
                          checked={completedTopics[key] || false}
                          onChange={() => toggleTopic(pIndex, tIndex)}
                        />
                        {topic}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <button className="pdf-btn" onClick={exportPDF}>
            📄 Export as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;