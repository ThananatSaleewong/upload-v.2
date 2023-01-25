import DashboardFeed from "../components/dashboard/DashboardFeed";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function Dashboard(props) {
  const { logout } = props;
  return (
    <div>
      <DashboardHeader logout={logout} />
      <DashboardFeed />
    </div>
  );
}

export default Dashboard;