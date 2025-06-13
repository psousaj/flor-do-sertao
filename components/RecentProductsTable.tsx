import { formatCurrency } from "@/lib/utils"

const recentProducts = [
    {
        id: 1,
        name: "Kit 6",
        price: 36.9,
        supplier: "Loja Store Bag",
        date: "2023-06-10",
    },
    {
        id: 2,
        name: "31,83 (kit com 2)",
        price: 27.69,
        supplier: "Hrs. outlet",
        date: "2023-06-08",
    },
    {
        id: 3,
        name: "66,0 (Kit com 2)",
        price: 50.0,
        supplier: "ShopBag Oficial",
        date: "2023-06-05",
    },
]

export function RecentProductsTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left font-medium py-2">Produto</th>
                        <th className="text-right font-medium py-2">Preço</th>
                        <th className="text-right font-medium py-2">Fornecedor</th>
                    </tr>
                </thead>
                <tbody>
                    {recentProducts.map((product) => (
                        <tr key={product.id} className="border-b">
                            <td className="py-3">{product.name}</td>
                            <td className="text-right py-3">{formatCurrency(product.price)}</td>
                            <td className="text-right py-3">{product.supplier}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
