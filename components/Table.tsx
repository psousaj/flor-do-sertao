import type { ConfigValues, Produto } from "../App"

interface TableProps {
    produtos: Produto[]
    configValues: ConfigValues
    selectedColumns: string[]
}

export function Table({ produtos, selectedColumns }: TableProps) {
    const formatCurrency = (value: number) => {
        return `R$ ${value.toFixed(2).replace(".", ",")}`
    }

    const renderCell = (produto: Produto, column: string) => {
        switch (column) {
            case "modelo":
                return (
                    <div className="flex flex-col items-center">
                        <div className="grid grid-cols-2 gap-1 mb-2">
                            {produto.imagens.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img || "/placeholder.svg"}
                                    alt={`${produto.modelo} ${idx + 1}`}
                                    className="w-16 h-16 object-cover border rounded"
                                />
                            ))}
                        </div>
                        {produto.modelo}
                    </div>
                )
            case "valorCompraTotal":
                return formatCurrency(produto.valorCompraTotal)
            case "unitario":
                return formatCurrency(produto.unitario)
            case "frete":
                return formatCurrency(produto.frete)
            case "valorVenda":
                return formatCurrency(produto.valorVenda)
            case "margem":
                return `${produto.margem}`
            case "embalagem":
                return produto.embalagem
            case "imposto":
                return `${produto.imposto}%`
            default:
                return produto[column as keyof Produto]
        }
    }

    const getColumnLabel = (column: string) => {
        const labels: Record<string, string> = {
            modelo: "Modelo",
            valorCompraTotal: "Valor de compra total",
            unitario: "Unitário",
            frete: "Frete",
            cor: "Cor",
            papelaria: "Papelaria",
            valorVenda: "Valor de venda",
            fornecedor: "Fornecedor",
            margem: "Margem",
            embalagem: "Embalagem",
            imposto: "Imposto",
            observacoes: "Observações",
        }
        return labels[column] || column
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-center">#</th>
                        {selectedColumns.map((column) => (
                            <th key={column} className="border p-2 text-center">
                                {getColumnLabel(column)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, index) => (
                        <tr key={produto.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="border p-2 text-center">{produto.id}</td>
                            {selectedColumns.map((column) => (
                                <td key={column} className="border p-2 text-center">
                                    {renderCell(produto, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
