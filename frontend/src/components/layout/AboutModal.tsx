import { X, Heart } from 'lucide-react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center pt-2">
          <h2 className="text-xl font-bold text-text-primary mb-4">
            WPRB.rocks
          </h2>

          <p className="text-text-secondary mb-4">
            Listen to WPRB playlists on Spotify
          </p>

          <p className="text-text-secondary flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by{' '}
            <a
              href="https://github.com/gammons"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Grant Ammons
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
