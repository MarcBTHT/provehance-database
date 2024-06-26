import { useState, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar, user } from "@nextui-org/react";
import { abiSBT, addressSBT } from '../constants/abiSBT';
import { abiFanToken, addressFanToken } from '../constants/abiFanToken';
import Image from 'next/image';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { getAccount } from '@wagmi/core'
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { parseUnits } from 'viem'

interface MintButtonProps {
    company_name: string;
    user_name: string;
    fidelityLevel: number;
}

const MintButton: React.FC<MintButtonProps> = ({ company_name, user_name, fidelityLevel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContentSBT, setModalContentSBT] = useState('');
    const [modalContentFan, setModalContentFan] = useState('');

    const [accountAddress, setAccountAddress] = useState<`0x${string}`>('0x0');

    const closeModal = () => setIsModalOpen(false);

    const { walletConnector } = useDynamicContext();

    async function handleMintSBTandFan() { // To mintSBT and mintFanToken
        console.log('walletConnect', walletConnector)
        if (walletConnector?.supportsNetworkSwitching()) {
            await walletConnector.switchNetwork({ networkChainId: 88888 });
            console.log("Success! Network switched");
        }
        const account = getAccount();
        if (account && account.address) {
            // Only set the account address if it's defined
            setAccountAddress(account.address);
            console.log('address', account);
            await mintSBT(fidelityLevel, user_name, company_name);
            let amountInWei = parseUnits('100', 18);
            await mintFanToken(account.address, amountInWei);
        } else {
            console.error("Account or account address is undefined.");
        }
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
            console.log('hash SBT', hash);
            setModalContentSBT(hash);
        } catch (error) {
            console.error(error);
        }
    }
    async function mintFanToken(to: `0x${string}`, amount: BigInt) {
        try {
            const config = await prepareWriteContract({
                address: addressFanToken,
                abi: abiFanToken,
                functionName: 'mint',
                args: [to, amount],
            })
            const { hash } = await writeContract(config)
            console.log('hash Fan', hash);
            setModalContentFan(hash);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Button color="default" variant="bordered" onClick={() => handleMintSBTandFan()} size="lg" className="flex items-left justify-between p-4">
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
                        <p className="text-sm">Mint your rewards</p>
                    </div>
                </div>
            </Button>

            {isModalOpen && (
                <Modal backdrop={'blur'} isOpen={isModalOpen} onClose={closeModal} className="overflow-auto max-w-4xl w-full mx-auto">
                    <ModalContent className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <ModalHeader className="flex justify-start items-center p-5 border-b">
                            <Image
                                src="/images/icon/success.svg"
                                alt="Logo"
                                width={36}
                                height={36}
                                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 mr-2"
                            />
                            <p className="text-xl font-bold break-words">Well Done!</p>
                        </ModalHeader>
                        <ModalBody>
                            <img
                                src={`https://api.cloudnouns.com/v1/pfp?text=${company_name}-${user_name}&size=50`}
                                alt="Logo"
                                width={100}
                                height={100}
                                className="items-center text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 mr-2"
                            />
                            <div className="">
                                <p className="font-semibold" >SBT hash:</p>
                                <p>{modalContentSBT}</p>
                                <p className="font-semibold" >Fan Token hash:</p>
                                <p>{modalContentFan}</p>
                                <p className="pt-3 break-words font-semibold">The SBT hash is your unique proof. Please keep it safe as it represents your ability to prove your actions.</p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-between items-center p-5 border-t">
                            <Button color="danger" variant="light" onPress={closeModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )
            }
        </div >
    );
};

export default MintButton;