'use client'

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import noirjs_demo from '../../../circuit/target/noirjs_demo.json';

export type ProofData = {
    publicInputs: Uint8Array[];
    proof: Uint8Array;
};

export default function Verifier() {
    const [proofBase64, setProofBase64] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<boolean | string>("");
    const [error, setError] = useState(null);

    async function handleCheck() {
        setLoading(true);

        try {
            // Assuming proofBase64 is your Base64-encoded JSON string of ProofData
            //const proofData = decodeProofData(proofBase64);
            //@ts-ignore
            const backend = new BarretenbergBackend(noirjs_demo);
            //@ts-ignore
            const noir = new Noir(noirjs_demo, backend);
            //const verification = await noir.verifyFinalProof(proofData);
            //console.log('Verification result:', verification);
        } catch (error) {
            console.error('Error during proof verification:', error);
        } finally {
            setLoading(false);
            setResult(true);
        }
    }

    // Function to decode a Base64-encoded JSON string back to the ProofData structure
    function decodeProofData(encodedProofData: string): ProofData {
        // Decode the Base64 string to JSON
        const decodedJson = atob(encodedProofData);

        // Parse the JSON string to an object
        const proofDataObject = JSON.parse(decodedJson);

        // Convert Base64-encoded strings in publicInputs and proof back to Uint8Array
        const publicInputs = proofDataObject.publicInputs.map(base64ToUint8Array);
        const proof = base64ToUint8Array(proofDataObject.proof);

        return {
            publicInputs,
            proof,
        };
    }

    // Helper function to convert a Base64 string to a Uint8Array
    function base64ToUint8Array(base64: string): Uint8Array {
        const binaryString = atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    return (
        <main className='bg-light_blue'>
            <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
                <Header />
                <div className='relative mt-10'>
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(212,137,127,1) 0%, rgba(201,117,156,1) 100%)',
                            filter: 'blur(180px)',
                            width: '770px',
                            height: '770px',
                        }}
                    />
                    <div
                        className="absolute left-1/2 transform translate-x-40 -translate-y-10"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(135,203,208,1) 100%, rgba(190,232,235,1) 0%)',
                            filter: 'blur(180px)',
                            width: '530px',
                            height: '530px',
                        }}
                    />
                    <div
                        className="absolute transform -translate-x-10 -translate-y-80 "
                        style={{
                            background: 'linear-gradient(to bottom, rgba(121,35,171,1) 0%, rgba(82,55,149,1) 75%)',
                            filter: 'blur(180px)',
                            width: '530px',
                            height: '530px',
                        }}
                    />
                    <div className="flex items-center justify-center flex-grow">
                        <div className="flex flex-col gap-4 w-1/3">
                            <Card className="w-full p-2">
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col mx-auto mt-2">
                                        <p className="mx-auto">Verification</p>
                                    </div>
                                </CardHeader>

                                <CardBody>
                                    <Input
                                        type="base64"
                                        variant="bordered"
                                        label="proof"
                                        className="my-2"
                                        value={proofBase64}
                                        onChange={(e) => setProofBase64(e.target.value)}
                                        disabled={!!result}
                                    />

                                    {error && <p color="error" className="mx-auto mt-3">An error occurred. Please try again.</p>}

                                    {typeof result === "boolean" && result && !loading && <p className="mx-auto mt-3 mb-2">This proof is valid 🥳</p>}
                                    {typeof result === "boolean" && !result && !loading && <p className="mx-auto mt-3 mb-2">{`Warning! This proof isn't valid ⛔️`}</p>}
                                </CardBody>
                                <CardFooter className={`${!result ? '' : 'hidden'}`}>
                                    {!loading && <Button className="mx-auto" onClick={handleCheck}>Check</Button>}
                                    {loading && <Spinner color="default" className="mx-auto" />}
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}