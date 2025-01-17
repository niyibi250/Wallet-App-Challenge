import { CiSearch } from "react-icons/ci";

interface ISearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export function SearchInput(props: ISearchInputProps) {
  const { value, onChange, ...restProps } = props;

  return (
    <div className="">
      <div className="h-10 w-[95%] flex flex-row justify-start items-center border border-GreyScale-2 px-2 mr-4 rounded-md">
        <CiSearch className="text-lg text-GreyScale-2 mr-2" />
        <input
          type="search"
          id="default-search"
          className="flex-1 w-[90%] outline-none bg-transparent text-GreyScale-2 text-lg"
          placeholder="Search"
          required
          value={value}
          onChange={onChange}
          {...restProps}
        />
      </div>
    </div>
  );
}
