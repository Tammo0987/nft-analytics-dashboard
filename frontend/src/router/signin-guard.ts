import {isMetaMaskConnected} from "../composables";

const checkIfUserIsSignedIn = async () => {
    const isSignedIn = await isMetaMaskConnected();
    if (isSignedIn) {
        return true;
    } else {
        return '/signin'
    }
}

export default checkIfUserIsSignedIn;