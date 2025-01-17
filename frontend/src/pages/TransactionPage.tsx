import TransactionHistory from "../components/transaction/TransactionHistory";


function TransactionPage() {
  
  return (
    <div className=" p-8">
        <div className="flex flex-col mt-5">
            <TransactionHistory/>
        </div>
    </div>
  )
}

export default TransactionPage