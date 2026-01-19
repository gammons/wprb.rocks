import { Outlet } from 'react-router-dom'
import Header from './Header'
import PlayerBar from './PlayerBar'

export default function RootLayout() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 pb-24">
        <Outlet />
      </main>
      <PlayerBar />
    </div>
  )
}
