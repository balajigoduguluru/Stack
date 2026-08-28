"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Badge } from "@stack/ui";

interface CourseRow {
  name: string;
  credits: number;
  gradePoint: number;
}

export default function CgpaCalculatorPage() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { name: "Data Structures", credits: 4, gradePoint: 10 },
    { name: "Linear Algebra", credits: 3, gradePoint: 9 },
    { name: "Database Systems", credits: 4, gradePoint: 9 },
  ]);

  const [currentCgpa, setCurrentCgpa] = useState<number | "">(8.5);
  const [completedCredits, setCompletedCredits] = useState<number | "">(45);
  const [result, setResult] = useState<any>(null);

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, credits: 3, gradePoint: 9 }]);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index: number, field: keyof CourseRow, value: any) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const calculate = () => {
    let totalSemesterPoints = 0;
    let totalSemesterCredits = 0;

    for (const c of courses) {
      const cr = Number(c.credits) || 0;
      const gp = Number(c.gradePoint) || 0;
      totalSemesterPoints += cr * gp;
      totalSemesterCredits += cr;
    }

    const sgpa = totalSemesterCredits > 0 ? totalSemesterPoints / totalSemesterCredits : 0;
    let overallCgpa = sgpa;
    let overallCredits = totalSemesterCredits;

    if (typeof currentCgpa === "number" && typeof completedCredits === "number" && completedCredits > 0) {
      const pastPoints = currentCgpa * completedCredits;
      overallCredits = completedCredits + totalSemesterCredits;
      overallCgpa = (pastPoints + totalSemesterPoints) / overallCredits;
    }

    setResult({
      sgpa: sgpa.toFixed(2),
      overallCgpa: overallCgpa.toFixed(2),
      totalSemesterCredits,
      overallCredits,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-[14px] font-medium text-[#5C6BC0] hover:underline mb-2 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-[36px] font-bold text-[#1D1D1F] tracking-tight">CGPA & SGPA Calculator</h1>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px]">
              Calculate your semester SGPA and cumulative CGPA with credit weighting.
            </p>
          </div>
          <Badge variant="teal">Academic Tool</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Semester Courses</CardTitle>
              <CardDescription>Enter course names, credit values, and earned grade points.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-12 gap-3 text-[13px] font-semibold text-[#1D1D1F]/60 px-2">
                <span className="col-span-5">Course Title</span>
                <span className="col-span-3">Credits</span>
                <span className="col-span-3">Grade Point</span>
                <span className="col-span-1"></span>
              </div>

              {courses.map((course, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                  <Input
                    className="col-span-5"
                    value={course.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCourse(idx, "name", e.target.value)}
                    placeholder="Subject Name"
                  />
                  <Input
                    className="col-span-3"
                    type="number"
                    value={course.credits}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCourse(idx, "credits", Number(e.target.value))}
                    placeholder="Credits"
                  />
                  <Input
                    className="col-span-3"
                    type="number"
                    value={course.gradePoint}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCourse(idx, "gradePoint", Number(e.target.value))}
                    placeholder="Grade (10-4)"
                  />
                  <button
                    onClick={() => removeCourse(idx)}
                    className="col-span-1 text-[#FF7043] font-bold hover:opacity-80 text-[18px]"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className="pt-4 flex gap-3">
                <Button variant="secondary" size="sm" onClick={addCourse}>
                  + Add Course
                </Button>
                <Button variant="primary" size="sm" onClick={calculate}>
                  Calculate CGPA
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prior Academic Record</CardTitle>
                <CardDescription>Optional: Add completed credits to calculate cumulative CGPA.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-[13px] font-medium text-[#1D1D1F]/70 mb-1 block">Current CGPA</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={currentCgpa}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentCgpa(Number(e.target.value))}
                    placeholder="e.g. 8.5"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[#1D1D1F]/70 mb-1 block">Completed Credits</label>
                  <Input
                    type="number"
                    value={completedCredits}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompletedCredits(Number(e.target.value))}
                    placeholder="e.g. 45"
                  />
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card className="bg-gradient-to-br from-[#5C6BC0]/10 to-[#26A69A]/10 border-[#5C6BC0]/20">
                <CardHeader>
                  <CardTitle className="text-[#5C6BC0]">Results Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center text-[15px] font-medium">
                    <span className="text-[#1D1D1F]/70">Semester SGPA:</span>
                    <span className="text-[20px] font-bold text-[#5C6BC0]">{result.sgpa}</span>
                  </div>
                  <div className="flex justify-between items-center text-[15px] font-medium pt-2 border-t border-gray-200">
                    <span className="text-[#1D1D1F]/70">Overall Cumulative CGPA:</span>
                    <span className="text-[24px] font-bold text-[#1D1D1F]">{result.overallCgpa}</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#1D1D1F]/60 pt-1">
                    Based on {result.overallCredits} total credits.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
