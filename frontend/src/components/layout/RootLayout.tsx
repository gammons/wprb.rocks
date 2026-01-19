import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import PlayerBar from './PlayerBar'
import AboutModal from './AboutModal'

export default function RootLayout() {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <>
      <div className="flex flex-col h-screen bg-background">
        <Header onAboutClick={() => setShowAbout(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 pb-24">
          <Outlet />
        </main>
        <PlayerBar />
      </div>
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </>
  )
}
