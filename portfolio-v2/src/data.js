// ─────────────────────────────────────────────
//  All site content lives here — preserved 1:1
//  from the original portfolio.
// ─────────────────────────────────────────────

export const PROFILE = {
  name: 'Rino Genistus Ruban',
  firstName: 'Rino Genistus',
  lastName: 'Ruban',
  handle: 'rino_genistus_ruban',
  tagline: ['I just like', 'building stuff.'],
  roles: ['ML Engineer', 'CS Student', 'AI Researcher', 'Neural Net Builder'],
  intro:
    'Sophomore at Rutgers University studying Computer Science. Focused on Neural Networks, LLMs, and making AI work for real problems.',
  email: 'rino.genistus@gmail.com',
  linkedin: 'https://linkedin.com/in/rino-ruban-65347625a',
  github: 'https://github.com/rino-genistus',
  resume: '/resume.pdf',
}

// Long-form about copy (kept from original About section)
export const ABOUT = [
  {
    text: 'Sophomore at ',
    highlight: 'Rutgers University – New Brunswick',
    after:
      ', studying Computer Science with a minor in Mathematics. Currently diving deep into Neural Networks and LLMs — specifically how to localize and specialize large language models for targeted tasks.',
  },
]

export const ASPIRATION = ['Data Science Engineer', 'AI/ML Engineer']

// Terminal lines (whoami / profile.json / ls currently/)
export const TERMINAL = {
  whoami: 'rino_genistus_ruban',
  profile: {
    status: 'Sophomore @ Rutgers NB',
    major: 'CS + Math minor',
    focus: 'LLMs · Neural Networks',
    goal: 'AI/ML Engineer',
  },
  currently: [
    'building-LLM-from-scratch',
    'MedLLM-RAG-pipeline',
    'Jarvis-AI-voice-assistant',
  ],
}

export const SKILL_GROUPS = [
  { label: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'SQL'] },
  {
    label: 'ML / AI',
    skills: ['PyTorch', 'NumPy', 'Pandas', 'Scikit-learn', 'Hugging Face', 'LangChain'],
  },
  { label: 'Infra & Tools', skills: ['Pinecone', 'FastAPI', 'Git'] },
  { label: 'Frontend', skills: ['React', 'Vite', 'HTML', 'CSS'] },
]

export const PROJECTS = [
  {
    name: 'Jarvis AI',
    description:
      'Fully local, voice-activated AI assistant running on Apple Silicon. Features a multi-agent tool system, long-term memory via Pinecone vector search, and a complete voice pipeline with local transcription and TTS.',
    highlights: [
      'Multi-agent architecture with dynamic tool routing',
      'Long-term memory via Pinecone — remembers context across sessions',
      'Fully local — zero cloud APIs, runs entirely on-device',
      'Real-time voice pipeline with local STT and TTS',
    ],
    tools: ['Python', 'Ollama', 'Pinecone', 'APIs'],
    status: 'in-progress',
    github: 'https://github.com/rino-genistus/jarvis_ai.git',
    size: 'featured',
  },
  {
    name: 'MedLLM',
    description:
      'RAG-powered medical study assistant with hybrid BM25 and dense vector search across medical textbooks. Built with React, FastAPI, and Pinecone.',
    highlights: [
      'Hybrid BM25 + dense vector retrieval for accurate citations',
      'React frontend with FastAPI backend',
      'Pinecone vector store over full medical textbook corpus',
    ],
    tools: ['Python', 'FastAPI', 'React', 'Pinecone', 'Numpy'],
    status: 'in-progress',
    github: 'https://github.com/rino-genistus/MedLLM.git',
    size: 'side',
  },
  {
    name: 'LLM from Scratch',
    description:
      'Building a large language model from the ground up following the Raschka textbook, learning to specialize LLMs for targeted tasks.',
    highlights: [
      'Implements tokenizer, attention, and transformer blocks from scratch',
      'Follows Raschka\'s "Build a Large Language Model" textbook',
      'Goal: fine-tune for domain-specific downstream tasks',
    ],
    tools: ['Python', 'Numpy', 'Pandas', 'Pytorch'],
    status: 'in-progress',
    github: 'https://github.com/rino-genistus/LLMs_from_scratch.git',
    size: 'wide',
  },
  {
    name: 'Neural Networks from Scratch',
    description:
      'Built a simple Neural Network with 2 inputs, a 2 neuron hidden layer, and one neuron output — using pure Numpy, no ML libraries.',
    highlights: [
      'Forward pass, backprop, and gradient descent — all pure NumPy',
      'No ML libraries; demonstrates foundational understanding',
      '2-layer architecture with configurable learning rate',
    ],
    tools: ['Python', 'Numpy'],
    status: 'completed',
    github: 'https://github.com/rino-genistus/Neural-Network-From-Scratch.git',
    size: 'wide',
  },
  {
    name: 'Breast Cancer Prediction Model',
    description:
      'Predicts Breast Cancer using a Kaggle dataset across three different models, with full analysis of prediction results.',
    highlights: [
      'Three models compared: Logistic Regression, SVM, Random Forest',
      'Full Kaggle dataset pipeline with preprocessing and EDA',
      'Detailed accuracy, precision, recall analysis across all models',
    ],
    tools: ['Python', 'Numpy', 'Scikit-learn', 'Pandas'],
    status: 'completed',
    github: 'https://github.com/rino-genistus/Breast-Cancer-Prediction-Model.git',
    size: 'side',
  },
  {
    name: 'Simple Document Indexer',
    description:
      'A Vector Space Indexing Engine that lets you search local files and returns ranked matches.',
    highlights: [
      'TF-IDF vector space model for ranked document retrieval',
      'Indexes arbitrary local file directories',
      'Pure Python — no external search dependencies',
    ],
    tools: ['Python'],
    status: 'completed',
    github: 'https://github.com/rino-genistus/Simple-document-indexer.git',
    size: 'side',
  },
]
