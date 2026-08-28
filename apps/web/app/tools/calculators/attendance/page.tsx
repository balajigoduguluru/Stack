"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Badge } from "@stack/ui";

export default function AttendanceCalculatorPage() {
  const [attended, setAttended] = useState<number | "">(32);
  const [total, setTotal] = useState<number | "">(40);
  const [target, setTarget] = useState<number>(75);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const att = Number(attended) || 0;
    const tot = Number(total) || 0;
    const tgt = Number(target) || 75;

    if (tot === 0) return;

    const currentPercentage = (att / tot) * 100;
    let bunksAvailable = 0;
    let classesNeeded = 0;

    if (currentPercentage >= tgt) {
      bunksAvailable = Math.floor((att * 100) / tgt - tot);
    } else {
      const numerator = tgt * tot - 100 * att;
      const denominator = 100 - tgt;
      classesNeeded = denominator > 0 ? Math.ceil(numerator / denominator) : 0;
    }

    setResult({
      currentPercentage: currentPercentage.toFixed(2),
      targetPercentage: tgt,
      isOnTrack: currentPercentage >= tgt,
      bunksAvailable: Math.max(0, bunksAvailable),
      classesNeeded: Math.max(0, classesNeeded),
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[14px] font-medium text-[#5C6BC0] hover:underline mb-2 inline-block">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[36px] font-bold text-[#1D1D1F] tracking-tight">Attendance & Bunk Calculator</h1>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px]">
              Track your current attendance percentage and see how many classes you can safely skip.
            </p>
          </div>
          <Badge variant="coral">Bunk Planner</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Details</CardTitle>
              <CardDescription>Enter classes attended and total classes conducted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-[#1D1D1F]/70 mb-1 block">Classes Attended</label>
                <Input
                  type="number"
                  value={attended}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAttended(Number(e.target.value))}
                  placeholder="e.g. 32"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#1D1D1F]/70 mb-1 block">Total Classes Conducted</label>
                <Input
                  type="number"
                  value={total}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotal(Number(e.target.value))}
                  placeholder="e.g. 40"
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#1D1D1F]/70 mb-1 block">Target Percentage (%)</label>
                <Input
                  type="number"
                  value={target}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget(Number(e.target.value))}
                  placeholder="Default 75%"
                />
              </div>

              <div className="pt-4">
                <Button variant="primary" className="w-full" onClick={calculate}>
                  Calculate Status
                </Button>
              </div>
            </CardContent>
          </Card>

          {result ? (
            <Card className={result.isOnTrack ? "bg-[#26A69A]/10 border-[#26A69A]/30" : "bg-[#FF7043]/10 border-[#FF7043]/30"}>
              <CardHeader>
                <Badge variant={result.isOnTrack ? "teal" : "coral"} className="w-fit mb-2">
                  {result.isOnTrack ? "Safe / On Track" : "Action Required"}
                </Badge>
                <CardTitle className="text-[32px] font-bold text-[#1D1D1F]">
                  {result.currentPercentage}%
                </CardTitle>
                <CardDescription>Target: {result.targetPercentage}% required</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.isOnTrack ? (
                  <div className="p-4 bg-white/80 rounded-2xl border border-gray-100">
                    <p className="text-[15px] font-semibold text-[#26A69A]">
                      🎉 You can skip the next <span className="text-[20px]">{result.bunksAvailable}</span> class(es) while staying above {result.targetPercentage}%.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-white/80 rounded-2xl border border-gray-100">
                    <p className="text-[15px] font-semibold text-[#FF7043]">
                      ⚠️ You need to attend the next <span className="text-[20px]">{result.classesNeeded}</span> consecutive class(es) to reach {result.targetPercentage}%.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center text-center p-8">
              <p className="text-[#1D1D1F]/50 font-medium text-[15px]">
                Fill in your class counts on the left to see your bunk allowance or recovery path.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
