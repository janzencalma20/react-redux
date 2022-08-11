import { useContext } from 'react'
import { ConductorContext } from '../contexts/ConductorContext'

const useConductor = () => useContext(ConductorContext)

export default useConductor
