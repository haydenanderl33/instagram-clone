import { useEffect } from "react";
import propTypes from 'prop-types'
import Header from "../components/header";
import TimeLine from "../components/timeline";
import Sidebar from "../components/sidebar";
import useUser from "../hooks/use-user";
import LoggedInUserContext from '../context/logged-in-user';

const Dashboard = ({user: loggedInUser}) => {
  const {user} = useUser(loggedInUser.uid);
  
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <TimeLine />
        <Sidebar />
      </div>
    </div>
    </LoggedInUserContext.Provider>
  );
};
export default Dashboard;

Dashboard.propTypes = {
  user: propTypes.object.isRequired
}
