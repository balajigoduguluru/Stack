"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from "@stack/ui";

export default function OcrWorkbenchPage() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processOcr = async () => {
    if (!file) return;
    setIsProcessing(true);

    // Simulate OCR processing or API call to POST /ocr/extract
    setTimeout(() => {
      const resultText = [
        `[OCR Extracted Text - ${file.name}]`,
        `Extracted on: ${new Date().toLocaleString()}`,
        `--------------------------------------------------`,
        `CHAPTER 1: Introduction to Data Structures & Algorithms`,
        `1.1 Overview`,
        `Data structures provide a structured format for organizing, managing, and storing data efficiently.`,
        `Key metrics include Time Complexity O(n) and Space Complexity O(1).`,
        `--------------------------------------------------`,
        `Summary: Document successfully processed with 98% accuracy score.`
      ].join('\n\n');

      setExtractedText(resultText);
      setIsProcessing(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[14px] font-medium text-[#5C6BC0] hover:underline mb-2 inline-block">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[36px] font-bold text-[#1D1D1F] tracking-tight">OCR Text Extraction Workbench</h1>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px]">
              Extract editable, structured text from scans, handouts, and image notes instantly.
            </p>
          </div>
          <Badge variant="teal">AI OCR Engine</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Document / Image</CardTitle>
              <CardDescription>Supported formats: PNG, JPG, WEBP, PDF scans (up to 25MB).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-200 rounded-[24px] p-8 text-center bg-[#FAFAFA] hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  id="ocr-file-upload"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
                <label htmlFor="ocr-file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#5C6BC0]/10 text-[#5C6BC0] rounded-2xl flex items-center justify-center text-[24px]">
                    📄
                  </div>
                  <span className="text-[14px] font-semibold text-[#1D1D1F]">
                    {file ? file.name : "Click to upload scan or image"}
                  </span>
                  <span className="text-[12px] font-medium text-[#1D1D1F]/50">
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : "Drag and drop file here"}
                  </span>
                </label>
              </div>

              <Button
                variant="primary"
                className="w-full"
                disabled={!file || isProcessing}
                onClick={processOcr}
              >
                {isProcessing ? "Extracting Text..." : "Extract Text"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Extracted Output</CardTitle>
                <CardDescription>Editable text preview & export</CardDescription>
              </div>
              {extractedText && (
                <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                  {copied ? "Copied! ✓" : "Copy Text"}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {extractedText ? (
                <textarea
                  className="w-full h-[320px] bg-[#F5F5F7] border border-gray-200 rounded-[20px] p-4 text-[14px] font-mono text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#5C6BC0] resize-none"
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                />
              ) : (
                <div className="h-[320px] bg-[#F5F5F7] rounded-[20px] border border-dashed border-gray-200 flex items-center justify-center text-center p-6">
                  <p className="text-[#1D1D1F]/40 font-medium text-[14px]">
                    Extracted OCR text will appear here. You can edit, copy, or export it to notes.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
