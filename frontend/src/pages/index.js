import React from "react"
import { Link } from "react-router-dom"

import { useQuery, gql } from "@apollo/client"

const Q = gql`
  {
    playlists {
      dj {
        name
      }
      id
      name
      slug
      createdAt
    }
  }
`

const Index = () => {
  const { loading, error, data } = useQuery(Q)
  if (loading) return <div>Fetching..</div>
  if (error) return <div>Error!</div>

  return (
    <React.Fragment>
      <p>Index page</p>
      <button className="button is-primary">Primary button</button>
      <ul>
        {data.playlists.map((playlist, idx) => {
          return (
            <li key={idx}>
              <Link
                to={{
                  pathname: `/show/${playlist.slug}`,
                  state: { id: playlist.id },
                }}
              >
                {playlist.name}
              </Link>
              with {playlist.dj.name}
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default Index
