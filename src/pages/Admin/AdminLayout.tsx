import { Outlet, NavLink } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="p-4">
      {/* <nav className="flex gap-4 border-b pb-2 mb-4">
        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="users">Users</NavLink>
        <NavLink to="providers">Providers</NavLink>
        <NavLink to="posts">Posts</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav> */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
