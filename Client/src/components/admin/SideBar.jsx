import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineTransaction,
  AiOutlineMail,
} from "react-icons/ai";

import {
  MdOutlineDynamicFeed,
  MdOutlineMessage,
  MdReport,
  MdWorkOutline,
} from "react-icons/md";

import { TbDiscount2 } from "react-icons/tb";

import { IoAnalyticsOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import img from "../../assets/Images/user.png";
import { CurrentUserContext } from "../../hooks/CurrentUserContext";

const classNames = {
  wrapper: "min-h-[calc(100vh)] sticky w-1/5 bg-p ",
  innerWrapper: "p-4 mt-4",
  section: "mb-1",
  listHeader: "text-sm text-gray-500 font-semibold text-text-secondary-dark",
  list: "flex flex-col flex-start mt-4",
  listLink: "group rounded-md p-1 text-text-nav-primary-dark",
  listLinkActive: "group rounded-md p-1 text-text-active-dark",
  listItem:
    "group-hover:text-text-active-dark flex flex-row items-center  mt-2",
  listIconDiv: "group-hover:animate-[hover_200ms_ease-in-out]",
  listIcon: "ml-2 mr-2 ",
};

export default function Sidebar() {
  const [currentUserContext] = useContext(CurrentUserContext);
  const { id } = useParams();

  return (
    <div className={classNames.wrapper}>
      <div className="flex flex-col items-center text-white mt-8">
        <div className="rounded-full overflow-hidden w-24 h-24">
          <img src={img} className="object-cover" />
        </div>
        <h3 className="font-bold text-xl mt-2 text-text-primary-dark">
          Abdullah Rady
        </h3>
        <h4 className={"text-text-accent-dark"}>Admin</h4>
      </div>
      <div className={classNames.innerWrapper}>
        <div className={classNames.section}>
          <h3 className={classNames.listHeader}>Dashboard</h3>
          <ul className={classNames.list}>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <AiOutlineHome className={classNames.listIcon} />
                </div>
                Home
              </li>
            </Link>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <IoAnalyticsOutline className={classNames.listIcon} />
                </div>
                Analytics
              </li>
            </Link>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <RiMoneyDollarCircleLine className={classNames.listIcon} />
                </div>
                Sales
              </li>
            </Link>
          </ul>
        </div>
        <div className={classNames.section + " mt-6"}>
          <h3 className={classNames.listHeader}>Quick Menu</h3>
          <ul className={classNames.list}>
            <NavLink
              to={`/admin/${id}/adduser`}
              className={({ isActive }) =>
                isActive ? classNames.listLinkActive : classNames.listLink
              }
            >
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <AiOutlineUser className={classNames.listIcon} />
                </div>
                Users
              </li>
            </NavLink>
            <NavLink
              to={`/admin/${id}/addpromo`}
              className={({ isActive }) =>
                isActive ? classNames.listLinkActive : classNames.listLink
              }
            >
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <TbDiscount2 className={classNames.listIcon} />
                </div>
                Promotions
              </li>
            </NavLink>
            <NavLink to={`/admin/${id}/requests`} className={({ isActive }) =>
                isActive ? classNames.listLinkActive : classNames.listLink
              }>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <AiOutlineTransaction className={classNames.listIcon} />
                </div>
                Requests
              </li>
            </NavLink>
            <NavLink to={`/admin/${id}/reports`} className={({ isActive }) =>
                isActive ? classNames.listLinkActive : classNames.listLink
              }>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                <MdReport className={classNames.listIcon} />
                </div>
                Reports
              </li>
            </NavLink>
          </ul>
        </div>
        <div className={classNames.section + " mt-6"}>
          <h3 className={classNames.listHeader}>Notifications</h3>
          <ul className={classNames.list}>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <AiOutlineMail className={classNames.listIcon} />
                </div>
                Mail
              </li>
            </Link>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <MdOutlineDynamicFeed className={classNames.listIcon} />
                </div>
                Feedback
              </li>
            </Link>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <MdOutlineMessage className={classNames.listIcon} />
                </div>
                Messages
              </li>
            </Link>
          </ul>
        </div>
        <div className={classNames.section + " mt-6"}>
          <h3 className={classNames.listHeader}>Staff</h3>
          <ul className={classNames.list}>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <MdWorkOutline className={classNames.listIcon} />
                </div>
                Manage
              </li>
            </Link>
            <Link to="/" className={classNames.listLink}>
              <li className={classNames.listItem}>
                <div className={classNames.listIconDiv}>
                  <MdReport className={classNames.listIcon} />
                </div>
                Reports
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
