const courseCatalog = [
  {
    id: 1,
    name: "Ace JEE Mastery",
    exam: "jee",
    budget: "medium",
    pace: "balanced",
    style: "video",
    price: "₹12,499",
    duration: "6 months",
    format: "Live + recorded",
    match: 96,
    summary:
      "Structured JEE prep with topic-wise mastery, AI practice feedback, and high-yield revision cycles.",
    tags: ["Physics", "Chemistry", "Maths", "Mock tests"]
  },
  {
    id: 2,
    name: "NEET Excellence Pro",
    exam: "neet",
    budget: "medium",
    pace: "balanced",
    style: "mentor",
    price: "₹14,999",
    duration: "8 months",
    format: "Mentor-led",
    match: 94,
    summary:
      "Guided medical-prep course for biology-heavy students who need strong concept retention and revision discipline.",
    tags: ["Biology", "Test series", "Mentor support", "NCERT focus"]
  },
  {
    id: 3,
    name: "UPSC Horizon",
    exam: "upsc",
    budget: "high",
    pace: "slow",
    style: "notes",
    price: "₹18,000",
    duration: "12 months",
    format: "Self-paced notes",
    match: 93,
    summary:
      "Ideal for long-form preparation with deep current affairs, essay practice, and conceptual learning.",
    tags: ["GS", "Essay", "Current affairs", "Revision"]
  },
  {
    id: 4,
    name: "English Edge IELTS",
    exam: "ielts",
    budget: "low",
    pace: "fast",
    style: "practice",
    price: "₹4,999",
    duration: "8 weeks",
    format: "Practice-driven",
    match: 91,
    summary:
      "Fast-track IELTS prep focusing on speaking confidence, writing templates, and exam-style drills.",
    tags: ["Speaking", "Listening", "Writing", "Band strategy"]
  },
  {
    id: 5,
    name: "AI Analyst Foundations",
    exam: "datascience",
    budget: "medium",
    pace: "balanced",
    style: "video",
    price: "₹9,500",
    duration: "10 weeks",
    format: "Project-based",
    match: 95,
    summary:
      "Covers statistics, Python, ML workflows, and portfolio projects that help learners transition into data roles.",
    tags: ["Python", "SQL", "ML", "Portfolio"]
  },
  {
    id: 6,
    name: "LaunchPad Code Career",
    exam: "software",
    budget: "low",
    pace: "fast",
    style: "practice",
    price: "₹6,900",
    duration: "12 weeks",
    format: "Coding bootcamp",
    match: 90,
    summary:
      "Designed for rapid upskilling with real-world coding assignments and interview problem sets.",
    tags: ["JavaScript", "DSA", "Projects", "Interviews"]
  },
  {
    id: 7,
    name: "Competitive Exam Starter",
    exam: "competitive",
    budget: "low",
    pace: "slow",
    style: "notes",
    price: "₹2,499",
    duration: "10 weeks",
    format: "Low-cost self-study",
    match: 88,
    summary:
      "A lightweight foundation course for students seeking a cost-effective strategy to begin exam prep.",
    tags: ["Foundation", "Revision", "Low cost", "Planning"]
  },
  {
    id: 8,
    name: "Elite Coaching Intensive",
    exam: "competitive",
    budget: "high",
    pace: "fast",
    style: "mentor",
    price: "₹21,999",
    duration: "5 months",
    format: "High-touch mentoring",
    match: 92,
    summary:
      "Intensive coaching for students who want strict routines, doubt-solving, and performance tracking.",
    tags: ["Mentoring", "Mock exams", "Rank strategy", "High accountability"]
  }
];

const recommendationContainer = document.getElementById("recommendations");
const summaryPill = document.getElementById("summary-pill");
const form = document.getElementById("course-form");

function getScore(course, { exam, budget, pace, style }) {
  let score = 0;

  if (exam === course.exam) score += 45;
  else if (exam === "competitive" && ["jee", "neet", "upsc"].includes(course.exam)) score += 28;

  if (budget === course.budget) score += 18;
  else if (budget === "low" && course.budget === "low") score += 12;
  else if (budget === "high" && course.budget === "medium") score += 8;

  if (pace === course.pace) score += 15;
  else if (pace === "fast" && course.pace === "balanced") score += 8;
  else if (pace === "slow" && course.pace === "balanced") score += 6;

  if (style === course.style) score += 12;
  else if (style === "video" && course.style === "video") score += 10;
  else if (style === "practice" && course.style === "practice") score += 10;

  if (course.exam === exam || course.exam === "competitive") score += 5;

  return Math.min(100, score + course.match);
}

function renderRecommendations(matches) {
  recommendationContainer.innerHTML = "";

  if (!matches.length) {
    recommendationContainer.innerHTML = `
      <div class="course-card">
        <h4>No direct match found</h4>
        <p>Try a more general exam focus or adjust your budget and study style.</p>
      </div>
    `;
    return;
  }

  matches.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-topline">
        <h4>${course.name}</h4>
        <span class="match-badge">${Math.round(course.score)}%</span>
      </div>
      <div class="meta">
        <span>${course.price}</span>
        <span>${course.duration}</span>
        <span>${course.format}</span>
      </div>
      <p>${course.summary}</p>
      <div class="tags">
        ${course.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    `;

    recommendationContainer.appendChild(card);
  });
}

function recommendCourses({ exam, budget, pace, style }) {
  const evaluated = courseCatalog
    .map((course) => ({
      ...course,
      score: getScore(course, { exam, budget, pace, style })
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  renderRecommendations(evaluated);

  const topScore = Math.round(evaluated[0]?.score ?? 0);
  summaryPill.textContent = `${topScore}% AI match`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  recommendCourses(values);
});

recommendCourses({ exam: "jee", budget: "medium", pace: "balanced", style: "video" });
