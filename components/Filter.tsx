"use client"

import { Input } from "./ui/input"
import { Search } from "lucide-react"

interface FilterProps {
    value: string
    onChange: (value: string) => void
}

export function Filter({ value, onChange }: FilterProps) {
    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
                type="text"
                placeholder="Filtrar produtos..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-8 w-64"
            />
        </div>
    )
}
