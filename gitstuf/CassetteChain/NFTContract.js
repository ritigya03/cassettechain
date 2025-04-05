import { ethers } from "ethers";

const contractAddress = "0xD2d8f11d60B578F86De6d788b931cb1D9197c5Bc"; // Your NFT contract address

const abi = [
  "function tokenURI(uint256 tokenId) public view returns (string)"
];

export const getNFTMetadata = async (tokenId) => {
  try {
    // Connect to Ethereum provider (Metamask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Call tokenURI function to get metadata
    const tokenURI = await contract.tokenURI(tokenId);
    
    // Fetch metadata from IPFS (if it's an IPFS link)
    const response = await fetch(tokenURI);
    const metadata = await response.json();

    return metadata;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
  }
};
