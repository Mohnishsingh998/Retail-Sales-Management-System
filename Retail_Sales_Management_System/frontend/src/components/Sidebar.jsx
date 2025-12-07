"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  Package,
  FileInput,
  Settings,
  FileText,
  CheckCircle,
  XCircle,
  Lock,
  Circle,
} from "lucide-react";

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({
    vault: true,
    services: true,
    invoices: true,
  });

  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen p-2">
      {/* Vault Header */}
      <div className="p-2 bg-white rounded-md border border-gray-200">
        <button
          onClick={() => toggleMenu("vault")}
          className="w-full flex items-center justify-between px-2 py-2 hover:bg-gray-100 rounded-md transition"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-black justify-center ">
              <img src="nameLogo.png" alt="Logo" className="w-2xl h-2xl object-cover" />
            </div>

            <div className="text-left">
              <h3 className="font-semibold text-gray-900 text-lg">Vault</h3>
              <p className="text-xs text-gray-500">Anurag Yadav</p>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              expandedMenus.vault ? "" : "-rotate-90"
            }`}
          />
        </button>
      </div>

      {/* EVERYTHING UNDER VAULT DROPDOWN */}
      {expandedMenus.vault && (
        <nav className="flex-1 overflow-y-auto p-2">
          {/* Dashboard */}
          <button
            onClick={() => setSelectedItem("Dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 transition ${
              selectedItem === "Dashboard"
                ? "bg-gray-200 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          {/* Nexus */}
          <button
            onClick={() => setSelectedItem("Nexus")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 transition ${
              selectedItem === "Nexus"
                ? "bg-gray-200 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Nexus</span>
          </button>

          {/* Intake */}
          <button
            onClick={() => setSelectedItem("Intake")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 transition ${
              selectedItem === "Intake"
                ? "bg-gray-200 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileInput className="w-5 h-5" />
            <span>Intake</span>
          </button>

          {/* SERVICES */}
          <div className="bg-white p-2 mt-2 rounded-md border border-gray-200">
            <button
              onClick={() => toggleMenu("services")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <Settings className="w-5 h-5" />
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  expandedMenus.services ? "" : "-rotate-90"
                }`}
              />
            </button>

            {expandedMenus.services && (
              <div className="ml-8 mt-1 space-y-1">
                {[
                  { name: "Pre-active", icon: <Circle className="w-4 h-4" /> },
                  { name: "Active", icon: <CheckCircle className="w-4 h-4" /> },
                  { name: "Blocked", icon: <XCircle className="w-4 h-4" /> },
                  { name: "Closed", icon: <Lock className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedItem(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      selectedItem === item.name
                        ? "bg-gray-200 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INVOICES */}
          <div className="bg-white p-2 mt-2 rounded-md border border-gray-200">
            <button
              onClick={() => toggleMenu("invoices")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <FileText className="w-5 h-5" />
              <span>Invoices</span>
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${
                  expandedMenus.invoices ? "" : "-rotate-90"
                }`}
              />
            </button>

            {expandedMenus.invoices && (
              <div className="ml-8 mt-1 space-y-1">
                {["Proforma Invoices", "Final Invoices"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setSelectedItem(label)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      selectedItem === label
                        ? "bg-gray-200 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {/* Icon container fix */}
                    <span className="w-4 h-4 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-500" />
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
