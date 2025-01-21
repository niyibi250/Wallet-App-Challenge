
interface user {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
}
export function ProfileDropdown() {
  const user: user = localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '') : { id: '', name: '', email: '' };
  const userabreviation = user.firstName.charAt(0) + user.lastName.charAt(0);
  return (
    <div className="flex flex-row justify-between items-center gap-2 pb-3 pr-4 pl-8 pt-3 rounded-tl-lg font-accent">
      <div className="flex flex-row items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center"><span className="text-Grey-5">{userabreviation}</span></div>
          <div className="text-lg text-Grey-100 font-bold">{user.firstName + ' ' + user.lastName}</div>
      </div>
    </div>
  );
}
