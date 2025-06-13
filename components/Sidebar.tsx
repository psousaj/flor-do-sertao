"use client"

import { Home, Package, Settings, ShoppingBag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import Link from "next/link"

interface SidebarProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {

    const links = [
        { name: "Dashboard", href: "/", icon: Home },
        { name: "Produtos", href: "/produtos", icon: Package },
        { name: "Configurações", href: "/configuracoes", icon: Settings },
    ]

    return (
        <>
            {/* Overlay para mobile */}
            {open && <div className="fixed inset-0 z-40 bg-black-50 md:hidden" onClick={() => setOpen(false)} />}

            {/* Sidebar para mobile */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
                    open ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl font-bold text-[#e07a44]">Ateliê Flor do Sertão</h1>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {links.map((link) => {
                        const isActive = location.pathname === link.href
                        const Icon = link.icon

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive ? "bg-[#fdf0e9] text-[#e07a44]" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                )}
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="bg-[#fdf0e9] p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <ShoppingBag size={18} className="text-[#e07a44]" />
                            <h3 className="font-medium">Resumo do Estoque</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Total de produtos</span>
                                <span className="font-medium">24</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Valor em estoque</span>
                                <span className="font-medium">R$ 3.450,00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
