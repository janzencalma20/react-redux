import { useContext } from 'react'
import {CoolingContext} from "../contexts/CoolingContext";

const useCooling = () => useContext(CoolingContext)

export default useCooling;
