import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHouse } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { PiMoneyFill } from "react-icons/pi";
import { TbReport } from "react-icons/tb";

const sideBarItems = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <BsHouse className="icon" />,
  },
  {
    path: '/dashboard/account',
    name: 'Accounts',
    icon: <MdOutlineAccountBalanceWallet className="icon" />,
  },
  {
    path: '/dashboard/transaction',
    name: 'Transactions',
    icon: <FaMoneyBillTransfer className="icon" />,
  },
  {
    path: '/dashboard/burget',
    name: 'Burget',
    icon: <PiMoneyFill className="icon" />,
  },
  {
    path: '/dashboard/report',
    name: 'Report',
    icon: <TbReport className="icon" />,
  },
];

interface ItemProps {
    path?: string;
    name: string;
    icon: React.ReactNode;
}

function Navbar() {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  console.log(activeItem)

  return (
    <ul className=''>
    {sideBarItems.map((item:ItemProps, index)=> (
      <li key={index} className='flex flex-row justify-between items-center'>
        <Link 
        to={item.path || '/'}
        onClick={()=>setActiveItem(item.name)}
        className={`flex flex-row items-center my-2 font-accent  text-lg font-semibold gap-2 hover:text-primary ${activeItem == item.name ? 'text-primary' : 'text-Grey-50'}`}>
            <div className="">{item.icon}</div>
            <div className=''>{item.name}</div>
        </Link>
        {activeItem == item.name ? 
        <div className="bg-primary h-8 w-1.5 rounded-l-lg"></div> 
        : ''}
        
        
      </li>
    ))}
    </ul>
  )
}

export default Navbar