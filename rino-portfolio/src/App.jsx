import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './Header'
import Card from './Card'
import './App.css'
import ContactModal from './ContactModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tools_BC = ['Python', 'Numpy', 'Scikit-learn', 'Pandas']
  const tools_LLM = ['Python', 'Numpy', 'Pandas', 'Pytorch']
  
  return (
    <>
      <Header onContactClick={() => setIsModalOpen(true)}/>
      <Card tools={tools_BC} projectName="Breast Cancer Prediction Model" projectDescription="Predicts Breast Cancer using database from Kaggle with three different model and analyses prediction results" status="completed"/>
      <Card tools={tools_LLM} projectName="LLM from scratch" projectDescription="Learned how to build an LLM from scratch using Sebastian Rashchka Textbook. Learning how to develop specialized LLM for specific tasks" status="in-progress"/>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>
  )
}

export default App
