# 🚀 AI Career Architect

AI Career Architect is a full-stack AI-powered web application that generates personalized, multi-phase learning roadmaps for any career goal. The system integrates Groq AI with a modern React frontend to dynamically create structured development plans. It includes real-time skill tracking, automatic progress calculation, dark/light mode support, and PDF export functionality.

This project demonstrates advanced AI API integration, full-stack development, state management, and SaaS-level UI design.

---

## 🌟 Features

- 🎯 AI-generated multi-phase career roadmap
- 📊 Real-time skill tracking with completion percentage
- 📈 Dynamic animated progress bar
- 🌙 Dark / Light mode toggle
- 📄 Export roadmap as downloadable PDF
- 💎 Modern glassmorphism SaaS UI
- ⚡ REST API backend with structured JSON responses
- 🔐 Environment variable security
- 🧠 Intelligent AI response cleaning & JSON parsing

---

## 🏗 Tech Stack

### Frontend
- React.js
- Axios
- html2pdf.js
- Custom CSS (Modern UI Design)

### Backend
- Node.js
- Express.js
- Groq AI API
- dotenv
- CORS

---

## 📂 Project Structure

ai-learning-roadmap-generator/
│
├── client/               # React Frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│
├── server/               # Node + Express Backend
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│
└── README.md

---

## ⚠ Important Notice

The `node_modules` folders are NOT included in this repository.

They are excluded because:
- They are automatically generated
- They are large in size
- They can be recreated using `npm install`

After cloning the repository, you must install dependencies manually.

---

## 🛠 Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/your-username/ai-learning-roadmap-generator.git
cd ai-learning-roadmap-generator

---

### 2️⃣ Install Backend Dependencies

cd server
npm install

---

### 3️⃣ Install Frontend Dependencies

cd ../client
npm install

---

### 4️⃣ Configure Environment Variables

Inside the `server` folder, create a `.env` file:

PORT=5000
OPENAI_API_KEY=your_groq_api_key_here
MODEL=llama3-70b-8192

⚠ Never commit `.env` to GitHub.

---

### 5️⃣ Run Application

Start backend:

cd server
npm run dev

Start frontend:

cd client
npm start

Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5000

---

## 🔄 Application Flow

1. User enters a career goal (e.g., "AI Engineer").
2. Frontend sends a POST request to backend API.
3. Backend calls Groq AI model.
4. AI generates structured JSON roadmap.
5. Backend cleans markdown formatting.
6. JSON response is parsed and returned.
7. Frontend renders roadmap with skill tracking and progress.
8. User can export roadmap as PDF.

---

## 📄 API Endpoint

POST /api/generate-plan

Request Body:

{
  "role": "AI Engineer"
}

Response:

{
  "success": true,
  "data": {
    "role": "AI Engineer",
    "phases": [...]
  }
}

---

## 📈 What This Project Demonstrates

- Full-stack architecture
- AI API integration
- Secure environment configuration
- Dynamic React state management
- Professional SaaS UI design
- JSON parsing & error handling
- Feature-rich user interaction

This project is suitable for:
- Full-stack portfolios
- AI internship applications
- React developer showcases
- Backend API integration demonstrations

---

## 🚀 Future Improvements

- 🔐 Authentication system
- ☁ MongoDB integration
- 📊 Analytics dashboard
- 🏅 Gamification (badges & streaks)
- 🌐 Cloud deployment
- 📱 Fully responsive mobile version

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed as a full-stack AI integration project demonstrating modern web development and AI-powered automation.

⭐ If you found this useful, consider starring the repository.
