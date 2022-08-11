import { useContext } from 'react'
import {HousingContext} from "../contexts/HousingContext";
const useHousing = () => useContext(HousingContext)

export default useHousing
