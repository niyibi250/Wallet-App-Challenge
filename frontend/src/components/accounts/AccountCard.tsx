const AccountCard = ({bankName,balance,lastTransactionamount,lastTransactiondate,lastTransactioncategory}:any) => {
  const date = new Date(lastTransactiondate);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return (
    <div className="bg-white shadow-md text-Grey-80 rounded-lg p-4 w-full overflow-x-auto">
      <h3 className="text-Grey-80 text-lg font-bold">
        {bankName}
      </h3>
      <p className="text-primary text-2xl font-bold mt-2">
        ${balance.toLocaleString()}
      </p>
      <p className="mt-8 font-semibold">
        Last transaction: ${lastTransactionamount} on{" "}
        {`${year}-${month}-${day}`} - {lastTransactioncategory}
      </p>
    </div>
  );
};

export default AccountCard;


