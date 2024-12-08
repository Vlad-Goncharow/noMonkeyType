import React from 'react'
import { TestContext } from '../providers/TestProvider'

function useCommandLine() {
  const { setCommandLineIsOpen, commandLineIsOpen, myKeyDown } =
    React.useContext(TestContext)

  const [keys, setKeys] = React.useState<Set<string>>(new Set())

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      const key = e.key
      const isCommandTriggered = e.ctrlKey && e.shiftKey && key === 'P'

      if (isCommandTriggered && setCommandLineIsOpen) {
        e.preventDefault()
        e.stopPropagation()
        setCommandLineIsOpen(true)
        return
      }

      if (commandLineIsOpen && key === 'Escape' && setCommandLineIsOpen) {
        setCommandLineIsOpen(false)
        return
      }

      if (!commandLineIsOpen && key === 'Escape' && setCommandLineIsOpen) {
        setCommandLineIsOpen(true)
        return
      }

      setKeys((prevKeys) => {
        const newKeys = new Set(prevKeys)
        newKeys.add(key)
        return newKeys
      })
    },
    [commandLineIsOpen, setCommandLineIsOpen]
  )

  const handleKeyUp = React.useCallback((e: KeyboardEvent) => {
    const key = e.key
    setKeys((prevKeys) => {
      const newKeys = new Set(prevKeys)
      newKeys.delete(key)
      return newKeys
    })
  }, [])

  React.useEffect(() => {
    if (!commandLineIsOpen) {
      setKeys(new Set())
    }
  }, [commandLineIsOpen])

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  React.useEffect(() => {
    if (keys.has('Shift') && keys.has('Control') && myKeyDown) {
      document.removeEventListener('keydown', myKeyDown)
    }
  }, [keys, myKeyDown])
}

export default useCommandLine
