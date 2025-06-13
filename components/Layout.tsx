"use client"

import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"

export function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            <div className="flex flex-col flex-1 w-full">
                <Header>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Abrir menu</span>
                    </Button>
                </Header>

                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
