"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, X, MessageSquare, ThumbsUp, Camera, CheckCircle, TrendingUp } from "lucide-react"

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  photo?: string
  verified: boolean
}

const existingReviews: Review[] = [
  {
    id: "1",
    name: "Maria Silva",
    rating: 5,
    comment:
      "Produto incrível! A qualidade do som é excepcional e o conforto é perfeito para uso prolongado. Recomendo muito!",
    date: "2024-01-15",
    photo: "/happy-woman-headphones.png",
    verified: true,
  },
  {
    id: "2",
    name: "João Santos",
    rating: 5,
    comment:
      "Melhor compra que fiz! Uso para trabalhar e fazer exercícios. A bateria dura o dia todo e a conexão é super estável.",
    date: "2024-01-12",
    photo: "/satisfied-man-with-earbuds.jpg",
    verified: true,
  },
  {
    id: "3",
    name: "Ana Costa",
    rating: 4,
    comment: "Muito bom! Design elegante e som de qualidade. Único ponto é que poderia ter mais opções de cores.",
    date: "2024-01-10",
    photo: "/young-woman-smiling.png",
    verified: true,
  },
  {
    id: "4",
    name: "Carlos Oliveira",
    rating: 5,
    comment:
      "Excelente para quem pratica esportes! Resistente ao suor e não cai durante os exercícios. Super recomendo!",
    date: "2024-01-08",
    photo: "/man-exercising-with-earbuds.jpg",
    verified: true,
  },
]

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>(existingReviews)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    photo: null as File | null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewReview({ ...newReview, photo: file })
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setNewReview({ ...newReview, photo: null })
    setPhotoPreview(null)
  }

  const handleSubmitReview = () => {
    if (newReview.name && newReview.rating && newReview.comment) {
      const review: Review = {
        id: Date.now().toString(),
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        photo: photoPreview || undefined,
        verified: false,
      }

      setReviews([review, ...reviews])
      setNewReview({ name: "", rating: 0, comment: "", photo: null })
      setPhotoPreview(null)
      setIsModalOpen(false)
    }
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const totalReviews = reviews.length + 123 // Simular mais reviews
  const satisfactionRate = Math.round((reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100)
  const recommendationRate = 95

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 cursor-pointer transition-colors ${
              star <= (interactive ? hoveredRating || rating : rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400"
            }`}
            onClick={() => interactive && onRate?.(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-12 md:py-16 bg-gray-900/50 rounded-2xl md:rounded-3xl mb-12 md:mb-16 mx-2 md:mx-0">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 md:mb-6 tracking-tight">
            O que nossos{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              clientes dizem
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Mais de 1.000 clientes satisfeitos compartilham suas experiências com os AirPods Premium
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 text-center p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">{totalReviews}</div>
            <div className="text-gray-300 text-xs md:text-sm">Avaliações</div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 text-center p-4 md:p-6">
            <div className="flex items-center justify-center mb-1">
              <span className="text-2xl md:text-3xl font-bold text-yellow-400">{averageRating.toFixed(1)}</span>
              <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400 ml-1" />
            </div>
            <div className="text-gray-300 text-xs md:text-sm">Nota Média</div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 text-center p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">{satisfactionRate}%</div>
            <div className="text-gray-300 text-xs md:text-sm">Satisfação</div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 text-center p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{recommendationRate}%</div>
            <div className="text-gray-300 text-xs md:text-sm">Recomendação</div>
          </Card>
        </div>

        {/* Add Review Button */}
        <div className="text-center mb-8 md:mb-12">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base">
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Deixar Avaliação
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center">Deixe sua Avaliação</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 md:space-y-6">
                {/* Rating */}
                <div className="text-center">
                  <label className="block text-sm font-medium mb-2">Sua Avaliação</label>
                  {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Seu Nome</label>
                  <Input
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Digite seu nome"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium mb-2">Seu Comentário</label>
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Conte sua experiência com o produto..."
                    className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Foto (Opcional)</label>
                  {photoPreview ? (
                    <div className="relative">
                      <Image
                        src={photoPreview || "/placeholder.svg"}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="w-20 h-20 rounded-lg object-cover mx-auto"
                      />
                      <Button
                        onClick={removePhoto}
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Clique para adicionar uma foto</p>
                      </label>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitReview}
                  disabled={!newReview.name || !newReview.rating || !newReview.comment}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600"
                >
                  Publicar Avaliação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 hover:border-orange-500/30 transition-all duration-300"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                  {review.photo ? (
                    <Image
                      src={review.photo || "/placeholder.svg"}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-white text-sm md:text-base">{review.name}</h4>
                      {review.verified && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-gray-400 text-xs">{new Date(review.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{review.comment}</p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Útil
                  </Button>
                  <span className="text-xs text-gray-500">#{review.id}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8 md:mt-12">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <TrendingUp className="w-4 h-4 mr-2" />
            Ver Mais Avaliações
          </Button>
        </div>
      </div>
    </section>
  )
}
