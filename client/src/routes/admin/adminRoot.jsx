import { NavLink, Outlet } from "react-router-dom"
export default function AdminRoot() {
    return (
      <div className="flex-col lg-flex-row p-10">
        <ul className="menu menu-horizontal lg:max-w-md lg:menu-vertical bg-base-200 rounded-box">
          <li>
            <NavLink to="/admin/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/admin/tweets">Tweets</NavLink>
          </li>
          <li>
            <NavLink to="/admin/notifications">Notifications</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    )
}