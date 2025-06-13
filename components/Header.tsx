import { Bell, Search, Settings, User } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import type { ReactNode } from "react"
import { useConfig } from "@/contexts/ConfigContext"
import Link from "next/link"

interface HeaderProps {
    children?: ReactNode
}

export function Header({ children }: HeaderProps) {
    const { configValues } = useConfig()

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-4">
                    {children}

                    <div className="hidden md:flex items-center gap-2">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input type="text" placeholder="Buscar..." className="pl-8 w-full" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 text-sm">
                        <div className="bg-gray-100 px-3 py-1 rounded">
                            <span className="font-semibold">Margem:</span> {configValues.margem}%
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded">
                            <span className="font-semibold">Embalagem:</span> R$ {configValues.embalagem.toFixed(2)}
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded">
                            <span className="font-semibold">Frete:</span> R$ {configValues.frete.toFixed(2)}
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="relative">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Button>

                    <Link href="/configuracoes">
                        <Button variant="ghost" size="icon">
                            <Settings size={20} />
                        </Button>
                    </Link>

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <User size={20} />
                    </Button>
                </div>
            </div>
        </header>
    )
}
