import { useRef, useState, useEffect } from "react"
import {
  MdVolumeUp,
  MdVolumeOff,
  MdMinimize,
  MdPlayArrow,
  MdLink,
} from "react-icons/md"
import { disallowPropagate } from "@/utils"
import type { Position } from "@/types"
import sampleVideo from "@/assets/videos/video-with-sound.mp4"

export const VideoPopup: React.FC<{
  position?: Position
}> = ({ position }) => {
  const [expand, setExpand] = useState(false)
  const [muted, setMuted] = useState(false)
  const [computedPosition, setComputedPosition] = useState("bottom-6 left-6")
  const [height, setHeight] = useState(220)
  const [width, setWidth] = useState(130)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0

    const maxW = window.innerWidth - 48
    setWidth(maxW > 330 ? 330 : maxW)
  }, [expand])

  useEffect(() => {
    setHeight(width * 1.7)
  }, [width])

  useEffect(() => {
    let computedPos = "bottom-6 left-6"

    switch (position) {
      case "top-right":
        computedPos = "top-6 right-6"
        break
      case "top-left":
        computedPos = "top-6 left-6"
        break
      case "bottom-right":
        computedPos = "bottom-6 right-6"
        break
    }

    setComputedPosition(computedPos)
  }, [position])

  return (
    <div
      onClick={() => setExpand(true)}
      className={`fixed z-[2000] ${computedPosition} flex flex-col justify-start items-start rounded-2xl bg-white w-full overflow-hidden h-full
      transition-[max-height_max-width] duration-300
      ${
        expand
          ? "shadow-2xl max-h-[560px] max-w-[330px]"
          : "shadow-xl max-h-[220px] max-w-[130px] cursor-pointer"
      }`}
      style={{ height: height, width: width }}
    >
      <video
        ref={videoRef}
        src={sampleVideo}
        autoPlay
        loop
        muted={expand ? muted : true}
        className="absolute inset-0 object-cover min-h-full max-w-full"
      ></video>

      {!expand && (
        <div className="absolute inset-0 text-white text-5xl grid place-content-center bg-gray-700/20">
          <MdPlayArrow />
        </div>
      )}

      <div
        className={`relative w-full h-full transition-[opacity] duration-300
        ${expand ? "opacity-100" : "opacity-0"}`}
      >
        {expand && (
          <button
            onClick={disallowPropagate(() => setExpand(false))}
            className="absolute top-0 right-2 text-white text-3xl p-2"
          >
            <MdMinimize />
          </button>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-700/50">
          <div className="flex flex-row justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-white font-sans">
              Popup Video Title
            </h4>
            <button
              onClick={() => setMuted((p) => !p)}
              className="text-gray-200 text-2xl rounded hover:text-white transition-colors duration-300"
            >
              {muted ? <MdVolumeOff /> : <MdVolumeUp />}
            </button>
          </div>

          <h5 className="font-medium text-gray-200">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
            maxime suscipit perspiciatis quia?
          </h5>
          <button className="w-full py-3 flex flex-row justify-center items-center gap-4 bg-gray-800 rounded-full text-gray-300 mt-6 hover:bg-gray-700 transition-colors duration-300">
            Call To Action <MdLink />
          </button>
        </div>
      </div>
    </div>
  )
}
