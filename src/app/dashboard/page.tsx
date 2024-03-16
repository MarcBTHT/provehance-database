"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Card, CardHeader, CardBody, CardFooter, Button, Progress, Accordion, AccordionItem, Table, TableColumn, TableHeader, TableRow, TableBody, TableCell } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';

interface Transaction {
    id: number;
    wording: string;
    date: string; 
    rdate: string; 
    value: number; 
    type: string;
    // Additional properties can be added here as needed
  }

export default function Dashboard() {
    const [selectedCompany_FidelityProof, setSelectedCompany_FidelityProof] = useState(null);
    const [validTransactions, setValidTransactions] = useState<Transaction[]>([]);

    // CALL POWENS FOR KEY ECHANGES
    const searchParams = useSearchParams()
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        // Check if an access token is already stored in local storage
        const storedToken = localStorage.getItem('accessToken');
        const json = localStorage.getItem('result');
        if (storedToken) { 
            setAccessToken(storedToken);
            console.log(json);
        } else {
            // If no token is stored, proceed to fetch a new one
            const code = searchParams.get('code');
            const data = {
                code: code,
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            };
            console.log('Code:', code);
            console.log('Client ID:', data.client_id);
            console.log('Secret:', data.client_secret);

            fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/token/access`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response: any) => response.json())
                .then((data: any) => {
                    console.log(data);
                    console.log('Access Token:', data.access_token);
                    localStorage.setItem('accessToken', data.access_token);
                    // Update the state with the new access token
                    setAccessToken(data.access_token);
                })
                .catch((error: any) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    // // Call Powens to get the transactions of an account
    function getTransaction() {
        const data = {
            "access_token": accessToken
        }

        if (accessToken) {
            fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0//users/me/transactions?limit=1000`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ accessToken }),
            })
                .then((response) => response.json())
                .then(data => {
                    data.transactions.map((transaction: any) => {
                        if (transaction.wording == name) { // date to be added (transaction.date >= date)
                            validTransactions.push(transaction);
                        }
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.log("Impossible to call Transaction function: access token is undefined.")
        }
    }

    useEffect(() => { // Get the company data selected by the user
        const cachedData = localStorage.getItem('selectedCompany_ProofTransactions');
        if (cachedData) {
            const data = JSON.parse(cachedData);
            console.log('Données de l\'entreprise récupérées :', data);
            setSelectedCompany_FidelityProof(data);
        }
    }, []);

    return (
        <main className='bg-light_blue'>
            <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
                <Header />
                <div className='relative'>
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
                    {accessToken ? (
                        <>
                            {/*Proof of Fidelity*/}
                            <div>
                                {selectedCompany_FidelityProof && (
                                    <section className="flex items-center justify-center my-6">
                                        <div className="flex flex-col gap-4 w-1/2">
                                            <Card className="w-full p-3 flex-col">
                                                <CardHeader className="flex flex-col items-center gap-3">
                                                    <div className="flex flex-col mx-auto mt-2">
                                                        <p className="mx-auto text-3xl font-bold">83%</p>
                                                    </div>
                                                    <div className="w-full">
                                                        <Progress color="danger" aria-label="Loading..." value={70} />
                                                    </div>
                                                </CardHeader>
                                                <CardBody>
                                                    <p className="mx-auto">You don&apos;t fit the requirement.</p>
                                                    <p className="text-xl font-semibold mb-4">Details:</p>
                                                    <Accordion selectionMode="multiple">
                                                        <AccordionItem key="1" aria-label="Transactions" title="Transactions">
                                                            <Table aria-label="Example static collection table" className="m-2 w-9/10">
                                                                <TableHeader>
                                                                    <TableColumn>NAME</TableColumn>
                                                                    <TableColumn>AMOUNT</TableColumn>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    <TableRow key="1">
                                                                        <TableCell>Lacoste</TableCell>
                                                                        <TableCell>$100</TableCell>
                                                                    </TableRow>
                                                                    <TableRow key="2">
                                                                        <TableCell>Lacoste</TableCell>
                                                                        <TableCell>$50</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </AccordionItem>
                                                    </Accordion>
                                                </CardBody>
                                                <CardFooter className="mb-2">
                                                    <Button className="mx-auto" disabled size='lg'>Generate a proof</Button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    </section>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center items-center h-screen">
                                <Button color="danger" size='lg' isLoading className="flex justify-center items-center">
                                    Loading
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </main>
    );
}