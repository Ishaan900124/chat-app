import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import EditDetails from "./EditDetails";

const Sidebar = () => {
	return (
		<div className='border-r w-400 border-slate-800 bg-purple-800 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<div className="flex bg-cyan-950 rounded-lg">
			<LogoutButton />
			<EditDetails/>
			</div>
		</div>
	);
};
export default Sidebar;