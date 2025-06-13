import { Package, ShoppingBag, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentProductsTable } from "@/components/RecentProductsTable"
import { SalesChart } from "@/components/SalesChart"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Visão geral do seu negócio</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Produtos em Estoque</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">+2 adicionados hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Valor em Estoque</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.450,00</div>
            <p className="text-xs text-gray-500">+R$ 450,00 desde o mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.250,00</div>
            <p className="text-xs text-green-500">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Fornecedores</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">+1 novo fornecedor</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>Vendas dos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Produtos Recentes</CardTitle>
            <CardDescription>Últimos produtos adicionados</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentProductsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
