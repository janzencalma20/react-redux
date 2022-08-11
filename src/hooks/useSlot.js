import { useContext } from 'react'
import { SlotContext } from '../contexts/SlotContext'

const useSlot = () => useContext(SlotContext)

export default useSlot
