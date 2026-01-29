import type { Metadata } from "next";
import MenuClient from './MenuClient';

export const metadata: Metadata = {
    title: "Cafe Prince | Admin Menu",
    description: "Authentication required | Admins Only",
  };

export default function MenuPage() {
  return <MenuClient />;
}