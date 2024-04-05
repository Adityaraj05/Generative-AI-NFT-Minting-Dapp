import abi from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json"

export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS
export const CONTRACT_ABI = abi.abi

export const PINATA_API_URL = process.env.REACT_APP_PINATA_API_URL
export const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY
export const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY

export const IMG_GEN_AI_API_URL = process.env.REACT_APP_IMG_GEN_AI_API_URL