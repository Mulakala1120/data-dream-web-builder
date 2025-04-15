
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const CaseStudyLoading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
