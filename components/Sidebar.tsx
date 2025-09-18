"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, Heart, Menu, X, FileText } from "lucide-react";
import SmLogo from "@/assets/donnor-letter/sm-logo.webp";
import Image from "next/image";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/volunteer",
      label: "Giấy chứng nhận TNV",
      icon: Users,
    },
    {
      href: "/charity",
      label: "Thư cảm ơn NTT",
      icon: Heart,
    },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden fixed top-4 left-4 z-50">
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        } lg:translate-x-0 lg:static lg:inset-0 ${isHovered ? "lg:w-64" : "lg:w-16"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg flex items-center justify-center">
              <Image width={60} height={60} src={SmLogo} alt="Logo" />
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-4 text-black transition-all duration-300 ${active ? "bg-teal-600 hover:bg-teal-700 text-white" : "hover:bg-gray-100"} ${
                    isHovered || sidebarOpen ? "" : "lg:justify-center lg:px-2"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                  title={!(isHovered || sidebarOpen) ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0 lg:mr-0" />
                  <div className={`text-left transition-opacity duration-300 ${isHovered || sidebarOpen ? "opacity-100 lg:ml-3" : "lg:opacity-0 lg:hidden"}`}>
                    <div className="font-medium">{item.label}</div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </>
  );
}
