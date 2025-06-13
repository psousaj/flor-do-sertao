"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Columns } from "lucide-react"

interface Column {
    id: string
    label: string
}

interface ColumnSelectorProps {
    columns: Column[]
    selected: string[]
    onChange: (selected: string[]) => void
}

export function ColumnSelector({ columns, selected, onChange }: ColumnSelectorProps) {
    const [open, setOpen] = useState(false)

    const handleToggle = (columnId: string) => {
        if (selected.includes(columnId)) {
            onChange(selected.filter((id) => id !== columnId))
        } else {
            onChange([...selected, columnId])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Columns size={16} />
                    Colunas
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
                <div className="grid gap-2">
                    <h4 className="font-medium mb-2">Selecionar colunas</h4>
                    {columns.map((column) => (
                        <div key={column.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`column-${column.id}`}
                                checked={selected.includes(column.id)}
                                onCheckedChange={() => handleToggle(column.id)}
                            />
                            <Label htmlFor={`column-${column.id}`}>{column.label}</Label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
