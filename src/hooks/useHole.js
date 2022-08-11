import { useContext } from 'react'
import {HoleContext} from "../contexts/HoleContext";

const useHole = () => useContext(HoleContext)

export default useHole
