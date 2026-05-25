// Portfolio data — edit any of this freely; the UI reads from these constants.
window.PORTFOLIO = {
  name: "Vinay Yalamarthi Setty",
  role: "AI, Blockchain & Full-Stack Engineer",
  tagline: "Specializing in AI/ML, GenAI, Blockchain, and full-stack development, building decentralized platforms, smart contracts, and intelligent systems",
  location: "Visakhapatnam, India",

  about: [
    "I’m a Computer Science graduate from Vellore Institute of Technology, specializing in AI/ML, GenAI, Blockchain, and full-stack development. I have experience building decentralized applications, Ethereum smart contracts, scalable intelligent systems using LLMs, and real-time data pipelines.",
    "Passionate about solving real-world problems through rapid prototyping, automation, and human-centered AI solutions. I focus on bridging the gap between sophisticated ML/Web3 backends and intuitive, high-performance user interfaces."
  ],

  skills: [
    "Python", "Java", "JavaScript", "SQL", "Solidity",
    "LangChain", "LangGraph", "RAG", "Prompt Engineering", "NLP", 
    "TensorFlow", "PyTorch", "Scikit-learn",
    "React.js", "Next.js", "FastAPI", "Node.js", "REST APIs", "Web3.js", "Hardhat",
    "MySQL", "PostgreSQL", "Firebase", "Vector Databases", "Drizzle ORM",
    "Git", "GitHub", "Postman", "Streamlit", "Microsoft Defender for Cloud",
    "Data Structures & Algorithms", "OOPs", "DBMS", "System Design", "API Integration", "Blockchain", "Ethereum"
  ],

  languages: [
    { lang: "English", level: "Fluent" },
    { lang: "Telugu", level: "Native" },
    { lang: "Hindi", level: "Conversational" }
  ],

  experience: [
    {
      company: "Bioscreen Technologies Pvt. Ltd.",
      role: "Software Engineering Intern",
      start: "June 2025",
      end: "July 2025",
      certUrl: "", // Add drive link if available
      stack: ["React.js", "SQL", "REST APIs", "Agile Workflows"],
      bullets: [
        "Developed and optimized reusable React components for healthcare screening dashboards, improving UI consistency and enhancing real-time data visualization workflows.",
        "Integrated REST APIs and handled backend data operations using SQL queries to ensure reliable data synchronization and efficient retrieval across healthcare management systems.",
        "Collaborated in debugging, testing, and feature discussions within agile development workflows, contributing to faster issue resolution and smoother product iterations."
      ]
    }
  ],

  education: [
    {
      school: "Vellore Institute of Technology, Vellore",
      degree: "Bachelor of Technology in Computer Science",
      years: "2022 — 2026",
      detail: "CGPA 8.7",
      pdfUrl: ""
    },
    {
      school: "Sri Chaitanya Junior College",
      degree: "Pre-University Course (Intermediate)",
      years: "2020 — 2022",
      detail: "Aggregate 94% · Vijayawada, Andhra Pradesh",
      pdfUrl: ""
    },
    {
      school: "Dr.K.K.R’s Gowtham International School",
      degree: "Secondary School Certificate (SSC)",
      years: "2019 — 2020",
      detail: "Percentage 100% · Vijayawada, Andhra Pradesh",
      pdfUrl: ""
    }
  ],

  certifications: [
    { name: "Microsoft Azure AI Fundamentals (AI-900)", issuer: "Microsoft", year: "2025", valid: "Lifetime", pdfUrl: "" },
    { name: "OCI AI Foundations Associate", issuer: "Oracle Cloud Infrastructure", year: "2025", valid: "Lifetime", pdfUrl: "" }
  ],

  featured: [
    {
      title: "FitToken",
      year: "2026",
      sponsor: "Crypto-Fitness Incentive Platform",
      blurb: "A decentralized application enabling automated fitness rewards, tracking activity for 100+ simulated users and distributing tokens securely.",
      bullets: [
        "Engineered a decentralized application enabling automated fitness rewards, tracking activity for 100+ simulated users.",
        "Developed and deployed Ethereum smart contracts in Solidity to automate token distribution, ensuring 100% accuracy in reward allocation.",
        "Integrated blockchain backend with React frontend using Web3.js, enabling real-time reward updates and improving simulated engagement metrics."
      ],
      stack: ["Solidity", "Hardhat", "Web3.js", "Node.js", "React", "Ethereum", "Blockchain"]
    },
    {
      title: "TARA",
      year: "2025",
      sponsor: "Threat Analysis and Response Assistant",
      blurb: "An AI-powered cloud security investigation copilot for analyzing Microsoft Defender for Cloud alerts using conversational workflows.",
      bullets: [
        "Designed HITL investigation pipelines and RAG workflows for AI-assisted security analysis and contextual retrieval.",
        "Developed scalable investigation workflows with conversational querying and Jira-based incident tracking.",
        "Implemented vector databases and complex agent state transitions using LangGraph and FastAPI."
      ],
      stack: ["Python", "LangGraph", "FastAPI", "React", "Vector Databases"]
    },
    {
      title: "AI Mock Interview App",
      year: "2025",
      sponsor: "GenAI interview platform",
      blurb: "A full-stack GenAI interview platform with role-based interview simulation and AI-generated feedback.",
      bullets: [
        "Integrated speech-to-text and webcam APIs for real-time interview interaction and response analysis.",
        "Implemented Firebase authentication and responsive UI for seamless user experience.",
        "Optimized prompt contexts dynamically to customize mock interviews based on target roles."
      ],
      stack: ["React", "TypeScript", "Gemini API", "Firebase"]
    },
    {
      title: "Biomedical QA System",
      year: "2025",
      sponsor: "RAG vs Fine-Tuned LLM Evaluation",
      blurb: "A framework to compare RAG and fine-tuned LLMs for biomedical question answering.",
      bullets: [
        "Developed a framework to compare RAG and fine-tuned LLMs for biomedical question answering.",
        "Built a knowledge base using biomedical research papers from the CORD-19 dataset.",
        "Implemented LangChain-based RAG pipelines for context-aware biomedical response generation."
      ],
      stack: ["Python", "LangChain", "OpenAI API", "Mistral-7B"]
    }
  ],

  projects: [
    {
      title: "ProLingo",
      year: "2026",
      blurb: "SaaS gamified learning platform built with Next.js 14 and Drizzle ORM. Features progress dashboards, save/resume flows, badges, Clerk auth, and Stripe payments.",
      stack: ["Next.js 14", "React", "Tailwind CSS", "ShadCN UI", "PostgreSQL", "Drizzle ORM", "Clerk", "Stripe"]
    },
    {
      title: "Personal Expense Tracker",
      year: "2025",
      blurb: "Persistent financial tracker built using vanilla JavaScript and LocalStorage. Integrates Chart.js for real-time data visualization and supports CSV exports.",
      stack: ["JavaScript", "LocalStorage", "Chart.js", "CSV Export"]
    },
    {
      title: "Caterpillar Challenge System",
      year: "2025",
      blurb: "Developed a prototype for Caterpillar's technology challenge, centering on AI optimization and predictive metrics. Reached the final stage.",
      stack: ["Python", "Scikit-learn", "Streamlit"]
    },
    {
      title: "Centific Hackathon Agent",
      year: "2025",
      blurb: "Built an intelligent automated task flow agent utilizing Gemini APIs and LangChain during the Centific Hackathon.",
      stack: ["Gemini API", "LangChain", "Python"]
    },
    {
      title: "SQL Patient Data Sync",
      year: "2025",
      blurb: "A real-time data sync pipeline built to synchronize client/patient medical records across medical databases during Bioscreen internship.",
      stack: ["Python", "SQL", "REST APIs"]
    }
  ],

  courses: [
    { name: "Caterpillar Tech Challenge 2025 Finalist", by: "Caterpillar", tag: "Hackathon", year: "2025", pdfUrl: "" },
    { name: "Centific Hackathon Finalist", by: "Centific", tag: "Hackathon", year: "2025", pdfUrl: "" },
    { name: "IEEE Computer Society Membership", by: "IEEE - VIT Chapter", tag: "Leadership", year: "2025", pdfUrl: "" },
    { name: "Entrepreneurship Cell (VIT) Membership", by: "E-Cell - VIT", tag: "Leadership", year: "2025", pdfUrl: "" }
  ],

  contact: {
    email: "vinayyalamarthi77@gmail.com",
    phone: "8148146952",
    linkedin: "linkedin.com/in/vinay-yalamarthi-asitisnowhere",
    linkedinUrl: "https://www.linkedin.com/in/vinay-yalamarthi-asitisnowhere/",
    github: "github.com/YALAMARTHI-VINAY",
    githubUrl: "https://github.com/YALAMARTHI-VINAY"
  }
};
