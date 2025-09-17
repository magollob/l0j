"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Shield,
  Truck,
  CreditCard,
  Star,
  Check,
  Users,
  AlertCircle,
  Package,
  MapPin,
  User,
  Lock,
  Sparkles,
} from "lucide-react"

export default function CheckoutPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos em segundos
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  // Contador regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCepChange = async (cep: string) => {
    handleInputChange("cep", cep)
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          }))
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error)
      }
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const productPrice = 89.9
  const originalPrice = 299.9
  const discount = originalPrice - productPrice
  const discountPercentage = Math.round((discount / originalPrice) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header com Timer */}
      <div className="bg-red-600/90 backdrop-blur-sm text-white py-2 md:py-3 sticky top-0 z-50 border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            <span className="text-xs md:text-sm font-semibold">OFERTA EXPIRA EM:</span>
            <div className="bg-white/20 px-2 md:px-3 py-1 rounded-lg">
              <span className="font-bold text-sm md:text-base">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="text-xs md:text-sm">
            <span className="hidden md:inline">🔥 </span>Últimas unidades!
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Botão Voltar */}
        <div className="mb-6 md:mb-8">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/50 p-2 md:p-3" asChild>
            <Link href="https://smartilha.com.br/fones">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="text-sm md:text-base">Voltar</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Coluna Esquerda - Formulário */}
          <div className="space-y-6 md:space-y-8">
            {/* Dados Pessoais */}
            <Card className="bg-gray-800/60 backdrop-blur-lg border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <User className="w-5 h-5 md:w-6 md:h-6 mr-2 text-orange-400" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 text-sm">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300 text-sm">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300 text-sm">
                    Telefone/WhatsApp *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Endereço de Entrega */}
            <Card className="bg-gray-800/60 backdrop-blur-lg border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 mr-2 text-orange-400" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cep" className="text-gray-300 text-sm">
                      CEP *
                    </Label>
                    <Input
                      id="cep"
                      value={formData.cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="00000-000"
                      maxLength={8}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-gray-300 text-sm">
                      Endereço *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="Rua, Avenida..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="number" className="text-gray-300 text-sm">
                      Número *
                    </Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => handleInputChange("number", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="complement" className="text-gray-300 text-sm">
                      Complemento
                    </Label>
                    <Input
                      id="complement"
                      value={formData.complement}
                      onChange={(e) => handleInputChange("complement", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="Apto 101"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="neighborhood" className="text-gray-300 text-sm">
                      Bairro *
                    </Label>
                    <Input
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="Centro"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="city" className="text-gray-300 text-sm">
                      Cidade *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="São Paulo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-300 text-sm">
                      Estado *
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados do Cartão */}
            <Card className="bg-gray-800/60 backdrop-blur-lg border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 mr-2 text-orange-400" />
                  Dados do Cartão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-gray-300 text-sm">
                    Número do Cartão *
                  </Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label htmlFor="cardName" className="text-gray-300 text-sm">
                    Nome no Cartão *
                  </Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="NOME COMO NO CARTÃO"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-gray-300 text-sm">
                      Validade *
                    </Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-gray-300 text-sm">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white mt-1"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Resumo do Pedido */}
          <div className="space-y-6 md:space-y-8">
            {/* Produto */}
            <Card className="bg-gray-800/60 backdrop-blur-lg border-gray-700 sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <Package className="w-5 h-5 md:w-6 md:h-6 mr-2 text-orange-400" />
                  Seu Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Produto */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-xl flex items-center justify-center">
                    <Image
                      src="/images/airpods-standard.png"
                      alt="AirPods Premium"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1">
                      {discountPercentage}% OFF
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base md:text-lg">AirPods Premium</h3>
                    <p className="text-gray-400 text-sm">Qualidade superior • Entrega rápida</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">(1.247 avaliações)</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-600" />

                {/* Resumo de Preços */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="text-gray-300 line-through">R$ {originalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-semibold">Desconto ({discountPercentage}%):</span>
                    <span className="text-green-400 font-semibold">-R$ {discount.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Frete:</span>
                    <span className="text-green-400 font-semibold">GRÁTIS</span>
                  </div>
                  <Separator className="bg-gray-600" />
                  <div className="flex justify-between items-center text-xl md:text-2xl font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-orange-400">R$ {productPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>

                {/* Garantias */}
                <div className="space-y-3 bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-400" />
                    Suas Garantias
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                      <span>Garantia de 90 dias</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                      <span>Entrega expressa grátis</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                      <span>Suporte técnico completo</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                      <span>Troca em caso de defeito</span>
                    </div>
                  </div>
                </div>

                {/* Botão de Finalizar */}
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="https://pay.infinitepay.io/smartilha/airpods-premium">
                      <Lock className="w-5 h-5 mr-2" />
                      FINALIZAR COMPRA SEGURA
                    </Link>
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>Pagamento 100% seguro e criptografado</span>
                  </div>
                </div>

                {/* Informações de Entrega */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-400 font-semibold text-sm">Entrega Expressa</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Receba em até <strong>2-5 dias úteis</strong> em todo o Brasil
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Região Metropolitana do RJ: entrega em até 24h</p>
                </div>

                {/* Contador de Pessoas Visualizando */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 bg-gray-700/30 rounded-lg p-3">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span>
                    <strong className="text-orange-400">47 pessoas</strong> estão visualizando este produto agora
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção de Confiança - Mobile */}
        <div className="mt-8 md:mt-12 lg:hidden">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-lg p-4">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Compra Segura</p>
              <p className="text-gray-400 text-xs">SSL Certificado</p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-lg p-4">
              <Truck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Frete Grátis</p>
              <p className="text-gray-400 text-xs">Todo o Brasil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Fixo Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 p-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-lg">R$ {productPrice.toFixed(2).replace(".", ",")}</p>
            <p className="text-gray-400 text-sm line-through">R$ {originalPrice.toFixed(2).replace(".", ",")}</p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-3"
            asChild
          >
            <Link href="https://pay.infinitepay.io/smartilha/airpods-premium">
              <Sparkles className="w-5 h-5 mr-2" />
              COMPRAR AGORA
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
