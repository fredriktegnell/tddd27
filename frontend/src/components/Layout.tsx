import React from "react";
import Header from "./Header";
import { User } from 'firebase/auth';

interface LayoutProps {
  onSignOut: () => void;
  user: User | null;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ onSignOut, user, children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onSignOut={onSignOut} user={user} />
      <div className="flex-1 pt-14">{children}</div>
    </div>
  );
};

export default Layout;