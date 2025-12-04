import { useState, useEffect } from 'react'
import s from './App.module.css'
import { Card } from './components/card'
import { api } from './api/api'
  
function App() {
  const [data, setData] = useState([])
  const [searchPage, setSearchPage] = useState("")



useEffect(() => {
    api.get(`/characters/?page=${searchPage}`)
    .then(async (response) => {


      const personagens = response.data.items
      const personagensCompletos = []

      for (const p of personagens) {
        const res = await api.get(`/characters/${p.id}`)
        personagensCompletos.push(res.data)
      }
      setData(personagensCompletos)
      personagensCompletos.forEach((x) => {
        console.log(x.name, x.transformations, x.maxKi)
      })
    })
    .catch(() => {})
}, [searchPage])

  return (
    <>
      <h1 className={s.title}>DRAGON BALL API</h1>
      <main>
        <div style={{display: "flex", gap: "5px", alignItems: "center", justifyContent: "center"}}>
        <input type="text" value={searchPage} onChange={(e) =>  setSearchPage(e.target.value)} placeholder='1/6' />      
        </div>
                    
                    <div className={s.wrapCards}>
                    {data.map((item, index) => {
                             return(
              <div key={index}>
                  <Card image={item.image} name={item.name} race={item.race} gender={item.gender} maxKi={item.maxKi} description={item.description} trans={item.transformations} />
              </div>
            )
          })}

        </div>
                        
     
     
      </main>
    </>
  )
}

export default App
