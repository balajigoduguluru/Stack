"use client";

import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@stack/ui";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "users" | "quotas">("telemetry");

  const { data: metricsData } = useSWR(`${API_URL}/admin/metrics`, fetcher, {
    fallbackData: {
      telemetry: {
        activeUsers: 142,
        monthlyActiveUsers: 1250,
        activeSubscriptions: { free: 1100, pro: 150 },
        aiTokenUsage: { thisMonth: 4850000, costEstimateUsd: 24.25 },
        storageUsage: { totalFiles: 89, totalNotes: 312, totalBytesUsed: 1485760000 },
        systemHealth: { apiStatus: "healthy 🟢", aiServiceStatus: "healthy 🟢", dbStatus: "connected 🟢" },
      },
    },
  });

  const telemetry = metricsData?.telemetry || {};

  const sampleUsers = [
    { id: "u-101", name: "Alex Johnson", email: "alex@university.edu", role: "student", tier: "pro", creditsUsed: 420 },
    { id: "u-102", name: "Prof. Sarah Miller", email: "smiller@college.edu", role: "teacher", tier: "pro", creditsUsed: 890 },
    { id: "u-103", name: "David Chen", email: "dchen@student.edu", role: "student", tier: "free", creditsUsed: 85 },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-[14px] font-medium text-[#5C6BC0] hover:underline mb-2 inline-block">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[36px] font-bold text-[#1D1D1F] tracking-tight">Admin & Telemetry Console</h1>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px]">
              System health monitoring, AI token usage analytics, and user role governance.
            </p>
          </div>
          <Badge variant="dark">Platform Admin</Badge>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-3 mb-8">
          <Button
            variant={activeTab === "telemetry" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("telemetry")}
          >
            System Telemetry
          </Button>
          <Button
            variant={activeTab === "users" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("users")}
          >
            User Management
          </Button>
          <Button
            variant={activeTab === "quotas" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("quotas")}
          >
            AI Quota Caps
          </Button>
        </div>

        {activeTab === "telemetry" && (
          <div className="space-y-8">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="mb-2">
                  <Badge variant="primary" className="w-fit mb-2">Active Users</Badge>
                  <CardTitle className="text-[32px]">{telemetry.activeUsers || 142}</CardTitle>
                  <CardDescription>MAU: {telemetry.monthlyActiveUsers || 1250} students</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="mb-2">
                  <Badge variant="teal" className="w-fit mb-2">Pro Subscriptions</Badge>
                  <CardTitle className="text-[32px]">{telemetry.activeSubscriptions?.pro || 150}</CardTitle>
                  <CardDescription>Free plan: {telemetry.activeSubscriptions?.free || 1100}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="mb-2">
                  <Badge variant="coral" className="w-fit mb-2">AI Token Usage</Badge>
                  <CardTitle className="text-[32px]">
                    {((telemetry.aiTokenUsage?.thisMonth || 4850000) / 1000000).toFixed(2)}M
                  </CardTitle>
                  <CardDescription>Est. Cost: ${telemetry.aiTokenUsage?.costEstimateUsd || 24.25}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="mb-2">
                  <Badge variant="neutral" className="w-fit mb-2">Storage Usage</Badge>
                  <CardTitle className="text-[32px]">
                    {((telemetry.storageUsage?.totalBytesUsed || 1485760000) / (1024 * 1024 * 1024)).toFixed(2)} GB
                  </CardTitle>
                  <CardDescription>
                    {telemetry.storageUsage?.totalFiles || 89} files & {telemetry.storageUsage?.totalNotes || 312} notes
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* System Status Table */}
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Health</CardTitle>
                <CardDescription>Real-time microservice telemetry status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[#F5F5F7] rounded-2xl">
                    <span className="font-semibold text-[#1D1D1F]">Core API Service (`api-core`)</span>
                    <span className="font-bold text-[#26A69A]">
                      {telemetry.systemHealth?.apiStatus || "healthy 🟢"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#F5F5F7] rounded-2xl">
                    <span className="font-semibold text-[#1D1D1F]">FastAPI LLM Microservice (`api-ai`)</span>
                    <span className="font-bold text-[#26A69A]">
                      {telemetry.systemHealth?.aiServiceStatus || "healthy 🟢"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#F5F5F7] rounded-2xl">
                    <span className="font-semibold text-[#1D1D1F]">PostgreSQL Database (`packages/db`)</span>
                    <span className="font-bold text-[#26A69A]">
                      {telemetry.systemHealth?.dbStatus || "connected 🟢"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>User Governance & Roles</CardTitle>
              <CardDescription>Manage user roles (student, teacher, admin, institute) and tiers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleUsers.map((user) => (
                  <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#F5F5F7] rounded-2xl gap-4">
                    <div>
                      <p className="font-bold text-[#1D1D1F]">{user.name}</p>
                      <p className="text-[13px] font-medium text-[#1D1D1F]/60">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.role === "admin" ? "dark" : user.role === "teacher" ? "teal" : "neutral"}>
                        Role: {user.role}
                      </Badge>
                      <Badge variant={user.tier === "pro" ? "primary" : "neutral"}>
                        Plan: {user.tier}
                      </Badge>
                      <span className="text-[13px] font-semibold text-[#1D1D1F]/70">
                        {user.creditsUsed} credits used
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "quotas" && (
          <Card>
            <CardHeader>
              <CardTitle>Tiered AI Quota Rules</CardTitle>
              <CardDescription>Configure credit caps and rate limiting rules.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-[#F5F5F7] rounded-[24px] flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#1D1D1F] text-[18px]">Free Tier Cap</h4>
                  <p className="text-[14px] text-[#1D1D1F]/60 font-medium">Monthly credit limit for unpaid student accounts.</p>
                </div>
                <Badge variant="neutral" className="text-[16px] font-bold py-2 px-4">
                  100 Credits / mo
                </Badge>
              </div>

              <div className="p-6 bg-[#F5F5F7] rounded-[24px] flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#1D1D1F] text-[18px]">Pro Tier Cap</h4>
                  <p className="text-[14px] text-[#1D1D1F]/60 font-medium">Monthly credit limit for Pro subscribers.</p>
                </div>
                <Badge variant="primary" className="text-[16px] font-bold py-2 px-4">
                  5,000 Credits / mo
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
