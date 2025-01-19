
interface user {
  id: string;
  name: string;
  email: string;
}
export function ProfileDropdown() {
  const user: user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
  const username = user.name;
  const userabreviation = user.name.slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-row justify-between items-center gap-2 pb-3 pr-4 pl-8 pt-3 rounded-tl-lg font-accent">
      <div className="flex flex-row items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center"><span className="text-Grey-5">{userabreviation}</span></div>
          <div className="text-lg text-Grey-100 font-bold">{username}</div>
      </div>
    </div>
  );
}
