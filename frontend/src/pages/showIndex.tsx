import React from "react"
import { Link } from "react-router-dom"

import { useQuery, gql } from "@apollo/client"

const ShowIndex = (props: any) => {
  const slug = props.match.params.slug

  const q = gql`
    {
      playlists(slug: "${slug}") {
        dj {
          name
        }
        id
        name
        slug
        date
      }
    }
  `
  const { loading, error, data } = useQuery(q)

  if (loading) return <div>Fetching..</div>
  if (error) return <div>Error!</div>

  const showName = data.playlists[0].name
  const djName = data.playlists[0].dj.name

  return (
    <React.Fragment>
      <h2 className="title is-2 airdate-title">
        {showName} with {djName}
      </h2>

      <h2 className="title is-2 airdate-title">Airdates:</h2>
      <ul>
        {data.playlists.map((playlist, idx) => {
          return (
            <li key={idx}>
              <Link
                to={{
                  pathname: `/${playlist.date}/show/${playlist.slug}`,
                  state: { id: playlist.id },
                }}
              >
                {playlist.date}
              </Link>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default ShowIndex
