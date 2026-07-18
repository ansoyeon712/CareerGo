import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'

type CareerItem = {
  title: string
  organization: string
  period: string
  description: string
  link: string
}

type EducationItem = {
  school: string
  degree: string
  period: string
  description: string
}

type MediaItem = {
  title: string
  organization: string
  period: string
  description: string
  link: string
}

function App() {
  const [language, setLanguage] = useState('en')
  const [careerItems, setCareerItems] = useState<CareerItem[]>([])
  const [educationItems, setEducationItems] = useState<EducationItem[]>([])
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])


  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/career')
      .then((response) => response.json())
      .then((data) => setCareerItems(data))

    fetch('http://127.0.0.1:5001/api/education')
      .then((response) => response.json())
      .then((data) => setEducationItems(data))

    fetch('http://127.0.0.1:5001/api/media')
      .then((response) => response.json())
      .then((data) => setMediaItems(data))
  }, [])


  return (
    <div className="app">
      <Sidebar language={language} setLanguage={setLanguage} />

      <main className="main">
        <h1>CareerGo</h1>
        <p>Welcome! Your career starts here.</p>

        <section>
          <h2>Career</h2>

          {careerItems.map((item) => (
            <div className="career-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.organization}</p>
              <p>{item.period}</p>
              <p>{item.description}</p>

              <a href={item.link} target="_blank">
                Portfolio Link
              </a>
            </div>
          ))}
        </section>

        <section>
          <h2>Education</h2>

          {educationItems.map((item) => (
            <div className="career-card" key={item.school}>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
              <p>{item.period}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Media / Projects</h2>

          {mediaItems.map((item) => (
            <div className="career-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.organization}</p>
              <p>{item.period}</p>
              <p>{item.description}</p>

              <a href={item.link} target="_blank">
                Link
              </a>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App