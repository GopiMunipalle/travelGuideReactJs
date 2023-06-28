import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const URL = 'https://apis.ccbp.in/tg/packages'

function TravelGuide() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUsersData = async apiUrl => {
    setLoading(true)
    try {
      const response = await fetch(apiUrl)
      const userData = await response.json()
      const updatedData = userData.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      setLoading(false)
      setData(updatedData)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsersData(URL)
  }, [])

  if (loading) {
    return (
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  return (
    <div className="bg-container">
      <h1 className="heading">Travel Guide</h1>
      <ul className="ul-list-container">
        {data.map(each => {
          const {id, name, imageUrl, description} = each
          return (
            <li className="list-items" key={id}>
              <div className="items-container">
                <img className="image" src={imageUrl} alt={name} />
                <div className="head-para-card">
                  <h4>{name}</h4>
                  <p>{description}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default TravelGuide
