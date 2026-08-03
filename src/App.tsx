import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import { texts, type Language } from './translations'

type CareerItem = {
  title: string
  organization: string
  period: string
  description: string
  link: string
  portfolioFile: File | null
  portfolioFileUrl: string
}

type Skill = {
  id: number
  name: string
  category: string
}



function App() {
  const [careerItems, setCareerItems] = useState<CareerItem[]>([])

  const [skills, setSkills] = useState<Skill[]>([])
  
  const [language, setLanguage] = useState<Language>('en')

  const t = texts[language]

  const [name, setName] = useState('')

  const [headline, setHeadline] = useState('')

  const [about, setAbout] = useState('')

  const [skillName, setSkillName] = useState('')

  const [skillCategory, setSkillCategory] = useState('')
  

  const loadSkills = () => {
  fetch('http://127.0.0.1:5001/api/skills')
    .then((response) => response.json())
    .then((data) => {
      setSkills(data)
    })
  }

  const addSkill = () => {
  fetch('http://127.0.0.1:5001/api/skills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: skillName,
      category: skillCategory,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      setSkillName('')
      setSkillCategory('')
      loadSkills()
    })
}

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
  
    loadSkills()
  }, [])

const printPreview = () => {
  window.print()
}

  return (
    <div className="app">
      <Sidebar language={language} setLanguage={setLanguage} />

      <main className="main">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <section className="editor-section">
          <h2>{t.basicProfile}</h2>

          <input
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            placeholder={t.headlinePlaceholder}
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />

          <textarea
            placeholder={t.aboutPlaceholder}
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
          
        </section>
      


        <section className="editor-section">
          <h2>{t.career}</h2>

          <button onClick={addCareer}>{t.addCareer}</button>

          {careerItems.map((item, index) => (
            <div className="career-card" key={index}>
              <input
                placeholder={t.positionPlaceholder}
                value={item.title}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].title = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

              <input
                placeholder={t.organizationPlaceholder}
                value={item.organization}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].organization = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

              <input
                placeholder={t.periodPlaceholder}
                value={item.period}
                onChange={(event) => {
                  const updatedItems = [...careerItems]
                  updatedItems[index].period = event.target.value
                  setCareerItems(updatedItems)
                }}
              />

              <textarea
                placeholder={t.descriptionPlaceholder}
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



        <section className="editor-section">
              <h2>{t.skills}</h2>

              <input
               placeholder={t.skillNamePlaceholder}
               value={skillName}
               onChange={(event) => setSkillName(event.target.value)}
               />

              <input
              placeholder={t.skillCategoryPlaceholder}
              value={skillCategory}
              onChange={(event) => setSkillCategory(event.target.value)}
               />

              <button onClick={addSkill}>{t.addSkill}</button>
        </section>



        <button onClick={saveProfile}>Save Profile</button>



        <section className="preview-section">
           <div className="preview-header">
             <h2>{t.preview}</h2>

             <button className="print-button" onClick={printPreview}>
               Print / Save as PDF
             </button>

          </div>

          <div className="preview-card">
            <h1>{t.previewName}</h1>
            <h3>{t.previewHeadline} </h3>
             <p>{t.previewAbout} </p>

            <h2>{t.career}</h2>

           {careerItems.length === 0 && (
            <p> {t.career} </p>
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


           <h2>{t.skills}</h2>

           {skills.length === 0 && (
             <p>{t.previewSkills}</p>
           )}

           {skills.map((skill) => (
             <div className="preview-item" key={skill.id}>
               <h3>{skill.name}</h3>
               <p>{skill.category}</p>
             </div>
           ))}
             </div>
      </section>
     </main>
    </div>

  )
}

  export default App