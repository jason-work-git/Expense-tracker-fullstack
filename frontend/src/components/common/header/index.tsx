import React from 'react';
import {WalletCardsIcon} from "lucide-react";
import {ModeToggle} from "@/components/ui/mode-toggle";

const Header = () => {
    return (
        <header className=" w-screen min-h-[72px] h-[72px] bg-background border-b">
            <div className="flex container justify-between items-center h-full w-full">
                <div className='flex items-center gap-x-3'>
                    <WalletCardsIcon/>
                    <span className='text-[24px]'>مدیریت مالی</span>
                </div>
                <ModeToggle/>
            </div>
        </header>
    );
};

export default Header;