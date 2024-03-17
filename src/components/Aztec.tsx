import { useState } from 'react';
import { Button } from "@nextui-org/react";
import Image from 'next/image';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import noirjs_demo from '../../circuit/target/noirjs_demo.json';

interface AztecButtonProps {
    condition_value: number;
    numbers_of_transaction: number;
}
export type ProofData = {
    publicInputs: Uint8Array[];
    proof: Uint8Array;
};

const AztecButton: React.FC<AztecButtonProps> = ({ condition_value, numbers_of_transaction }) => {
    const [proof, setProof] = useState(""); // State to hold the proof

    async function handleGenerateProof() {
        console.log('condition_value', condition_value)
        console.log('numbers_of_transaction', numbers_of_transaction)
        const backend = new BarretenbergBackend(noirjs_demo);
        const noir = new Noir(noirjs_demo, backend);

        const input = { x: numbers_of_transaction, y: condition_value };
        const proofResult = await noir.generateFinalProof(input);
        console.log('result total', proofResult)
        console.log('result', proofResult.proof)
        const proofBase64 = encodeProofData(proofResult)
        setProof(proofBase64);
    }
    // Function to convert Uint8Array to Base64 string
    function uint8ArrayToBase64(buffer: Uint8Array): string {
        return btoa(String.fromCharCode.apply(null, Array.from(buffer)));
    }

    // Function to encode the entire ProofData object
    function encodeProofData(proofData: ProofData): string {
        // Convert all Uint8Arrays to Base64 strings
        const publicInputsBase64 = proofData.publicInputs.map(uint8ArrayToBase64);
        const proofBase64 = uint8ArrayToBase64(proofData.proof);

        // Create a new object with the Base64-encoded data
        const encodedProofData = {
            publicInputs: publicInputsBase64,
            proof: proofBase64,
        };

        // Serialize the object to a JSON string
        return JSON.stringify(encodedProofData);
    }

    // Function to copy the proof to clipboard
    const handleCopyProof = () => {
        navigator.clipboard.writeText(proof).then(() => {
            console.log('Proof copied to clipboard!');
        }, (err) => {
            console.error('Could not copy proof: ', err);
        });
    };

    return (
        <div>
            <Button color="default" variant="bordered" onClick={() => handleGenerateProof()} size="lg" className="flex items-left justify-between p-4">
                <div className="flex items-center">
                    <div className="ml-3">
                        <h2 className="mb-1">Generate your ZK proof</h2>
                    </div>
                </div>
            </Button>
            {proof && (
                <div className="mt-4 flex justify-center">
                    <Button color='primary' onClick={handleCopyProof}>Copy Proof</Button>
                </div>
            )}
        </div >
    );
};

export default AztecButton;