import { useContext } from 'react'
import { LaminationContext } from '../contexts/LaminationContext'

const useLamination = () => useContext(LaminationContext)

export default useLamination
