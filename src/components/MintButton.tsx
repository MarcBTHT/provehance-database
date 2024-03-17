import { useState, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar } from "@nextui-org/react";
import { abiSBT, addressSBT } from '../constants/abiSBT';
import Image from 'next/image';
import { spicy } from 'wagmi/chains';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { switchNetwork } from '@wagmi/core'
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

interface MintButtonProps {
    company_name: string;
    user_name: string;
    fidelityLevel: number;
}

const MintButton: React.FC<MintButtonProps> = ({ company_name, user_name, fidelityLevel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const closeModal = () => setIsModalOpen(false);
    const { walletConnector } = useDynamicContext();


    async function handleMintSBT() { // To mintSBT
        // const network = await switchNetwork({
        //     chainId: 1,
        //   })
        //   console.log('network', network)
        console.log('BONJOUR')
        console.log('walletConnect', walletConnector)
        if (walletConnector?.supportsNetworkSwitching()) {
            await walletConnector.switchNetwork({ networkChainId: 88888 });
            console.log("Success! Network switched");
        }
        //await mintSBT(fidelityLevel, user_name, company_name)
    }

    async function mintSBT(fidelityLevel: number, name: string, company: string) {
        try {
            const config = await prepareWriteContract({
                address: addressSBT,
                abi: abiSBT,
                functionName: 'claimSBT',
                args: [fidelityLevel, name, company],
            })
            console.log('config', config);
            const { hash } = await writeContract(config)
            console.log('hash', hash);
            setModalContent(hash);
            setIsModalOpen(true);

        } catch (error) {
            console.error(error);
        }
    }
    // erc20 : function mint(address to, uint256 amount)
    return (
        <div>
            <Button color="default" variant="bordered" onClick={() => handleMintSBT()} size="lg" className="flex items-left justify-between p-4">
                <div className="flex items-center">
                    <Image
                        src="/images/chiliz-logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
                    />
                    <div className="ml-3">
                        <h2 className="mb-1">Chiliz Network</h2>
                        <p className="text-sm">Super powerful</p>
                    </div>
                </div>
            </Button>
        </div >
    );
};

export default MintButton;