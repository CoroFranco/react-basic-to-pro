import { useCallback, useEffect, useRef, useState } from "react"
import './app.css'

const randomePage = Math.floor(Math.random() * 10)
const RANDOM_ANIME_URL = `https://api.jikan.moe/v4/top/anime?page=${randomePage}&limit=10&filter=bypopularity&type=tv`
const ANIME_TITLE_SEARCH = `https://api.jikan.moe/v4/anime?page=1&limit=6&filter=bypopularity&type=tv&q=`

export default function App() {
  const [blur, setBlur] = useState(20)
  const [image, setImage] = useState(null)
  const [titles, setTitles] = useState([])
  const [inputTitle, setInputTitle] = useState("")
  const [correctTitle, setCorrectTitle] = useState("")
  const [incorrectTitles, setIncorrectTitles] = useState([])
  const debounceRef = useRef(null)

  useEffect(() => {
    getRandomAnime()
  }, [])

  const getRandomAnime = async () => {
    const response = await fetch(RANDOM_ANIME_URL)
    const data = await response.json()
    const popularAnimes = data.data
    const randomAnime = popularAnimes[Math.floor(Math.random() * popularAnimes.length)]
    setImage(randomAnime.images.webp.large_image_url)
    setCorrectTitle(randomAnime.titles[0].title)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (incorrectTitles.includes(inputTitle)) return

    if (correctTitle === inputTitle && correctTitle !== "") {
      setBlur(0)
      setInputTitle(inputTitle)
      return
    }
    setBlur((prevBlur) => prevBlur - 2)
    setIncorrectTitles((prevArr) => [...prevArr, inputTitle])
  }

  const fetchAnimeTitles = useCallback(async (query) => {
    if (query.length < 2) {
      setTitles([])
      return
    }

    const response = await fetch(`${ANIME_TITLE_SEARCH}${query}`)
    const data = await response.json()
    const newTitles = data.data.map((anime) => anime.titles[0].title)
    setTitles(newTitles)
  }, [])

  const handleChange = async (e) => {
    e.preventDefault()
    const newTitle = e.target.value
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    if (correctTitle === newTitle) return
    setInputTitle(newTitle)

    debounceRef.current = setTimeout(() => {
      fetchAnimeTitles(newTitle)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-100">
      <h1 className="text-4xl font-bold text-center text-purple-400 mb-8 font-anime">Nimi-Anime-Quiz</h1>
      <header className="mb-8">
        <form className="flex justify-center space-x-4">
          <select className="block w-32 px-3 py-2 text-base bg-gray-800 border-gray-700 text-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Start
          </button>
        </form>
      </header>
      <main className="max-w-[50%] max-h-screen mx-auto">
        <h3 className="text-2xl font-semibold text-center text-blue-300 mb-6">¿Qué anime es?</h3>
        <section className="flex flex-col items-center space-y-6 mb-8">
          <div className="flex gap-[40px] w-full">
            <div className="min-w-[20%] flex flex-col gap-[20px]">
              {incorrectTitles.map((title) => (
                <p key={title} className="text-red-400">
                  {title}
                </p>
              ))}
            </div>
            <div
              className={`min-w-[50%] max-h-[50%] flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 w-full`}
              style={{ filter: `blur(${blur}px)` }}
            >
              {image && <img src={image || "/placeholder.svg"} alt="Imagen del anime" className="w-full h-auto" />}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              value={inputTitle}
              onChange={handleChange}
              className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-64 sm:text-sm bg-gray-800 border-gray-700 text-gray-300 rounded-md"
              placeholder="Enter anime title"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enviar
            </button>
          </div>
          <ul className="bg-gray-800 shadow overflow-hidden rounded-md max-w-md mx-auto">
            {titles.map((title, index) => (
              <li
                key={index}
                onClick={() => setInputTitle(title)}
                className="px-6 py-4 cursor-pointer hover:bg-gray-700 text-gray-300"
              >
                {title}
              </li>
            ))}
          </ul>
        </form>
            
          </div>
        </section>
        <div className="w-1/4">
              {inputTitle=== correctTitle && (
                <h3 className="text-green-400 font-semibold">{correctTitle}</h3>
              )}
            </div>
      </main>
    </div>
  )
}

