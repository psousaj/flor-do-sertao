"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import type { ConfigValues } from "../App"

interface ConfigModalProps {
    isOpen: boolean
    onClose: () => void
    configValues: ConfigValues
    onSave: (values: ConfigValues) => void
}

export function ConfigModal({ isOpen, onClose, configValues, onSave }: ConfigModalProps) {
    const [values, setValues] = useState<ConfigValues>(configValues)

    const handleChange = (field: keyof ConfigValues, value: string) => {
        const numValue = Number.parseFloat(value) || 0
        setValues((prev) => ({ ...prev, [field]: numValue }))
    }

    const handleSave = () => {
        onSave(values)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configurações</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="margem" className="text-right">
                            Margem (%)
                        </Label>
                        <Input
                            id="margem"
                            type="number"
                            value={values.margem}
                            onChange={(e) => handleChange("margem", e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="embalagem" className="text-right">
                            Embalagem (R$)
                        </Label>
                        <Input
                            id="embalagem"
                            type="number"
                            step="0.01"
                            value={values.embalagem}
                            onChange={(e) => handleChange("embalagem", e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="frete" className="text-right">
                            Frete (R$)
                        </Label>
                        <Input
                            id="frete"
                            type="number"
                            step="0.01"
                            value={values.frete}
                            onChange={(e) => handleChange("frete", e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>Salvar alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
