"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { name: "01/06", vendas: 400 },
    { name: "08/06", vendas: 300 },
    { name: "15/06", vendas: 500 },
    { name: "22/06", vendas: 280 },
    { name: "29/06", vendas: 590 },
    { name: "06/07", vendas: 320 },
    { name: "13/07", vendas: 480 },
]

export function SalesChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip formatter={(value) => [`R$ ${value}`, "Vendas"]} />
                <Bar dataKey="vendas" fill="#e07a44" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
