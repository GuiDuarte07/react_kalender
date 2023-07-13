import { useRef, useState } from "react"

const useUndo = (timer: number) => {
  const [undo, setUndo] = useState('')
  const setIntervalUndo = useRef<NodeJS.Timer>()

  function startUndo(message: string) {
    setUndo(message)
    setIntervalUndo.current = setInterval(() => !undo && setUndo(''), timer)
  }

  function clearUndo() {
    !undo && setUndo('')
    setIntervalUndo.current && clearInterval(setIntervalUndo.current)
    console.log(setIntervalUndo.current)
    setIntervalUndo.current = undefined
  }

  return {undo, startUndo, clearUndo}
}

export default useUndo
