import React from 'react'
import Carret from './Caret/Caret'
import Words from './Words/Words'
import { TestContext } from '../../providers/TestProvider'

const Test: React.FC = () => {
  const { inputRef, handleInputWords, wordsInput } =
    React.useContext(TestContext)

  return (
    <>
      <input
        ref={inputRef}
        onChange={handleInputWords}
        value={wordsInput}
        id='wordsInput'
        className='full-width'
        type='text'
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        list='autocompleteOff'
        spellCheck='false'
      />
      <Carret />
      <Words />
    </>
  )
}

export default Test
