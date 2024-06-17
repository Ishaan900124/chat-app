import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex sm:h-[350px] md:h-[700px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
