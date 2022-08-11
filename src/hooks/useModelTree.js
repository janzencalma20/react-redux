import { useContext } from 'react'
import { LaminationContext } from '../contexts/LaminationContext'

const useModelTree = () => useContext(LaminationContext)

export default useModelTree
