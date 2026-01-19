import { Routes, Route } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import DayView from './pages/DayView'
import ShowView from './pages/ShowView'
import PlaylistView from './pages/PlaylistView'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<DayView />} />
        <Route path="/:date" element={<DayView />} />
        <Route path="/show/:slug" element={<ShowView />} />
        <Route path="/:date/show/:slug" element={<PlaylistView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
