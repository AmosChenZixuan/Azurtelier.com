interface SpinnerProps {
  size?: number
  color?: string
}

export default function Spinner({ size = 144, color = 'border-primary-500' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-b-2 border-t-2 ${color}`}
        style={{ height: size, width: size }}
      />
    </div>
  )
}
