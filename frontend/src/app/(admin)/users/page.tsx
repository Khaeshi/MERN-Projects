import type { Metadata } from "next";
import UsersClient from './UserClient';


export const metadata: Metadata = {
    title: "Cafe Prince | Admin Menu",
    description: "Authentication required | Admins Only",
  };

export default function UsersPage() {
  return <UsersClient />;
}