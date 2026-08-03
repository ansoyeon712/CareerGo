import { useState } from "react"
type SidebarProps = {
  language: 'ko' | 'en' | 'de'
  setLanguage: (language: 'ko' | 'en' | 'de') => void
}

  
  function Sidebar({ language, setLanguage }: SidebarProps) {
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    return (
      <aside className="sidebar">
      <h2>CareerGo</h2>
    
      <div className="language-section">
        <p className="sidebar-label">Language setting</p>
    
        <button
          className={language === 'ko' ? 'language-button active' : 'language-button'}
          onClick={() => setLanguage('ko')}
        >
          한국어
        </button>
    
        <button
          className={language === 'en' ? 'language-button active' : 'language-button'}
          onClick={() => setLanguage('en')}
        >
          English
        </button>
    
        <button
          className={language === 'de' ? 'language-button active' : 'language-button'}
          onClick={() => setLanguage('de')}
        >
          Deutsch
        </button>
      </div>
    
      
    </aside>
    )
  }
  
  export default Sidebar