import { useState, useEffect } from 'react'
import s from './App.module.css'
import { Card } from './components/card'
import { api } from './api/api'
  
function App() {
    const [data, setData] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchPage, setSearchPage] = useState("1")

useEffect(() => {
    api.get(`/?name=${searchName}&page=${searchPage}`)
        .then((response) => {
            setData(response?.data?.items || [])
        })
        .catch((error) => {
            console.error("NÃO FOI POSSÍVEL ACESSAR API", error)
        })
}, [searchName, searchPage ])
  return (
    <>
      <h1 className={s.title}>DRAGON BALL API</h1>
      <main>
        <div style={{display: "flex", gap: "5px", alignItems: "center", justifyContent: "center"}}>
        <input type="text" value={searchPage} onChange={(e) =>  setSearchPage(e.target.value)} placeholder='1/6' />
        <input type="text" value={searchName} onChange={(e) =>  setSearchName(e.target.value)} placeholder='procurar um personagem' />
        </div>     
                    
                    <div className={s.wrapCards}>
                    {data.map((item, index) => {
                             return(
              <div key={index}>
                  <Card image={item.image} name={item.name} race={item.race} gender={item.gender} maxKi={item.maxKi} description={item.description}/>
              </div>
            )
          })}

        </div>
                        
     
     
      </main>
    </>
  )
}

export default App