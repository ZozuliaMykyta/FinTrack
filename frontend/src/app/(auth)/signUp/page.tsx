import AuthFormPanel from "@/components/auth/AuthFormPanel";
import WelcomeSection from "@/components/auth/WelcomeSection";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex">
        <WelcomeSection />
        <AuthFormPanel />
      </div>
    </div>
  );
};

export default page;
