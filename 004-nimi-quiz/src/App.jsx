import { useEffect, useState } from 'react'
import './App.css'

let randomePage = Math.floor(Math.random()*10 )
const RANDOM_ANIME_URL = `https://api.jikan.moe/v4/top/anime?page=${randomePage}&limit=10&filter=bypopularity`

function App() {
  const [blur, setBlur] = useState(20)
  const [image, setImage] = useState(null)


  useEffect(() => {
    const getRandomAnime = async () => {
      const response = await fetch(RANDOM_ANIME_URL)
      const data = await response.json()
      const popularAnimes = data.data;
      const randomAnime = popularAnimes[Math.floor(Math.random() * popularAnimes.length)];
      setImage(randomAnime.images.webp.large_image_url)
    }

    getRandomAnime()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setBlur(prevBlur => prevBlur - 2)
  }

  return (
    <div className='quiz'>
      <h1>Nimi-Anime-Quiz</h1>
      <header className='options-header'>
        <form action="">
        <select name="" id="">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button>
          Start
        </button>
        </form>

      </header>
      <main>
          <h3>Que anime es ?</h3>
          <div style={{ filter: `blur(${blur}px)` }}>

          <img src={image} alt="imagen del anime" />
          </div>
          <form onSubmit={handleSubmit} action="">
          <input type="text" />
          </form>
      </main>
    </div>
  )
}

export default App
