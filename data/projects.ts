export interface Project {
  id: number;
  title: string;
  tag: string;
  desc: string;
  stack: string[];
  github: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Echo",
    tag: "SotonHack 2026 — Winner, Best Use of ElevenLabs",
    desc: "Voice-based social platform blending Reddit-style anonymous Q&A with BeReal-style daily check-ins. Users pick a voice from ElevenLabs, ask and answer public questions, and send daily voice notes to friends. Interests auto-update via Gemini text classification.",
    stack: ["React", "Tailwind", "FastAPI", "Python", "ElevenLabs API", "Gemini API", "MongoDB Atlas"],
    github: "https://github.com/kiwifruit0/Echo",
  },
  {
    id: 2,
    title: "Wander Quest",
    tag: "WECS × Soton Datascience Hackathon — Winner",
    desc: "Gamified real-world exploration app inspired by Stardew Valley. Uses geolocation to categorise where the user is — nature, social, exercise, learning — and rewards them with XP and level-ups. Includes a friends leaderboard, character path selector, and a pixel art UI.",
    stack: ["React", "Tailwind", "FastAPI", "Python", "Mapbox API"],
    github: "https://github.com/Ryan-Shino/WECSHackathonProject",
  },
];