"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"

interface ImageUploadProps {
    images: string[]
    setImages: (images: string[]) => void
    maxImages?: number
}

export function ImageUpload({ images, setImages, maxImages = 4 }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        if (images.length + files.length > maxImages) {
            toast.error("Limite de imagens excedido", {
                description: `Você pode adicionar no máximo ${maxImages} imagens.`,
            })
            return
        }

        setIsUploading(true)

        try {
            // Simulando upload de imagens
            const newImages = Array.from(files).map((file) => {
                return URL.createObjectURL(file)
            })

            setImages([...images, ...newImages])
        } catch (__error) {
            toast.error("Erro ao fazer upload", {
                description: "Ocorreu um erro ao fazer upload das imagens.",
            })
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }

    const removeImage = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group">
                        <div className="aspect-square rounded-md overflow-hidden bg-gray-100 border">
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`Produto ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ))}

                {images.length < maxImages && (
                    <label
                        htmlFor="image-upload"
                        className="aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Adicionar imagem</span>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="sr-only"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </label>
                )}
            </div>

            <div className="text-xs text-gray-500">Formatos suportados: JPG, PNG, GIF. Tamanho máximo: 5MB.</div>
        </div>
    )
}
