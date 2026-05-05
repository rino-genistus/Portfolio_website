import { useState, useEffect } from 'react'
import Header from './Header'
import Card from './Card'
import './App.css'
import ContactModal from './ContactModal'
import About_Me from './About_Me'
import Footer from './Footer'
import Hero from './Hero'
import ScrollProgressBar from './ScrollProgressBar'
import CursorGlow from './CursorGlow'
import BackToTop from './BackToTop'
import ScrollFadeOverlay from './ScrollFadeOverlay'
import DetailDrawer from './DetailDrawer'
import Skills from './Skills'
import GrainOverlay from './GrainOverlay'
import SectionCounter from './SectionCounter'

const PROJECTS = [
  {
    name:        'Jarvis AI',
    description: 'Fully local, voice-activated AI assistant running on Apple Silicon. Features a multi-agent tool system, long-term memory via Pinecone vector search, and a complete voice pipeline with local transcription and TTS.',
    highlights:  [
      'Multi-agent architecture with dynamic tool routing',
      'Long-term memory via Pinecone — remembers context across sessions',
      'Fully local — zero cloud APIs, runs entirely on-device',
      'Real-time voice pipeline with local STT and TTS',
    ],
    tools:   ['Python', 'Ollama', 'Pinecone', 'APIs'],
    status:  'in-progress',
    github:  'https://github.com/rino-genistus/jarvis_ai.git',
    size:    'featured',
  },
  {
    name:        'MedLLM',
    description: 'RAG-powered medical study assistant with hybrid BM25 and dense vector search across medical textbooks. Built with React, FastAPI, and Pinecone.',
    highlights:  [
      'Hybrid BM25 + dense vector retrieval for accurate citations',
      'React frontend with FastAPI backend',
      'Pinecone vector store over full medical textbook corpus',
    ],
    tools:   ['Python', 'FastAPI', 'React', 'Pinecone', 'Numpy'],
    status:  'in-progress',
    github:  'https://github.com/rino-genistus/MedLLM.git',
    size:    'side',
  },
  {
    name:        'LLM from Scratch',
    description: 'Building a large language model from the ground up following the Raschka textbook, learning to specialize LLMs for targeted tasks.',
    highlights:  [
      'Implements tokenizer, attention, and transformer blocks from scratch',
      "Follows Raschka's \"Build a Large Language Model\" textbook",
      'Goal: fine-tune for domain-specific downstream tasks',
    ],
    tools:   ['Python', 'Numpy', 'Pandas', 'Pytorch'],
    status:  'in-progress',
    github:  'https://github.com/rino-genistus/LLMs_from_scratch.git',
    size:    'wide',
  },
  {
    name:        'Neural Networks from Scratch',
    description: 'Built a simple Neural Network with 2 inputs, a 2 neuron hidden layer, and one neuron output — using pure Numpy, no ML libraries.',
    highlights:  [
      'Forward pass, backprop, and gradient descent — all pure NumPy',
      'No ML libraries; demonstrates foundational understanding',
      '2-layer architecture with configurable learning rate',
    ],
    tools:   ['Python', 'Numpy'],
    status:  'completed',
    github:  'https://github.com/rino-genistus/Neural-Network-From-Scratch.git',
    size:    'wide',
  },
  {
    name:        'Breast Cancer Prediction Model',
    description: 'Predicts Breast Cancer using a Kaggle dataset across three different models, with full analysis of prediction results.',
    highlights:  [
      'Three models compared: Logistic Regression, SVM, Random Forest',
      'Full Kaggle dataset pipeline with preprocessing and EDA',
      'Detailed accuracy, precision, recall analysis across all models',
    ],
    tools:   ['Python', 'Numpy', 'Scikit-learn', 'Pandas'],
    status:  'completed',
    github:  'https://github.com/rino-genistus/Breast-Cancer-Prediction-Model.git',
    size:    'side',
  },
  {
    name:        'Simple Document Indexer',
    description: 'A Vector Space Indexing Engine that lets you search local files and returns ranked matches.',
    highlights:  [
      'TF-IDF vector space model for ranked document retrieval',
      'Indexes arbitrary local file directories',
      'Pure Python — no external search dependencies',
    ],
    tools:   ['Python'],
    status:  'completed',
    github:  'https://github.com/rino-genistus/Simple-document-indexer.git',
    size:    'side',
  },
]

/* Shimmer skeleton card */
function CardSkeleton({ size }) {
  const sizeClass = { featured: 'card-featured', wide: 'card-wide', side: 'card-side' }[size] || 'card-side'
  return (
    <div className={sizeClass}>
      <div className="card card-skeleton">
        <div className="skel skel-index" />
        <div className="skel skel-title" />
        <div className="skel skel-line" />
        <div className="skel skel-line skel-line--short" />
        <div className="skel-chips">
          <div className="skel skel-chip" />
          <div className="skel skel-chip" />
          <div className="skel skel-chip" />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isModalOpen, setIsModalOpen]         = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter]       = useState('all')
  const [loaded, setLoaded]                   = useState(false)

  /* Simulate a brief load — shimmer shows for ~600ms then cards fade in */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 650)
    return () => clearTimeout(t)
  }, [])

  const filters = [
    { key: 'all',         label: 'All' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed',   label: 'Completed' },
  ]

  const visibleProjects = PROJECTS.filter(p =>
    activeFilter === 'all' || p.status === activeFilter
  )

  return (
    <>
      <GrainOverlay />
      <ScrollProgressBar />
      <CursorGlow />
      <BackToTop />
      <ScrollFadeOverlay />

      <Header onContactClick={() => setIsModalOpen(true)} />
      <Hero />

      <div id="about">
        <About_Me />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <section className="projects-section" id="projects">
        <div className="section-label" style={{ padding: 0, marginBottom: '20px' }}>
          projects
          <SectionCounter count={PROJECTS.length} label="built" />
        </div>

        <div className="filter-bar">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="filter-count">
                  {PROJECTS.filter(p => p.status === f.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {!loaded
            /* Show shimmer skeletons on first load */
            ? PROJECTS.map((p, i) => <CardSkeleton key={i} size={p.size} />)
            /* Then fade real cards in */
            : visibleProjects.map((p) => (
                <Card
                  key={p.name}
                  index={PROJECTS.indexOf(p) + 1}
                  projectName={p.name}
                  projectDescription={p.description}
                  tools={p.tools}
                  status={p.status}
                  github={p.github}
                  size={p.size}
                  onClick={() => setSelectedProject({ ...p, index: PROJECTS.indexOf(p) + 1 })}
                />
              ))
          }
        </div>
      </section>

      <DetailDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}

export default App