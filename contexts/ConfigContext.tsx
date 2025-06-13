"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type ConfigValues = {
    margem: number
    embalagem: number
    frete: number
}

interface ConfigContextType {
    configValues: ConfigValues
    updateConfig: (values: ConfigValues) => void
}

const defaultConfig: ConfigValues = {
    margem: 40,
    embalagem: 5.4,
    frete: 0,
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export function ConfigProvider({ children }: { children: ReactNode }) {
    const [configValues, setConfigValues] = useState<ConfigValues>(defaultConfig)

    useEffect(() => {
        // Carregar configurações do localStorage
        const savedConfig = localStorage.getItem("configValues")
        if (savedConfig) {
            try {
                setConfigValues(JSON.parse(savedConfig))
            } catch (_error) {
                console.error("Erro ao carregar configurações:", _error)
            }
        }
    }, [])

    const updateConfig = (values: ConfigValues) => {
        setConfigValues(values)
        localStorage.setItem("configValues", JSON.stringify(values))
    }

    return <ConfigContext.Provider value={{ configValues, updateConfig }}>{children}</ConfigContext.Provider>
}

export function useConfig() {
    const context = useContext(ConfigContext)
    if (context === undefined) {
        throw new Error("useConfig deve ser usado dentro de um ConfigProvider")
    }
    return context
}
