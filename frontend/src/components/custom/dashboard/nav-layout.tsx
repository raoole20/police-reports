'use client'
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
// import SearchBar from "@/components/shared/search-bar";

export default function NavLayout() {
  return (
    <div className="flex gap-2 items-center justify-between px-5 py-5">
      <SidebarTrigger className="h-12 w-12" />
      <div className="flex gap-5">
        {/* <SearchBar /> */}
        <ModeToggle />
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    </div>
  );
}
