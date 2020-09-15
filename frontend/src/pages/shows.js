// @flow

import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

import { useQuery, gql } from "@apollo/client"

import "./css/shows.css"

const queryDate = (date: Date): string => {
  return date.toISOString().split("T")[0]
}

const prettyDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const NextDateButton = (props) => {
  return (
    <button className="button" onClick={props.onClick}>
      <span className="icon">
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </button>
  )
}

const Shows = (props: any) => {
  const [date, setDate] = React.useState(new Date())

  const q = gql`
    {
      playlistsByDate(date: "${queryDate(date)}") {
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

  const onSetPrevDay = () => {
    const d = new Date()
    d.setDate(date.getDate() - 1)
    setDate(d)
  }

  const onSetNextDay = () => {
    const d = new Date()
    d.setDate(date.getDate() + 1)
    setDate(d)
  }

  if (error) return <div>Error!</div>

  return (
    <React.Fragment>
      <div className="airdate">
        <button className="button" onClick={onSetPrevDay}>
          <span className="icon">
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
        </button>

        <h2 className="title is-2 airdate-title"> {prettyDate(date)} </h2>

        {date < new Date(queryDate(new Date())) && (
          <NextDateButton onClick={onSetNextDay} />
        )}
      </div>

      {loading && <h2 className="subtitle">Loading...</h2>}

      <ul>
        {data &&
          data.playlistsByDate.map((playlist, idx) => {
            return (
              <li key={idx}>
                <Link
                  to={{
                    pathname: `/show/${playlist.slug}/${playlist.date}`,
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
