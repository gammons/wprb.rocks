# WPRB.rocks

A Spotify-integrated web player for [WPRB](https://wprb.com) radio playlists. Browse playlists by date, explore show archives, and listen to tracks directly in your browser with your Spotify Premium account.

**Live site:** [wprb.rocks](https://wprb.rocks)

## Features

- Browse WPRB playlists by date
- View all episodes of a specific show
- Play full playlists or individual tracks via Spotify
- Spotify Web Playback SDK integration with custom player controls
- Dark Spotify-inspired UI
- Mobile-responsive design

## Architecture

### Backend (Rails API)

- **Framework:** Ruby on Rails 7.1 in API mode
- **Database:** SQLite
- **API:** GraphQL via `graphql-ruby`
- **Data Source:** Scrapes playlist data from [Spinitron](https://spinitron.com/WPRB)

The backend runs a daily job to fetch new playlists from Spinitron, matches tracks to Spotify, and stores them in the database.

### Frontend (React SPA)

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS with custom dark theme
- **Data Fetching:** Apollo Client + GraphQL
- **Player:** Spotify Web Playback SDK
- **Routing:** React Router v6
- **Hosting:** Vercel

## How It Works

1. **Playlist Ingestion:** A Rails rake task (`wprb:process_playlists`) runs daily to scrape new playlists from Spinitron's calendar feed.

2. **Spotify Matching:** The `SpotifyInfoStriper` service searches the Spotify API for each track and stores the Spotify track/album/artist IDs.

3. **GraphQL API:** The frontend queries playlists by date or show slug via GraphQL.

4. **Playback:** When a user authenticates with Spotify, the frontend initializes the Web Playback SDK to create a player device. Clicking a track sends play commands to the Spotify API.

## Local Development

### Backend

```bash
cd backend
bundle install
rails db:create db:migrate
rails db:seed  # optional: seed with sample data

# Fetch playlists for the past week
rails wprb:process_historical_playlists

# Start the server
rails s -p 3000
```

Required environment variables:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`

### Frontend

```bash
cd frontend
pnpm install
cp .env.example .env  # Uses localhost URLs by default
pnpm run dev
```

The frontend runs on `http://localhost:5173` and expects the backend at `http://localhost:3000`.

### Spotify Setup

1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add redirect URIs:
   - `http://localhost:3000/spotify/authorize` (development)
   - `https://api.wprb.rocks/spotify/authorize` (production)
3. Set the client ID/secret in the backend environment

## Deployment

- **Backend:** Deployed as a Docker container (see `backend/Dockerfile`)
- **Frontend:** Deployed to Vercel with SPA routing (`vercel.json`)

## License

MIT

## Author

Made with love by [Grant Ammons](https://github.com/gammons)
