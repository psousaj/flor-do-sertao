"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ImageUpload"
import { ArrowLeft, Save } from "lucide-react"
import { produtos } from "@/data/produtos"
import { toast } from "sonner"

import { redirect } from 'next/navigation'

export function Page({ id }: { id?: string }) {

    const isEditing = !!id
    const existingProduct = isEditing ? produtos.find((p) => p.id === Number(id)) : null

    const [formData, setFormData] = useState({
        modelo: existingProduct?.modelo || "",
        valorCompraTotal: existingProduct?.valorCompraTotal || 0,
        unitario: existingProduct?.unitario || 0,
        frete: existingProduct?.frete || 0,
        cor: existingProduct?.cor || "",
        papelaria: existingProduct?.papelaria || "",
        valorVenda: existingProduct?.valorVenda || 0,
        fornecedor: existingProduct?.fornecedor || "",
        margem: existingProduct?.margem || "40%",
        embalagem: existingProduct?.embalagem || 5.4,
        imposto: existingProduct?.imposto || 5,
        observacoes: existingProduct?.observacoes || "",
    })

    const [images, setImages] = useState<string[]>(existingProduct?.imagens || [])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "valorCompraTotal" ||
                    name === "unitario" ||
                    name === "frete" ||
                    name === "valorVenda" ||
                    name === "embalagem" ||
                    name === "imposto"
                    ? Number.parseFloat(value) || 0
                    : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Simulando uma chamada de API
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast.success(isEditing ? "Produto atualizado" : "Produto criado", {
                description: isEditing
                    ? `O produto ${formData.modelo} foi atualizado com sucesso.`
                    : `O produto ${formData.modelo} foi criado com sucesso.`,
            })

            redirect("/produtos")
        } catch (_error) {
            toast.error("Erro", {
                description: "Ocorreu um erro ao salvar o produto.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => redirect("/produtos")}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{isEditing ? "Editar Produto" : "Novo Produto"}</h1>
                    <p className="text-gray-500">
                        {isEditing ? "Atualize as informações do produto" : "Adicione um novo produto ao catálogo"}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Informações do Produto</CardTitle>
                            <CardDescription>Detalhes básicos do produto</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="modelo">Modelo</Label>
                                    <Input id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fornecedor">Fornecedor</Label>
                                    <Input id="fornecedor" name="fornecedor" value={formData.fornecedor} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="valorCompraTotal">Valor de Compra Total</Label>
                                    <Input
                                        id="valorCompraTotal"
                                        name="valorCompraTotal"
                                        type="number"
                                        step="0.01"
                                        value={formData.valorCompraTotal}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unitario">Valor Unitário</Label>
                                    <Input
                                        id="unitario"
                                        name="unitario"
                                        type="number"
                                        step="0.01"
                                        value={formData.unitario}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="valorVenda">Valor de Venda</Label>
                                    <Input
                                        id="valorVenda"
                                        name="valorVenda"
                                        type="number"
                                        step="0.01"
                                        value={formData.valorVenda}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="frete">Frete</Label>
                                    <Input
                                        id="frete"
                                        name="frete"
                                        type="number"
                                        step="0.01"
                                        value={formData.frete}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="embalagem">Embalagem</Label>
                                    <Input
                                        id="embalagem"
                                        name="embalagem"
                                        type="number"
                                        step="0.01"
                                        value={formData.embalagem}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imposto">Imposto (%)</Label>
                                    <Input
                                        id="imposto"
                                        name="imposto"
                                        type="number"
                                        step="0.01"
                                        value={formData.imposto}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cor">Cor</Label>
                                    <Input id="cor" name="cor" value={formData.cor} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="margem">Margem</Label>
                                    <Input id="margem" name="margem" value={formData.margem} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Textarea
                                    id="observacoes"
                                    name="observacoes"
                                    value={formData.observacoes}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Imagens do Produto</CardTitle>
                            <CardDescription>Adicione até 4 imagens</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ImageUpload images={images} setImages={setImages} maxImages={4} />
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button type="button" variant="outline" onClick={() => redirect("/produtos")}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="flex items-center gap-1">
                                        <span className="animate-spin">⏳</span> Salvando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Save className="h-4 w-4" />
                                        {isEditing ? "Atualizar" : "Salvar"}
                                    </span>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    )
}
