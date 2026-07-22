import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'

type CareerItem = {
  title: string
  organization: string
  period: string
  description: string
  link: string
  portfolioFile: File | null
  portfolioFileUrl: string
}

function App() {
  const [language, setLanguage] = useState('en')

  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [about, setAbout] = useState('')

  const [careerItems, setCareerItems] = useState<CareerItem[]>([])

  const addCareer = () => {
    setCareerItems([
      ...careerItems,
      {
        title: '',
        organization: '',
        period: '',
        description: '',
        link: '',
        portfolioFile: null,
        portfolioFileUrl: '',
      }
    ])
  }

  const saveProfile = () => {
    const profileData = {
      name,
      headline,
      about,
      careerItems: careerItems.map((item) => ({
        title: item.title,
        organization: item.organization,
        period: item.period,
        description: item.description,
        link: item.link,
      })),
    }
  
    fetch('http://127.0.0.1:5001/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        alert('Profile saved successfully')
      })
  }

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/profile')
      .then((response) => response.json())
      .then((data) => {
        setName(data.name)
        setHeadline(data.headline)
        setAbout(data.about)
  
        const loadedCareerItems = data.careerItems.map((item: CareerItem) => ({
          title: item.title,
          organization: item.organization,
          period: item.period,
          description: item.description,
          link: item.link,
          portfolioFile: null,
          portfolioFileUrl: '',
        }))
  
        setCareerItems(loadedCareerItems)
      })
  }, [])

  return (
    <div className="app">
      <Sidebar language={language} setLanguage={setLanguage} />

      <main className="main">
        <h1>CareerGo</h1>
        <p>Create your own personal PR page.</p>

        <section className="editor-section">
          <h2>Basic Profile</h2>

          <input
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            placeholder="Headline, e.g. Software Developer"
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />

          <textarea
            placeholder="Tell people who you are."
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </section>

        <section className="editor-section">
          <h2>Career</h2>

          <button onClick={addCareer}>Add career</button>

          {careerItems.map((item, index) => (
            <div className="career-card" key={index}>
              <input
                placeholder="Position"
                value={item.title}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].title = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

              <input
                placeholder="Organization"
                value={item.organization}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].organization = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

              <input
                placeholder="Period"
                value={item.period}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].period = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

              <textarea
                placeholder="Description"
                value={item.description}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].description = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

              <input
                placeholder="Portfolio link"
                value={item.link}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].link = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

 <input
  type="file"
  accept=".pdf,.ppt,.pptx"
  onChange={(event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      return
    }

    const updatedItems = [...careerItems]

    updatedItems[index] = {
      ...updatedItems[index],
      portfolioFile: selectedFile,
      portfolioFileUrl: URL.createObjectURL(selectedFile),
    }

    setCareerItems(updatedItems)
  }}

/>
              
            </div>
          ))}
        </section>

        <button onClick={saveProfile}>Save Profile</button>


        <section className="preview-section">
          <h2>Preview</h2>

          <div className="preview-card">
            <h1>{name || 'Your Name'}</h1>
            <h3>{headline || 'Your headline'}</h3>
            <p>{about || 'Your self-introduction will appear here.'}</p>

            <h2>Career</h2>

            {careerItems.length === 0 && (
              <p>Your career history will appear here.</p>
            )}

            {careerItems.map((item, index) => (
              <div className="preview-item" key={index}>
                <h3>{item.title || 'Position'}</h3>
                <p>{item.organization || 'Organization'}</p>
                <p>{item.period || 'Period'}</p>
                <p>{item.description || 'Description'}</p>

                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    Portfolio
                  </a>
                )}

{item.portfolioFileUrl && (
  <a href={item.portfolioFileUrl} target="_blank" rel="noreferrer">
    {item.portfolioFile?.name || 'Open file'}
  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App