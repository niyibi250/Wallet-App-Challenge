const AccountCard = ({bankName,balance,lastTransactionamount,lastTransactiondate,lastTransactioncategory}:any) => {
  console.log('this last transaction date',lastTransactiondate);
  return (
    <div className="bg-white shadow-md text-Grey-80 rounded-lg p-4 w-full overflow-x-auto">
      <h3 className="text-Grey-80 text-lg font-bold">
        {bankName}
      </h3>
      <p className="text-primary text-2xl font-bold mt-2">
        ${balance.toLocaleString()}
      </p>
      <p className="mt-4 font-semibold">
        Last transaction: ${lastTransactionamount} On{" "}
        {lastTransactiondate
          ? new Date(lastTransactiondate).toISOString().split("T")[0]
          : "N/A"}{" "}
        - {lastTransactioncategory}
      </p>
    </div>
  );
};

export default AccountCard;


