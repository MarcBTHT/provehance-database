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

const AztecButton: React.FC<AztecButtonProps> = ({ condition_value, numbers_of_transaction }) => {
    async function handleGenerateProof() { 
        console.log('condition_value', condition_value)
        console.log('numbers_of_transaction', numbers_of_transaction)
        const backend = new BarretenbergBackend(noirjs_demo);
        const noir = new Noir(noirjs_demo, backend);
       
        const input = { x: numbers_of_transaction, y: condition_value };
        const proof = await noir.generateFinalProof(input);
        console.log('result', proof.proof)
    }
    
    return (
        <div>
            <Button color="default" variant="bordered" onClick={() => handleGenerateProof()} size="lg" className="flex items-left justify-between p-4">
                <div className="flex items-center">
                    <div className="ml-3">
                        <h2 className="mb-1">Generate your ZK proof</h2>
                    </div>
                </div>
            </Button>
        </div >
    );
};

export default AztecButton;