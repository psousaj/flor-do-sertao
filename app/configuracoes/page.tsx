"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/contexts/ConfigContext"
import { Save } from "lucide-react"
import { toast } from "sonner"

export default function Page() {
    const { configValues, updateConfig } = useConfig()
    const [values, setValues] = useState(configValues)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (field: keyof typeof values, value: string) => {
        const numValue = Number.parseFloat(value) || 0
        setValues((prev) => ({ ...prev, [field]: numValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Simulando uma chamada de API
            await new Promise((resolve) => setTimeout(resolve, 800))
            updateConfig(values)
            toast.success("Configurações salvas", {
                description: "Suas configurações foram atualizadas com sucesso.",
            })
        } catch (_error) {
            toast.error("Erro", {
                description: "Ocorreu um erro ao salvar as configurações.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                <p className="text-gray-500">Gerencie as configurações do sistema</p>
            </div>

            <Tabs defaultValue="general">
                <TabsList className="mb-6">
                    <TabsTrigger value="general">Geral</TabsTrigger>
                    <TabsTrigger value="database">Banco de Dados</TabsTrigger>
                    <TabsTrigger value="users">Usuários</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Configurações Gerais</CardTitle>
                                <CardDescription>Configure os valores padrão para cálculos e operações do sistema</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="margem">Margem Padrão (%)</Label>
                                        <Input
                                            id="margem"
                                            type="number"
                                            value={values.margem}
                                            onChange={(e) => handleChange("margem", e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Margem de lucro padrão aplicada aos produtos</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="embalagem">Custo de Embalagem (R$)</Label>
                                        <Input
                                            id="embalagem"
                                            type="number"
                                            step="0.01"
                                            value={values.embalagem}
                                            onChange={(e) => handleChange("embalagem", e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Custo padrão de embalagem por produto</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="frete">Frete Padrão (R$)</Label>
                                        <Input
                                            id="frete"
                                            type="number"
                                            step="0.01"
                                            value={values.frete}
                                            onChange={(e) => handleChange("frete", e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Valor padrão de frete para novos produtos</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t pt-6">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-1">
                                            <span className="animate-spin">⏳</span> Salvando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Save className="h-4 w-4" />
                                            Salvar Configurações
                                        </span>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                <TabsContent value="database">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configurações do Banco de Dados</CardTitle>
                            <CardDescription>Gerencie as configurações de conexão com o banco de dados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Esta seção está disponível apenas para administradores do sistema.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gerenciamento de Usuários</CardTitle>
                            <CardDescription>Adicione e gerencie usuários do sistema</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Esta seção está disponível apenas para administradores do sistema.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
