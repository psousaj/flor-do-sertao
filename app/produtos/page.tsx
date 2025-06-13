"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
// import { useConfig } from "@/contexts/ConfigContext"
import { formatCurrency } from "@/lib/utils"
import { Filter, Plus, MoreVertical, Columns, Download, Trash2, Edit, Eye } from "lucide-react"
import { produtos } from "@/data/produtos"
import { toast } from "sonner"
import Link from "next/link"

export default function ProductList() {
    // const { configValues } = useConfig()
    const [filterText, setFilterText] = useState("")
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        "modelo",
        "valorCompraTotal",
        "unitario",
        "frete",
        "cor",
        "valorVenda",
        "fornecedor",
        "imposto",
    ])

    const columns = [
        { id: "modelo", label: "Modelo" },
        { id: "valorCompraTotal", label: "Valor de compra" },
        { id: "unitario", label: "Unitário" },
        { id: "frete", label: "Frete" },
        { id: "cor", label: "Cor" },
        { id: "papelaria", label: "Papelaria" },
        { id: "valorVenda", label: "Valor de venda" },
        { id: "fornecedor", label: "Fornecedor" },
        { id: "margem", label: "Margem" },
        { id: "embalagem", label: "Embalagem" },
        { id: "imposto", label: "Imposto" },
        { id: "observacoes", label: "Observações" },
    ]

    const filteredProdutos = produtos.filter((produto) => {
        const searchText = filterText.toLowerCase()
        return (
            produto.modelo.toLowerCase().includes(searchText) ||
            produto.fornecedor.toLowerCase().includes(searchText) ||
            produto.cor.toLowerCase().includes(searchText)
        )
    })

    const handleToggleColumn = (columnId: string) => {
        if (selectedColumns.includes(columnId)) {
            setSelectedColumns(selectedColumns.filter((id) => id !== columnId))
        } else {
            setSelectedColumns([...selectedColumns, columnId])
        }
    }

    const handleDelete = (id: number) => {
        toast.success("Produto excluído", {
            description: `O produto #${id} foi excluído com sucesso.`,
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
                    <p className="text-gray-500">Gerencie seu catálogo de produtos</p>
                </div>
                <Link href="/produtos/novo">
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Produto
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Lista de Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="relative w-full sm:w-auto">
                            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Filtrar produtos..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="pl-8 w-full"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9">
                                        <Columns className="mr-2 h-4 w-4" />
                                        Colunas
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-56" align="end">
                                    <div className="grid gap-2">
                                        <h4 className="font-medium mb-1">Selecionar colunas</h4>
                                        {columns.map((column) => (
                                            <div key={column.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`column-${column.id}`}
                                                    checked={selectedColumns.includes(column.id)}
                                                    onCheckedChange={() => handleToggleColumn(column.id)}
                                                />
                                                <Label htmlFor={`column-${column.id}`}>{column.label}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Button variant="outline" size="sm" className="h-9">
                                <Download className="mr-2 h-4 w-4" />
                                Exportar
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left font-medium py-3 px-4">ID</th>
                                    {selectedColumns.includes("modelo") && <th className="text-left font-medium py-3 px-4">Modelo</th>}
                                    {selectedColumns.includes("valorCompraTotal") && (
                                        <th className="text-right font-medium py-3 px-4">Valor de Compra</th>
                                    )}
                                    {selectedColumns.includes("unitario") && (
                                        <th className="text-right font-medium py-3 px-4">Unitário</th>
                                    )}
                                    {selectedColumns.includes("frete") && <th className="text-right font-medium py-3 px-4">Frete</th>}
                                    {selectedColumns.includes("cor") && <th className="text-left font-medium py-3 px-4">Cor</th>}
                                    {selectedColumns.includes("papelaria") && (
                                        <th className="text-left font-medium py-3 px-4">Papelaria</th>
                                    )}
                                    {selectedColumns.includes("valorVenda") && (
                                        <th className="text-right font-medium py-3 px-4">Valor de Venda</th>
                                    )}
                                    {selectedColumns.includes("fornecedor") && (
                                        <th className="text-left font-medium py-3 px-4">Fornecedor</th>
                                    )}
                                    {selectedColumns.includes("margem") && <th className="text-right font-medium py-3 px-4">Margem</th>}
                                    {selectedColumns.includes("embalagem") && (
                                        <th className="text-right font-medium py-3 px-4">Embalagem</th>
                                    )}
                                    {selectedColumns.includes("imposto") && <th className="text-right font-medium py-3 px-4">Imposto</th>}
                                    {selectedColumns.includes("observacoes") && (
                                        <th className="text-left font-medium py-3 px-4">Observações</th>
                                    )}
                                    <th className="text-right font-medium py-3 px-4">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProdutos.map((produto) => (
                                    <tr key={produto.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{produto.id}</td>
                                        {selectedColumns.includes("modelo") && (
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                                                        <img
                                                            src={produto.imagens[0] || "/placeholder.svg?height=40&width=40"}
                                                            alt={produto.modelo}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <span>{produto.modelo}</span>
                                                </div>
                                            </td>
                                        )}
                                        {selectedColumns.includes("valorCompraTotal") && (
                                            <td className="py-3 px-4 text-right">{formatCurrency(produto.valorCompraTotal)}</td>
                                        )}
                                        {selectedColumns.includes("unitario") && (
                                            <td className="py-3 px-4 text-right">{formatCurrency(produto.unitario)}</td>
                                        )}
                                        {selectedColumns.includes("frete") && (
                                            <td className="py-3 px-4 text-right">{formatCurrency(produto.frete)}</td>
                                        )}
                                        {selectedColumns.includes("cor") && <td className="py-3 px-4">{produto.cor}</td>}
                                        {selectedColumns.includes("papelaria") && <td className="py-3 px-4">{produto.papelaria}</td>}
                                        {selectedColumns.includes("valorVenda") && (
                                            <td className="py-3 px-4 text-right">{formatCurrency(produto.valorVenda)}</td>
                                        )}
                                        {selectedColumns.includes("fornecedor") && <td className="py-3 px-4">{produto.fornecedor}</td>}
                                        {selectedColumns.includes("margem") && <td className="py-3 px-4 text-right">{produto.margem}</td>}
                                        {selectedColumns.includes("embalagem") && (
                                            <td className="py-3 px-4 text-right">{produto.embalagem}</td>
                                        )}
                                        {selectedColumns.includes("imposto") && (
                                            <td className="py-3 px-4 text-right">{produto.imposto}%</td>
                                        )}
                                        {selectedColumns.includes("observacoes") && <td className="py-3 px-4">{produto.observacoes}</td>}
                                        <td className="py-3 px-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">Abrir menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        <span>Visualizar</span>
                                                    </DropdownMenuItem>
                                                    <Link href={`/produtos/editar/${produto.id}`}>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            <span>Editar</span>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem onClick={() => handleDelete(produto.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Excluir</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
