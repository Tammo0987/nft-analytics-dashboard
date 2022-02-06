import {ethers} from "ethers";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const useUSDFormat = (value: number) => formatter.format(value || 0).split('.')[0];

export const useWeb3Provider = () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
        alert('Please install MetaMask!');
    }

    ethereum.on('chainChanged', () => window.location.reload())

    return new ethers.providers.Web3Provider(ethereum, 'any');
};

export const isMetaMaskConnected = async () => {
    const provider = useWeb3Provider();
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
};

export const useSigner = () => {
    return useWeb3Provider().getSigner();
};

export const useLoggedInNetworkChainId = async () => {
    const {chainId} = await useWeb3Provider().getNetwork();
    return chainId;
};

export const zeroAddress = '0x0000000000000000000000000000000000000000';