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
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Vault</h3>
              <p className="text-xs text-gray-500">Anurag Yadav</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Dashboard */}
        <button
          onClick={() => setSelectedItem("Dashboard")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
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
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
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
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
            selectedItem === "Intake"
              ? "bg-gray-200 text-gray-900 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FileInput className="w-5 h-5" />
          <span>Intake</span>
        </button>

        {/* Services Section */}
        <div className="mt-2">
          <button
            onClick={() => toggleMenu("services")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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
              <button
                onClick={() => setSelectedItem("Pre-active")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedItem === "Pre-active"
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Circle className="w-4 h-4" />
                <span>Pre-active</span>
              </button>

              <button
                onClick={() => setSelectedItem("Active")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedItem === "Active"
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Active</span>
              </button>

              <button
                onClick={() => setSelectedItem("Blocked")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedItem === "Blocked"
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>Blocked</span>
              </button>

              <button
                onClick={() => setSelectedItem("Closed")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedItem === "Closed"
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Closed</span>
              </button>
            </div>
          )}
        </div>

        {/* Invoices Section */}
        <div className="mt-2">
          <button
            onClick={() => toggleMenu("invoices")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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
              <button
                onClick={() => setSelectedItem("Proforma Invoices")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedItem === "Proforma Invoices"
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="font-semibold">Proforma Invoices</span>
              </button>

              <button
                onClick={() => setSelectedItem("Final Invoices")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedItem === "Final Invoices"
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Final Invoices</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;