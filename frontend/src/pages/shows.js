// @flow

import React from "react"
import { Link } from "react-router-dom"

import { useQuery, gql } from "@apollo/client"

const Shows = (props: any) => {
  const slug = props.match.params.slug

  const q = gql`
    {
      playlists {
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

  return (
    <React.Fragment>
      <h2 className="subtitle">All Shows</h2>
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
              </Link>{" "}
              with {playlist.dj.name}
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default Shows
