import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { createPortal } from 'react-dom'
import { UseClickOutside } from '../../../hooks/UseClickOutside'
import { TestContext } from '../../../providers/TestProvider'
import { allCommands } from '../../../utils/commandLine/lists'
import CommandItem from './components/Command/Command'

function CommandLine() {
  const { commandLineIsOpen, setCommandLineIsOpen } =
    React.useContext(TestContext)
  const commandLineRef = React.useRef<HTMLDivElement | null>(null)

  const [inputValue, setInputValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const closeCommandLine = () => {
    if (setCommandLineIsOpen) setCommandLineIsOpen(false)
  }
  UseClickOutside(commandLineRef, () => closeCommandLine())

  const myCommands = React.useMemo(() => {
    const searchByTitle = allCommands.filter((el) =>
      el.title.toLowerCase().includes(inputValue.toLowerCase())
    )

    const searchByDisplayValue = allCommands.map((el) => ({
      ...el,
      list: el.list.filter((item) =>
        item.display.toLowerCase().includes(inputValue.toLowerCase())
      ),
    }))

    const mergedResults = searchByDisplayValue.map((displayRes) => {
      const titleMatch = searchByTitle.find(
        (titleRes) => titleRes.title === displayRes.title
      )

      return {
        ...displayRes,
        list: [
          ...(titleMatch ? titleMatch.list : []),
          ...displayRes.list,
        ].filter(
          (item, index, arr) =>
            arr.findIndex((el) => el.id === item.id) === index
        ),
      }
    })

    return mergedResults.filter(
      (el) => el.list.length > 0 || searchByTitle.includes(el)
    )
  }, [inputValue])

  React.useEffect(() => {
    if (inputRef.current && commandLineIsOpen) {
      inputRef.current.focus()
    }
  }, [commandLineIsOpen])

  return (
    <>
      {commandLineIsOpen &&
        createPortal(
          <div id='commandLine' className='modalWrapper'>
            <div ref={commandLineRef} className='modal'>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  alignItems: 'center',
                }}
              >
                <div className='searchicon'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                  ref={inputRef}
                  type='text'
                  className='input'
                  value={inputValue}
                  placeholder='Search...'
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className='suggestions'>
                {myCommands.map((el) =>
                  el.list.map((command) => (
                    <CommandItem title={el.title} command={command} />
                  ))
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default CommandLine
