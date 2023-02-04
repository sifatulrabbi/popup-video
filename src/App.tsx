import { useState } from "react"
import { VideoPopup } from "@/components/VideoPopup"
import type { Position } from "@/types"

const positions: Array<{ name: string; value: Position }> = [
  { name: "Top Left", value: "top-left" },
  { name: "Top Right", value: "top-right" },
  { name: "Bottom Left", value: "bottom-left" },
  { name: "Bottom Right", value: "bottom-right" },
]

const App: React.FC = () => {
  const [position, setPosition] = useState<Position>("bottom-left")

  return (
    <div className="w-full min-h-screen grid place-content-center">
      <VideoPopup position={position} />

      <div className="grid grid-cols-2 gap-2">
        {positions.map((pos) => (
          <button
            key={pos.value}
            onClick={() => setPosition(pos.value)}
            className="rounded-xl px-4 py-3 border-2 border-gray-800 text-gray-800 hover:bg-gray-200 transition-colors duration-300 uppercase text-sm"
          >
            {pos.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
