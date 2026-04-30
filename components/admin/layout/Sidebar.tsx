"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    FileText,
    CalendarDays,
    Users,
    X,
    Menu,
} from "lucide-react";

import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';

const menuItems = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Activity",
        href: "/admin/activity",
        icon: CalendarDays,
    },
    {
        name: "Gallery",
        href: "/admin/gallery",
        icon: FileText,
    },
    {
        name: "Profile",
        href: "/admin/profile",
        icon: Users,
    },
];

export default function Sidebar({
    isCollapsed,
    setIsCollapsed,
}: {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Mobile Toggle Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-[100] bg-white text-gray-800 p-2 rounded-xl shadow"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full ${isCollapsed ? 'w-20' : 'w-64'} bg-white text-gray-800 flex flex-col z-50 transform transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Logo and controls */}
                <SidebarHeader
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    setIsOpen={setIsOpen}
                />

                {/* Menu */}
                <SidebarMenu
                    menuItems={menuItems}
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                    setIsOpen={setIsOpen}
                />

                {/* Logout */}
                <SidebarFooter
                    isCollapsed={isCollapsed}
                    setIsOpen={setIsOpen}
                />
            </aside>
        </div>
    );
}