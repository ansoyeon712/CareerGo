import { useState } from "react"
type SidebarProps = {
    language: string
    setLanguage: (language: string) => void
  }

  
  function Sidebar({ language, setLanguage }: SidebarProps) {
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    return (
      <aside className="Sidebar">
        <h2>Language setting</h2>
  
        <button
  className={language === "ko" ? "language-button active" : "language-button"}
  onClick={() => setLanguage("ko")}> 한국어 </button>

<button
  className={language === "en" ? "language-button active" : "language-button"}
  onClick={() => setLanguage("en")}
>
  English
</button>

<button
  className={language === "de" ? "language-button active" : "language-button"}
  onClick={() => setLanguage("de")}
>
  Deutsch
</button>
        <h2>Kontakt</h2>
        <p> Mobil</p>
        
        <input type="number" 
          value={phone}
          onChange={(event) => {setPhone(event.target.value)}} />
        <button>Save</button>

        <p> E-Mail</p>
        <input type="text"
          value={email}
          onChange={(event) => {setEmail(event.target.value)}} />
          <button>Save</button>
      </aside>
    )
  }
  
  export default Sidebar