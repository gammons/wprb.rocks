import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps {
  value: number
  max?: number
  onChange?: (value: number) => void
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, max = 100, onChange, className }, ref) => {
    const percentage = (value / max) * 100

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onChange) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const newValue = (x / rect.width) * max
      onChange(Math.max(0, Math.min(max, newValue)))
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-1 w-full cursor-pointer rounded-full bg-text-muted group',
          className
        )}
        onClick={handleClick}
      >
        <div
          className="absolute h-full rounded-full bg-text-primary group-hover:bg-primary transition-colors"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }
