'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="flex justify-center items-center z-10 py-10">
            <div className="flex justify-between items-center w-full pl-4">
                <Link href="/" className="flex items-center">
                    <div className="mr-5 relative">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={48}
                            height={48}
                        />
                    </div>
                    <span className="text-2xl font-normal font-bold text-white hidden sm:block">
                        FideRewards
                    </span>
                </Link>
                <div className="flex flex-col items-center sm:items-start">
                    <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <Image
                            src="/images/icon/menu.svg"
                            alt="Menu"
                            width={25}
                            height={25}
                        />
                    </button>
                    <nav className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-row items-center`}>
                        <div className="flex flex-row items-center">
                            <Dropdown
                                showArrow
                                classNames={{
                                    base: "before:bg-default-200",
                                    content: "py-1 px-1 border border-default-200 bg-black bg-opacity-30",
                                }}>
                                <DropdownTrigger>
                                    <button
                                        className='text-white hover:text-lavender px-6 py-2 text-xl transition duration-300'
                                    >
                                        Products
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="product menu" disabledKeys={["swap"]}>
                                    <DropdownItem key="proof" href="/proof-of-fidelity" className='text-white'>Proof of Fidelity</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <Link href="/company-event" className="text-white hover:text-lavender ml-4 px-6 py-2 text-xl transition duration-300">
                            Company
                        </Link>
                        <Link href="/#contact" className="text-white hover:text-lavender ml-4 px-6 py-2 text-xl transition duration-300">
                            Contact
                        </Link>
                        <Button variant="bordered" href="/" size='lg' className={`${isOpen ? 'flex' : 'hidden'} sm:hidden items-center text-gray-700 text-xl border-gray-700 `}>
                            Enroll Now
                        </Button>
                    </nav>
                </div>

                <Dropdown
                    showArrow
                    classNames={{
                        base: "before:bg-default-200",
                        content: "py-1 px-1 border border-default-200 bg-black bg-opacity-30",
                    }}>
                    <DropdownTrigger>
                        <Button variant="bordered" href="/" size='lg' className={`hidden sm:block text-gray-700 text-xl border-gray-700 mr-4 `}>
                            Enroll Now
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Login menu">
                        <DropdownItem key="sign-in" href="/" className='text-white'>Sign In</DropdownItem>
                        <DropdownItem key="sign-up" href="/" className='text-white'>Sign Up</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    );
}

export default Header;