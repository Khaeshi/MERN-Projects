import type { Metadata } from "next";
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: "Cafe Prince | Admin Dashboard",
  description: "Authentication required | Admins Only",
};

export default function DashboardPage() {

  return <DashboardClient />;
}