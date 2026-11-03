export interface ProjectItem {
  id: string;
  title: string;
  categoryTag?: string;
  summary?: string;
  description?: string;
  problem?: string;
  stack?: string[];
  role?: string;
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  category?: "Web" | "AI" | "Tools";
}

export interface CertificationItem {
  id: string;
  order: number;
  title: string;
  category: string;
  issuer: string;
  skillsCovered: string[];
  verifyUrl?: string;
}

export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  location: string;
  grade?: string;
  period: string;
  status?: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  iconName: "Code2" | "Globe" | "Database" | "Wrench" | "Cpu" | "Users";
  description: string;
  skills: { name: string; proficiency?: string }[];
}

export interface HackathonItem {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  focusAreas: string[];
  role: string;
  badge: string;
}

export interface HobbyItem {
  title: string;
  subtitle: string;
  description: string;
  iconName: "Trophy" | "Gamepad2";
  highlights: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    titles: string[];
    tagline: string;
    bio: string[];
    location: string;
    institution: string;
    email: string;
    collegeEmail: string;
    linkedinUrl: string;
    githubUrl: string;
    resumeUrl: string;
    declaration: string;
    avatarUrl: string;
  };
  stats: {
    degree: string;
    degreeSub: string;
    projectCount: number;
    projectLabel: string;
    certCount: number;
    certLabel: string;
    hackathonCount: number;
    hackathonLabel: string;
  };
  projects: ProjectItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  hackathons: HackathonItem[];
  hobbies: HobbyItem[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Prathamesh Patil",
    titles: ["Computer Science Engineer", "Web Developer"],
    tagline:
      "Detail-oriented engineer building clean, high-performance web experiences. Passionate about software architecture, modern frameworks, and intuitive digital solutions.",
    bio: [
      "I am a Computer Science Engineering student currently pursuing my B.Tech at Rajarambapu Institute of Technology (RIT), Sakhrale. With hands-on experience developing web applications and software solutions, I thrive at the intersection of robust backend logic and responsive frontend architecture.",
      "My journey in computer science is driven by curiosity and a discipline for clean, maintainable systems. From architecting algorithmic visualizers and smart IoT bike detection mechanisms to exploring semiconductor fundamentals and modern React ecosystems, I bring high rigor and problem-solving tenacity to every technical challenge.",
      "When I'm not writing code or debugging algorithmic logic, you'll find me competing in hackathons, sharpening my strategic thinking on the cricket pitch, or immersing myself in multiplayer gaming.",
    ],
    location: "Sangli, Maharashtra",
    institution: "Rajarambapu Institute of Technology",
    email: "pp9603395@gmail.com",
    collegeEmail: "2403082@ritindia.edu",
    linkedinUrl: "https://www.linkedin.com/in/prathamesh-patil-900190336/",
    githubUrl: "https://github.com/pp9603395-max",
    resumeUrl: "/resume.pdf",
    declaration:
      "I hereby declare that all the details mentioned above are in the accordance with the truth and fact as per my knowledge and I hold the responsibility for the correctness of the above mentioned particulars.",
    avatarUrl: "/images/prathamesh.png",
  },
  stats: {
    degree: "B.Tech",
    degreeSub: "Computer Science & Engineering",
    projectCount: 5,
    projectLabel: "Featured Projects",
    certCount: 4,
    certLabel: "Certifications & Courses",
    hackathonCount: 3,
    hackathonLabel: "Hackathons & Competitions",
  },
  projects: [
    {
      id: "krushitech",
      title: "KrushiTech",
      category: "Web",
      categoryTag: "Web / AI / Agriculture",
      summary:
        "A web app that scans leaf images to predict crop disease and generates a health report with recommendations.",
      description:
        "Farmers upload a leaf photo and get a disease or health prediction. The app then produces a health report with recommendations. The model reached 98% accuracy after training in Google Colab.",
      stack: ["React.js", "FastAPI", "PyTorch", "OpenCV", "Git"],
    },
    {
      id: "smart-bike",
      title: "Smart Bike Detection System",
      category: "Tools",
      categoryTag: "IoT / Python / Detection",
      summary:
        "An intelligent vehicle monitoring system that uses image processing and sensor-based detection to identify and track bikes in real time.",
      description:
        "The system is designed for smart city and campus security applications and raises automated alerts when it detects activity.",
      stack: ["Python", "OpenCV", "Image Processing", "IoT"],
    },
    {
      id: "dsa-visualizer",
      title: "DSA Visualizer",
      category: "Tools",
      categoryTag: "Algorithms / Web",
      summary:
        "An interactive app that animates sorting, searching, graph, and data structure algorithms step by step.",
      description:
        "The app records each comparison or swap and replays the steps on a timer, so learners can watch each change happen live.",
      stack: ["React.js", "JavaScript", "Tailwind CSS"],
    },
    {
      id: "kannada-for-everyone",
      title: "Kannada for Everyone",
      category: "Web",
      categoryTag: "Web / AI / EdTech",
      summary:
        "A gamified platform for learning everyday Kannada, with 10 lessons, quizzes, pronunciation drills, and AI roleplay.",
      description:
        "Built for the Kannada Digital Innovation Challenge 2026. Progress is tracked with XP, levels, daily quests, achievements, and a printable certificate.",
      stack: ["React", "Firebase", "Express", "Google Gemini"],
    },
    {
      id: "flowsight-ai",
      title: "FlowSight AI",
      category: "AI",
      categoryTag: "AI / Smart Cities",
      summary:
        "AI-assisted drain monitoring and early flood warning for urban stormwater networks, with a risk score from 1.0 to 10.0.",
      description:
        "Monitors drainage channels, detects waste and silt, issues flood hazard alerts, and checks cleanings with before-and-after risk scoring.",
      stack: ["React", "TypeScript", "FastAPI", "Google Gemini"],
    },
  ],
  certifications: [
    {
      id: "cert-1-java",
      order: 1,
      title: "Java for OOPs and Database Concepts",
      category: "Software Engineering & Database Architecture",
      issuer: "Technical Coursework",
      skillsCovered: [
        "Object-Oriented Programming (OOP)",
        "Inheritance & Polymorphism",
        "Relational Schemas",
        "SQL Queries",
      ],
    },
    {
      id: "cert-2-react",
      order: 2,
      title: "React JS for Frontend Development",
      category: "Web Engineering & Modern UI",
      issuer: "Frontend Development Program",
      skillsCovered: [
        "React Architecture",
        "Hooks & State Management",
        "Component Lifecycle",
        "Responsive Layouts",
      ],
    },
    {
      id: "cert-3-semiconductors",
      order: 3,
      title: "Introduction to Semiconductors",
      category: "Hardware & VLSI Fundamentals",
      issuer: "Hardware Foundations Course",
      skillsCovered: [
        "Semiconductor Physics",
        "Doping & Bandgap",
        "PN Junction Mechanics",
        "Digital Logic Gates",
      ],
    },
    {
      id: "cert-4-data-analytics",
      order: 4,
      title: "Data Analytics Job Simulation",
      category: "Data Analysis & Business Intelligence",
      issuer: "Job Simulation Program",
      skillsCovered: [
        "Data Modeling",
        "Exploratory Data Analysis",
        "Insight Visualization",
        "Reporting Dashboards",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      field: "Computer Science & Engineering",
      institution: "Rajarambapu Institute of Technology (RIT)",
      location: "Sakhrale, Sangli, Maharashtra",
      status: "Pursuing",
      period: "2024 – Present",
      description:
        "Comprehensive engineering curriculum encompassing core data structures, algorithms, object-oriented design, operating systems, database management systems, and modern web application development.",
      highlights: [
        "Core CS Foundations & Algorithms",
        "Full-Stack Web Development Projects",
        "Active Participant in Hackathons & Tech Quizzes",
      ],
    },
    {
      degree: "Higher Secondary Certificate (HSC - 12th)",
      field: "Science Stream",
      institution: "Vidyamandir Junior College",
      location: "Islampur, Sangli, Maharashtra",
      grade: "First Class · 73.33%",
      period: "Completed February 2024",
      description:
        "Rigorous science coursework in Physics, Chemistry, Mathematics, and Computer Science fundamentals, establishing strong quantitative reasoning.",
      highlights: [
        "First Class Distinction (73.33%)",
        "Strong Analytical & Mathematical Aptitude",
        "Physics & Chemistry Laboratory Foundations",
      ],
    },
    {
      degree: "Secondary School Certificate (SSC - 10th)",
      institution: "Islampur High School",
      location: "Islampur, Sangli, Maharashtra",
      grade: "First Class with Distinction · 79.80%",
      period: "Completed March 2022",
      description:
        "Strong academic performance with distinction across science, mathematics, languages, and general academics.",
      highlights: [
        "First Class with Distinction (79.80%)",
        "Excellence in Mathematics & Science",
        "Leadership in School Activities & Sports",
      ],
    },
  ],
  skills: [
    {
      category: "Programming Languages",
      iconName: "Code2",
      description: "Foundational & object-oriented compiled languages",
      skills: [
        { name: "C", proficiency: "Core Systems" },
        { name: "Python", proficiency: "Scripting & DSA" },
        { name: "Java", proficiency: "OOP & Architecture" },
      ],
    },
    {
      category: "Web Development",
      iconName: "Globe",
      description: "Modern responsive web applications & interfaces",
      skills: [
        { name: "HTML5", proficiency: "Semantic Markup" },
        { name: "CSS3", proficiency: "Layouts & Tailwind" },
        { name: "JavaScript", proficiency: "ES6+ & Async" },
      ],
    },
    {
      category: "Database Management",
      iconName: "Database",
      description: "Relational modeling, schemas, queries & optimization",
      skills: [
        { name: "MySQL", proficiency: "Relational Queries" },
        { name: "PostgreSQL", proficiency: "Enterprise SQL" },
      ],
    },
    {
      category: "Tools & Platforms",
      iconName: "Wrench",
      description: "Development environments, version control & AI workflows",
      skills: [
        { name: "VS Code", proficiency: "IDE" },
        { name: "GitHub", proficiency: "Version Control" },
        { name: "Google AI Studio", proficiency: "AI Workflows" },
        { name: "Antigravity", proficiency: "Tooling" },
      ],
    },
    {
      category: "Core Computer Science",
      iconName: "Cpu",
      description: "Fundamental engineering theories and systems principles",
      skills: [
        { name: "Data Structures & Algorithms" },
        { name: "Object-Oriented Programming (OOP)" },
        { name: "Computer Networks" },
        { name: "Database Management Systems (DBMS)" },
        { name: "Operating Systems" },
      ],
    },
    {
      category: "Professional & Soft Skills",
      iconName: "Users",
      description: "Collaborative execution, agility and communication",
      skills: [
        { name: "Time Management" },
        { name: "Communication" },
        { name: "Problem Solving" },
        { name: "Team Work" },
        { name: "Clean Coding Discipline" },
      ],
    },
  ],
  hackathons: [
    {
      title: "Build with Bharat 2.0",
      subtitle: "National Innovation & Developer Hackathon",
      category: "Digital Infrastructure & Scalable Solutions",
      description:
        "Collaborated in a high-intensity hackathon sprint focused on building accessible, scalable digital tools tailored to Indian grassroots communities and regional digital transformation.",
      focusAreas: [
        "Rapid Prototyping & MVP Delivery",
        "Accessible User Interface Architecture",
        "Team Brainstorming & Architecture Pitch",
      ],
      role: "Full-Stack Developer & Frontend Lead",
      badge: "National Hackathon",
    },
    {
      title: "TATA Crucible Quiz Competition",
      subtitle: "India's Premier Business & Tech Intelligence Arena",
      category: "Business Strategy & Technology Insights",
      description:
        "Competed in the prestigious TATA Crucible competition, testing deep business acumen, technological evolutions, industry landmarks, and lateral thinking under strict timed rounds.",
      focusAreas: [
        "Emerging Technology Trends",
        "Business Systems & Market Dynamics",
        "High-Pressure Strategic Thinking",
      ],
      role: "Quiz Contestant & Strategist",
      badge: "Prestigious Arena",
    },
    {
      title: "Hackathon to Solve the Garbage Problem",
      subtitle: "Civic Tech & Environmental Impact Hackathon",
      category: "IoT, Clean Tech & Smart Urban Waste Management",
      description:
        "Conceptualized and developed software-driven waste management strategies, exploring smart tracking, route optimization for collection vans, and citizen reporting interfaces.",
      focusAreas: [
        "Smart Municipal Tracking Ideas",
        "Data-Driven Waste Segregation Models",
        "Community Civic Reporting UI",
      ],
      role: "System Designer & Coder",
      badge: "Civic Impact",
    },
  ],
  hobbies: [
    {
      title: "Cricket",
      subtitle: "Outdoor Sport & Strategic Game Management",
      description:
        "An active cricket player and enthusiast. Cricket instills a deep sense of field discipline, real-time tactical adjustments under tight scoreboard pressure, and synergistic communication between teammates.",
      iconName: "Trophy",
      highlights: [
        "Strategic Game Management & Field Placement",
        "Resilience & High-Pressure Performance",
        "Unwavering Team Synergy & Sportsmanship",
      ],
    },
    {
      title: "Gaming",
      subtitle: "Digital Strategy & Rapid Reflexes",
      description:
        "Passionate about competitive multiplayer and strategic video games. Gaming sharpens spatial awareness, rapid pattern recognition, microsecond response times, and squad-based voice communication.",
      iconName: "Gamepad2",
      highlights: [
        "Rapid Reflexes & Split-Second Decision Making",
        "Multiplayer Squad Coordination & Comms",
        "Analysis of Game Mechanics & Virtual Systems",
      ],
    },
  ],
};
