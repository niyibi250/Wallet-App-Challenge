import AccountCard from "../components/accounts/AccountCard";
import TransactionTable from "../components/accounts/TransactionTable";
import CustomButton from "../components/CustomButton";
import { IoMdAdd } from "react-icons/io";


function Accountpage() {
    
  return (
    <div className=" p-8">
        <div className=" flex flex-row items-center justify-between mb-5">
            <div className="text-2xl text-Grey-80 font-bold font-accent">Accounts</div>
            <div className=" flex flex-row gap-6">
                <CustomButton
                    title='Add Category'
                    containerstyle=' py-2 px-8 bg-white rounded-lg border border-Grey-30 hover:border hover:border-primary'
                    textstyle='text-lg text-Grey-80 font-medium'
                    iconstyle='text-lg text-Grey-80 font-medium pr-2'
                    icon={<IoMdAdd/>}
                />
                <CustomButton
                    title='Add Account'
                    containerstyle=' py-2 px-8 bg-primary text-Grey-5 rounded-lg hover:bg-white hover:text-Grey-80 hover:border hover:border-primary'
                    textstyle='text-lg font-medium'
                    iconstyle='text-lg font-medium pr-2 '
                    icon={<IoMdAdd/>}
                />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
                <div className="col-start-1 col-span-1">
                    <AccountCard
                        bankName="Bank of America"
                        accountType="Savings"
                        balance={5000}
                        lastTransaction={{
                        amount: 200,
                        date: "2023-10-15",
                        category: "Grocery",
                        }}
                    />
                </div>
                <div className="col-start-2 col-span-1">
                    <AccountCard
                        bankName="Bank of America"
                        accountType="Savings"
                        balance={5000}
                        lastTransaction={{
                        amount: 200,
                        date: "2023-10-15",
                        category: "Grocery",
                        }}
                    />
                </div>
                <div className="col-start-3 col-span-1">
                    <AccountCard
                        bankName="Bank of America"
                        accountType="Savings"
                        balance={5000}
                        lastTransaction={{
                        amount: 200,
                        date: "2023-10-15",
                        category: "Grocery",
                        }}
                    />
                </div>
                <div className="col-start-1 col-span-3">
                    <TransactionTable/>
                </div>
        </div>
    </div>
  )
}

export default Accountpage