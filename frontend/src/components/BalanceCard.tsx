import { FaArrowTrendUp } from "react-icons/fa6";

function BalanceCard({title,total,percentage,prevtotal, trendstyles}:any) {
  console.log('this is percentage',percentage)
  return (
    <div className=' bg-white flex w-fit flex-col items-start justify-center py-5 px-8 rounded-lg font-accent text-Grey-80'>
        <div className="border-b-2 border-Grey-30">
          <div className="w-full flex flex-row justify-between items-center mb-1">
              <div className="text-lg font-bold">{title}</div>
              <div className={`flex flex-row justify-between items-center gap-1 px-1.5 py-0.5 rounded-md text-Grey-5 ${trendstyles}`}>
                  <div className="">{percentage > 0 ? '+': '' }{ Number(percentage).toFixed(2)}%</div>
                  <FaArrowTrendUp className=""/>
              </div>
          </div>
          <div className="w-80">
              <div className="text-2xl font-bold">${total}</div>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between mt-2">
          <div className="">Last semester</div>
          <div className="">{prevtotal}</div>
        </div> 
    </div>
  )
}

export default BalanceCard