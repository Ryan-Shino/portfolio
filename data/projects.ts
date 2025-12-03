export interface Project {
    id: number;
    title: string;
    desc: string;
    languages: string[];
    image: string;
  }
  
  export const projectsData: Project[] = [
    { 
      title: "Movie Vault", 
      id: 1, 
      desc: "A movie discovery app allowing users to search, filter by genre, and manage personal 'Watch Later' and 'Favorites' lists, complete with a sleek UI.", 
      languages: ["React", "REST API"], 
      image: "/Images/Home.png" 
    },
    { 
      title: "P2P Chess with AI", 
      id: 2, 
      desc: "An interactive chess application featuring real-time online matchmaking via Peer.js and a single-player mode against a custom-built AI opponent.", 
      languages: ["React", "Peer.js", "ML"], 
      image: "/Images/Chess.png" 
    },
    { 
      title: "Market Analysis", 
      id: 3, 
      desc: "A quantitative finance project utilising Python and Pandas to analyse Ethereum market microstructure, visualising liquidity metrics and volatility data.", 
      languages: ["Python Pandas", "Matplotlib", "Jupyter Notebooks"], 
      image: "/Images/CryptoAnalysis.png" 
    },
    { 
      title: "Automated CI/CD ", 
      id: 4, 
      desc: "A full CI/CD implementation for a Flask app on a Linux Ubuntu VM. Utilizes Docker for containerisation, Nginx as a reverse proxy and GitHub Actions for automated deployment.", 
      languages: ["Flask", "Docker", "Nginx", "Linux", "GitHub Actions"], 
      image: "/Images/FlaskApp.png" 
    },
  ];