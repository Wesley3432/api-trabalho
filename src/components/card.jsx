import s from './card.module.css'
import { useState } from 'react'

export const Card = ({ image, name, race, gender, maxKi, trans }) => {

    const [form, setForm] = useState(0)

    const base = {
        image,
        name,
        maxKi
    }
    
    let arr = [base]

    if (trans && trans.length > 0) {
        for (let t of trans) {
            arr.push({
                image: t.image,
                name: t.name,
                maxKi: t.maxKi || t.ki || "???"
            })
        }
    }

    const lista = arr

    const trocarForma = () => {
        setForm((x) => (x + 1) % lista.length)
    }

    return (
        <div className={s.cardBackground}>
            <img 
                className={s.cardImage} 
                src={lista[form].image} 
                alt={lista[form].name}
                onClick={trocarForma}
            />

            <h2 className={s.cardTitle}>{lista[form].name}</h2>
            <p className={s.cardText}>{race}</p>
            <p className={s.cardText}>{gender}</p>
            <p className={s.cardText}>{lista[form].maxKi}</p>
        </div>
    )
}
