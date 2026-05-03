import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tools_BC = ['Python', 'Numpy', 'Scikit-learn', 'Pandas']
  const tools_LLM = ['Python', 'Numpy', 'Pandas', 'Pytorch']
  const tools_SDI = ['Python']
  const tools_NNs = ['Python', 'Numpy']
  const tools_MedLLM = ['Python', 'FastAPI', 'React', 'Pinecone', 'Numpy']
  const tools_jarvis = ['Python', 'Ollama', 'Pinecone', 'APIs']

  {/*const aboutRef    = UseFadeIn()
  const projectsRef = UseFadeIn()
const footerRef   = UseFadeIn()*/}
  
  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />
      <BackToTop />
      <ScrollFadeOverlay/>
      <Header onContactClick={() => setIsModalOpen(true)}/>
      <Hero/>
      <div id="about">
        <About_Me />
      </div>
      <div className="section-label" style={{ marginTop: '48px' }}>projects</div>
      <div className="project-grid" id='projects'>
        <Card tools={tools_BC} projectName="Breast Cancer Prediction Model" projectDescription="Predicts Breast Cancer using database from Kaggle with three different model and analyses prediction results" status="completed" github="https://github.com/rino-genistus/Breast-Cancer-Prediction-Model.git"/>
        <Card tools={tools_LLM} projectName="LLM from scratch" projectDescription="Learned how to build an LLM from scratch using Sebastian Rashchka Textbook. Learning how to develop specialized LLM for specific tasks" status="in-progress" github="https://github.com/rino-genistus/LLMs_from_scratch.git"/>
        <Card tools={tools_SDI} projectName="Simple Document Indexer" projectDescription="Built a simple Vector Space Indexing Engine. Allows you to search for files and returns best matches" status="completed" github="https://github.com/rino-genistus/Simple-document-indexer.git"/>
        <Card tools={tools_NNs} projectName="Neural Networks from Scratch" projectDescription="Built a simple Neural Network that has 2 inputs, a 2 neuron hidden layer, and a one neuron output layer. Made with pure Numpy." status="completed" github="https://github.com/rino-genistus/Neural-Network-From-Scratch.git"/>
        <Card tools={tools_MedLLM} projectName="MedLLM" projectDescription="RAG-powered medical study assistant with hybrid BM25 and dense vector search across medical textbooks. Built with React, FastAPI, and Pinecone." status="in-progress" github="https://github.com/rino-genistus/MedLLM.git"/>
        <Card tools={tools_jarvis} projectName="Jarvis AI" projectDescription="Fully local, voice-activated AI assistant running on Apple Silicon. Features a multi-agent tool system, long-term memory via Pinecone vector search, and a complete voice pipeline with local transcription and TTS." status="in-progress" github="https://github.com/rino-genistus/jarvis_ai.git"/>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      
      <Footer/>
    </>
  )
}

export default App
