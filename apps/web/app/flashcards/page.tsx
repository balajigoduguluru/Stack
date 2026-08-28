"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from "@stack/ui";

const sampleDecks = [
  {
    id: "ds-algos",
    title: "Data Structures & Algorithms",
    cardCount: 24,
    badge: "CS Core",
    badgeVariant: "primary" as const,
    description: "Trees, Graphs, Sorting, Dynamic Programming & Big-O Notation.",
  },
  {
    id: "db-systems",
    title: "Database Systems & SQL",
    cardCount: 18,
    badge: "Database",
    badgeVariant: "teal" as const,
    description: "ACID properties, Normalization, Indexing, Transactions & Joins.",
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra & Matrices",
    cardCount: 15,
    badge: "Math",
    badgeVariant: "coral" as const,
    description: "Eigenvalues, Eigenvectors, Matrix Decompositions & Vector Spaces.",
  },
];

export default function FlashcardDecksPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-[14px] font-medium text-[#5C6BC0] hover:underline mb-2 inline-block">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[36px] font-bold text-[#1D1D1F] tracking-tight">Active Recall Decks</h1>
            <p className="text-[#1D1D1F]/60 font-medium text-[16px]">
              Master key concepts with interactive 3D flashcard study decks.
            </p>
          </div>
          <Button variant="primary" size="sm">
            + New Deck
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleDecks.map((deck) => (
            <Card key={deck.id} className="flex flex-col justify-between hover:scale-[1.02] transition-all">
              <div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={deck.badgeVariant}>{deck.badge}</Badge>
                    <span className="text-[12px] font-semibold text-[#1D1D1F]/50">{deck.cardCount} Cards</span>
                  </div>
                  <CardTitle>{deck.title}</CardTitle>
                  <CardDescription>{deck.description}</CardDescription>
                </CardHeader>
              </div>
              <CardContent className="pt-4">
                <Link href={`/flashcards/${deck.id}`}>
                  <Button variant="dark" className="w-full">
                    Start Reviewing →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
