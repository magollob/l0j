"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Users,
  ExternalLink,
  Headphones,
  MessageCircle,
  CreditCard,
  Truck,
  Package,
  MapPin,
  Banknote,
  Clock,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function Checkout3Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [airpodsModel, setAirpodsModel] = useState("standard")
  const [isMobile, setIsMobile] = useState(false)

  // Define basePrice at the component level
  const basePrice = 125.0

  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    whatsapp: "",
    email: "",
    address: "",
    cep: "",
    reference: "",
  })

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const steps = [
    { id: 1, title: "Modelo", icon: Headphones },
    { id: 2, title: "Dados", icon: Users },
    { id: 3, title: "Entrega", icon: Truck },
    { id: 4, title: "Pagamento", icon: CreditCard },
  ]

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return airpodsModel !== ""
      case 2:
        return (
          customerData.firstName &&
          customerData.lastName &&
          customerData.whatsapp &&
          customerData.email &&
          customerData.address &&
          customerData.cep
        )
      case 3:
        return deliveryMethod !== ""
      case 4:
        return paymentMethod !== ""
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    } else {
      let message = ""
      switch (currentStep) {
        case 1:
          message = "Por favor, selecione um modelo de AirPods."
          break
        case 2:
          message = "Por favor, preencha todos os campos obrigatórios."
          break
        case 3:
          message = "Por favor, selecione uma modalidade de entrega."
          break
        case 4:
          message = "Por favor, selecione uma forma de pagamento."
          break
      }
      setErrorMessage(message)
      setShowErrorDialog(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const openWhatsApp = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      setErrorMessage("Por favor, complete todas as etapas antes de finalizar o pedido.")
      setShowErrorDialog(true)
      return
    }

    const deliveryNames = {
      local: "Entrega Local (Rio de Janeiro)",
      sedex: "Entrega via Sedex (Todo Brasil)",
    }

    const paymentNames = {
      pix: "PIX (5% de desconto)",
      card: "Cartão de Crédito/Débito",
      money: "Dinheiro (na entrega)",
    }

    const modelNames = {
      standard: "AirPods 4ª Geração (sem pontas de silicone)",
      pro: "AirPods Pro (com pontas de silicone)",
    }

    const finalPrice = paymentMethod === "pix" ? basePrice * 0.95 : basePrice

    const message = `*AIRPODS PREMIUM - PEDIDO COMPLETO*

Olá! Gostaria de finalizar minha compra dos AirPods Premium!

*👤 DADOS DO CLIENTE:*
Nome: ${customerData.firstName} ${customerData.lastName}
WhatsApp: ${customerData.whatsapp}
E-mail: ${customerData.email}
Endereço: ${customerData.address}
CEP: ${customerData.cep}
${customerData.reference ? `Referência: ${customerData.reference}` : ""}

*🎧 PRODUTO ESCOLHIDO:*
• ${modelNames[airpodsModel]}
• Áudio Espacial Dinâmico
• Design Ergonômico Premium
• Compatibilidade Universal (Android e iPhone)
• Resistência a Suor e Água
• Estojo de carregamento incluído
${airpodsModel === "pro" ? "• 4 pares de pontas de silicone (PP/P/M/G)" : ""}

*🚚 MODALIDADE DE ENTREGA:*
${deliveryNames[deliveryMethod]}

*💳 FORMA DE PAGAMENTO:*
${paymentNames[paymentMethod]}

*💰 RESUMO FINANCEIRO:*
Produto: R$ 185,00
*PROMOÇÃO: R$ 125,00*
Frete: GRÁTIS
${paymentMethod === "pix" ? "Desconto PIX (5%): -R$ " + (basePrice * 0.05).toFixed(2).replace(".", ",") : ""}
*TOTAL: R$ ${finalPrice.toFixed(2).replace(".", ",")}*

*📋 PRÓXIMOS PASSOS:*
• Confirmar dados de entrega
• Processar forma de pagamento
• Envio do produto em até 24h
• Código de rastreamento (se aplicável)

Aguardo retorno para finalizar minha compra!

Obrigado pela preferência! 🎧✨`

    const whatsappUrl = `https://wa.me/5521980202797?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Mobile Layout Component
  const MobileLayout = () => (
    <div className="space-y-8">
      {/* 1. Seleção do Modelo */}
      <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Headphones className="w-5 h-5 text-orange-400 mr-2" />
            Escolha seu Modelo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={airpodsModel} onValueChange={setAirpodsModel} className="space-y-4">
            {/* AirPods Standard */}
            <div
              className={`border ${
                airpodsModel !== "standard"
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-orange-500 ring-2 ring-orange-500/30"
              } rounded-xl p-4 transition-all cursor-pointer`}
              onClick={() => setAirpodsModel("standard")}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 relative">
                    <Image
                      src="/images/airpods-standard.png"
                      alt="AirPods 4ª Geração"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <RadioGroupItem value="standard" id="model-standard" className="mr-2" />
                      <Label htmlFor="model-standard" className="text-white font-bold text-lg cursor-pointer">
                        AirPods 4ª Geração
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Mais Popular</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">OFERTA LIMITADA</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">Design universal sem pontas de silicone</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 text-xs">Conforto universal</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 text-xs">Ideal para uso diário</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AirPods Pro */}
            <div
              className={`border ${
                airpodsModel !== "pro"
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-orange-500 ring-2 ring-orange-500/30"
              } rounded-xl p-4 transition-all cursor-pointer`}
              onClick={() => setAirpodsModel("pro")}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 relative">
                    <Image src="/images/airpods-pro.png" alt="AirPods Pro" fill className="object-contain" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <RadioGroupItem value="pro" id="model-pro" className="mr-2" />
                      <Label htmlFor="model-pro" className="text-white font-bold text-lg cursor-pointer">
                        AirPods Pro
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Premium</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">OFERTA LIMITADA</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">Com pontas de silicone para isolamento acústico</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 text-xs">Isolamento superior</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 text-xs">4 tamanhos de pontas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 2. Dados para Entrega */}
      <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Users className="w-5 h-5 text-orange-400 mr-2" />
            Dados para Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-300 mb-2 block">
                Nome *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Seu nome"
                value={customerData.firstName}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, firstName: e.target.value }))}
                className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-300 mb-2 block">
                Sobrenome *
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Seu sobrenome"
                value={customerData.lastName}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, lastName: e.target.value }))}
                className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="whatsapp" className="text-gray-300 mb-2 block">
                WhatsApp *
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(21) 99999-9999"
                value={customerData.whatsapp}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2 block">
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={customerData.email}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-gray-300 mb-2 block">
                Endereço Completo *
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Rua, número, bairro, cidade, estado"
                value={customerData.address}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, address: e.target.value }))}
                className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="cep" className="text-gray-300 mb-2 block">
                CEP *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="cep"
                  type="text"
                  placeholder="00000-000"
                  value={customerData.cep}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, cep: e.target.value }))}
                  className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400 flex-1"
                  maxLength={9}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://buscacepinter.correios.com.br/app/endereco/index.php", "_blank")}
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="reference" className="text-gray-300 mb-2 block">
                Ponto de Referência (opcional)
              </Label>
              <Textarea
                id="reference"
                placeholder="Ex: Próximo ao supermercado, em frente à farmácia, etc."
                value={customerData.reference}
                onChange={(e) => setCustomerData((prev) => ({ ...prev, reference: e.target.value }))}
                className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Modalidade de Entrega */}
      <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Truck className="w-5 h-5 text-orange-400 mr-2" />
            Modalidade de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-4">
            {/* Entrega Local */}
            <div
              className={`border ${
                deliveryMethod !== "local"
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-orange-500 ring-2 ring-orange-500/30"
              } rounded-xl p-4 transition-all cursor-pointer`}
              onClick={() => setDeliveryMethod("local")}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="local" id="delivery-local" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-orange-400 mr-2" />
                    <Label htmlFor="delivery-local" className="text-white font-bold text-base cursor-pointer">
                      Entrega Local
                    </Label>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">Grátis</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">Rio de Janeiro e região metropolitana</p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 text-green-400 mr-2" />
                      <span className="text-gray-300 text-xs">Entrega em até 24h</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                      <span className="text-gray-300 text-xs">Frete totalmente grátis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Entrega Sedex */}
            <div
              className={`border ${
                deliveryMethod !== "sedex"
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-orange-500 ring-2 ring-orange-500/30"
              } rounded-xl p-4 transition-all cursor-pointer`}
              onClick={() => setDeliveryMethod("sedex")}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="sedex" id="delivery-sedex" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Package className="w-4 h-4 text-orange-400 mr-2" />
                    <Label htmlFor="delivery-sedex" className="text-white font-bold text-base cursor-pointer">
                      Entrega via Sedex
                    </Label>
                  </div>
                  <div className="mb-3">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Todo Brasil</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">Para qualquer região do Brasil</p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 text-blue-400 mr-2" />
                      <span className="text-gray-300 text-xs">1 a 5 dias úteis</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                      <span className="text-gray-300 text-xs">Frete grátis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 4. Forma de Pagamento */}
      <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <CreditCard className="w-5 h-5 text-orange-400 mr-2" />
            Forma de Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            {/* PIX */}
            <div
              className={`border ${
                paymentMethod !== "pix"
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-green-500 ring-2 ring-green-500/30"
              } rounded-xl p-4 transition-all cursor-pointer`}
              onClick={() => setPaymentMethod("pix")}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="pix" id="payment-pix" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">PIX</span>
                    </div>
                    <Label htmlFor="payment-pix" className="text-white font-bold text-base cursor-pointer">
                      PIX
                    </Label>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">5% OFF</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">Pagamento instantâneo com desconto especial</p>
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <p className="text-green-400 font-medium text-xs">
                      💰 Valor com desconto: R$ {(basePrice * 0.95).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cartão */}
            <div
              className={`border ${
                paymentMethod !== "card"
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-orange-500 ring-2 ring-orange-500/30"
              } rounded-xl p-4 transition-all cursor-pointer`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="card" id="payment-card" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <CreditCard className="w-5 h-5 text-orange-400 mr-2" />
                    <Label htmlFor="payment-card" className="text-white font-bold text-base cursor-pointer">
                      Cartão de Crédito/Débito
                    </Label>
                  </div>
                  <div className="mb-2">
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">Até 12x</Badge>
                  </div>
                  <p className="text-gray-300 text-sm">Parcelamento em até 12x</p>
                </div>
              </div>
            </div>

            {/* Dinheiro */}
            {deliveryMethod === "local" && (
              <div
                className={`border ${
                  paymentMethod !== "money"
                    ? "border-gray-600 hover:border-gray-500"
                    : "border-green-500 ring-2 ring-green-500/30"
                } rounded-xl p-4 transition-all cursor-pointer`}
                onClick={() => setPaymentMethod("money")}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="money" id="payment-money" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Banknote className="w-5 h-5 text-green-400 mr-2" />
                      <Label htmlFor="payment-money" className="text-white font-bold text-base cursor-pointer">
                        Dinheiro
                      </Label>
                      <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        Na Entrega
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">Pagamento na hora da entrega</p>
                  </div>
                </div>
              </div>
            )}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 5. Resumo do Pedido */}
      <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 relative">
              <Image
                src={airpodsModel === "pro" ? "/images/airpods-pro.png" : "/images/airpods-product.jpeg"}
                alt={airpodsModel === "pro" ? "AirPods Pro" : "AirPods 4ª Geração"}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-base">
                {airpodsModel === "pro" ? "AirPods Pro" : "AirPods 4ª Geração"}
              </h4>
              <p className="text-gray-300 text-sm">
                {airpodsModel === "pro"
                  ? "Com pontas de silicone para isolamento acústico"
                  : "Design universal sem pontas de silicone"}
              </p>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Produto:</span>
              <div className="text-right">
                <span className="line-through text-gray-400 text-sm mr-2">R$ 185,00</span>
                <span className="text-white font-bold">R$ 125,00</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Frete:</span>
              <span className="text-green-400 font-bold">Grátis</span>
            </div>
            {paymentMethod === "pix" && (
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-sm">Desconto PIX (5%):</span>
                <span className="text-green-400 font-bold">- R$ {(basePrice * 0.05).toFixed(2).replace(".", ",")}</span>
              </div>
            )}
            <Separator className="bg-gray-700" />
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total:</span>
              <span className="text-orange-400 font-bold text-xl">
                R${" "}
                {paymentMethod === "pix"
                  ? (basePrice * 0.95).toFixed(2).replace(".", ",")
                  : basePrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. Botão de Finalizar */}
      <div className="pb-8">
        <Button
          onClick={openWhatsApp}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-2xl shadow-green-600/30 transition-all duration-300 hover:scale-105 w-full"
        >
          <MessageCircle className="mr-3 h-6 w-6" />
          Finalizar Pedido via WhatsApp
        </Button>
        <p className="text-gray-400 mt-4 text-sm text-center">Atendimento de segunda a sábado, das 8h às 20h</p>
      </div>
    </div>
  )

  // Renderizar layout mobile ou desktop
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Dialog de erro */}
        <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
          <DialogContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center text-orange-400">
                <AlertCircle className="w-5 h-5 mr-2" />
                Atenção
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-gray-300">{errorMessage}</DialogDescription>
            <DialogFooter>
              <Button onClick={() => setShowErrorDialog(false)} className="bg-orange-500 hover:bg-orange-600">
                Entendi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Main Content */}
        <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          {/* Mobile Logo */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-sm">
              <Image
                src="/images/smart-ilha-logo-oficial.png"
                alt="Smart Ilha Logo"
                width={400}
                height={150}
                className="w-full h-auto max-h-20 object-contain"
                priority
              />
            </div>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Link href="https://smartilha.com.br/fones">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                AirPods Premium
              </span>
            </h1>
            <p className="text-gray-300">Complete sua compra</p>
          </div>

          <MobileLayout />

          {/* Footer */}
          <footer className="mt-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-3 border border-gray-600/50 shadow-lg">
                <Image
                  src="/images/smart-ilha-logo-oficial.png"
                  alt="Smart Ilha Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Smart Ilha - Todos os direitos reservados
            </p>
          </footer>
        </main>
      </div>
    )
  }

  // Desktop layout continua igual...

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Headphones className="w-5 h-5 text-orange-400 mr-2" />
                Escolha seu Modelo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={airpodsModel} onValueChange={setAirpodsModel} className="space-y-4">
                {/* AirPods Standard */}
                <div
                  className={`border ${
                    airpodsModel !== "standard"
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-orange-500 ring-2 ring-orange-500/30"
                  } rounded-xl p-4 transition-all cursor-pointer`}
                  onClick={() => setAirpodsModel("standard")}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 relative">
                        <Image
                          src="/images/airpods-standard.png"
                          alt="AirPods 4ª Geração"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <RadioGroupItem value="standard" id="model-standard" className="mr-2" />
                          <Label htmlFor="model-standard" className="text-white font-bold text-lg cursor-pointer">
                            AirPods 4ª Geração
                          </Label>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Mais Popular
                        </Badge>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">OFERTA LIMITADA</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Design universal sem pontas de silicone</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">Conforto universal</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">Ideal para uso diário</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AirPods Pro */}
                <div
                  className={`border ${
                    airpodsModel !== "pro"
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-orange-500 ring-2 ring-orange-500/30"
                  } rounded-xl p-4 transition-all cursor-pointer`}
                  onClick={() => setAirpodsModel("pro")}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 relative">
                        <Image src="/images/airpods-pro.png" alt="AirPods Pro" fill className="object-contain" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <RadioGroupItem value="pro" id="model-pro" className="mr-2" />
                          <Label htmlFor="model-pro" className="text-white font-bold text-lg cursor-pointer">
                            AirPods Pro
                          </Label>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Premium</Badge>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">OFERTA LIMITADA</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Com pontas de silicone para isolamento acústico</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">Isolamento superior</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-orange-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300 text-xs">4 tamanhos de pontas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )
      case 2:
        return (
          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Users className="w-5 h-5 text-orange-400 mr-2" />
                Dados para Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-300 mb-2 block">
                    Nome *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Seu nome"
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-300 mb-2 block">
                    Sobrenome *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Seu sobrenome"
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp" className="text-gray-300 mb-2 block">
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(21) 99999-9999"
                    value={customerData.whatsapp}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={customerData.email}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-gray-300 mb-2 block">
                    Endereço Completo *
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Rua, número, bairro, cidade, estado"
                    value={customerData.address}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, address: e.target.value }))}
                    className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cep" className="text-gray-300 mb-2 block">
                    CEP *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="cep"
                      type="text"
                      placeholder="00000-000"
                      value={customerData.cep}
                      onChange={(e) => setCustomerData((prev) => ({ ...prev, cep: e.target.value }))}
                      className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400 flex-1"
                      maxLength={9}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open("https://buscacepinter.correios.com.br/app/endereco/index.php", "_blank")
                      }
                      className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="reference" className="text-gray-300 mb-2 block">
                    Ponto de Referência (opcional)
                  </Label>
                  <Textarea
                    id="reference"
                    placeholder="Ex: Próximo ao supermercado, em frente à farmácia, etc."
                    value={customerData.reference}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, reference: e.target.value }))}
                    className="bg-gray-800/70 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 3:
        return (
          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Truck className="w-5 h-5 text-orange-400 mr-2" />
                Modalidade de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-4">
                {/* Entrega Local */}
                <div
                  className={`border ${
                    deliveryMethod !== "local"
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-orange-500 ring-2 ring-orange-500/30"
                  } rounded-xl p-4 transition-all cursor-pointer`}
                  onClick={() => setDeliveryMethod("local")}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="local" id="delivery-local" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-orange-400 mr-2" />
                        <Label htmlFor="delivery-local" className="text-white font-bold text-base cursor-pointer">
                          Entrega Local
                        </Label>
                        <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Grátis
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Rio de Janeiro e região metropolitana</p>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-green-400 mr-2" />
                          <span className="text-gray-300 text-xs">Entrega em até 24h</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                          <span className="text-gray-300 text-xs">Frete totalmente grátis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Entrega Sedex */}
                <div
                  className={`border ${
                    deliveryMethod !== "sedex"
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-orange-500 ring-2 ring-orange-500/30"
                  } rounded-xl p-4 transition-all cursor-pointer`}
                  onClick={() => setDeliveryMethod("sedex")}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="sedex" id="delivery-sedex" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Package className="w-4 h-4 text-orange-400 mr-2" />
                        <Label htmlFor="delivery-sedex" className="text-white font-bold text-base cursor-pointer">
                          Entrega via Sedex
                        </Label>
                      </div>
                      <div className="mb-3">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Todo Brasil</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Para qualquer região do Brasil</p>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-blue-400 mr-2" />
                          <span className="text-gray-300 text-xs">1 a 5 dias úteis</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                          <span className="text-gray-300 text-xs">Frete grátis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )
      case 4:
        return (
          <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <CreditCard className="w-5 h-5 text-orange-400 mr-2" />
                Forma de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                {/* PIX */}
                <div
                  className={`border ${
                    paymentMethod !== "pix"
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-green-500 ring-2 ring-green-500/30"
                  } rounded-xl p-4 transition-all cursor-pointer`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="pix" id="payment-pix" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">PIX</span>
                        </div>
                        <Label htmlFor="payment-pix" className="text-white font-bold text-base cursor-pointer">
                          PIX
                        </Label>
                        <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          5% OFF
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">Pagamento instantâneo com desconto especial</p>
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <p className="text-green-400 font-medium text-xs">
                          💰 Valor com desconto: R$ {(basePrice * 0.95).toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cartão */}
                <div
                  className={`border ${
                    paymentMethod !== "card"
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-orange-500 ring-2 ring-orange-500/30"
                  } rounded-xl p-4 transition-all cursor-pointer`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="card" id="payment-card" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <CreditCard className="w-5 h-5 text-orange-400 mr-2" />
                        <Label htmlFor="payment-card" className="text-white font-bold text-base cursor-pointer">
                          Cartão de Crédito/Débito
                        </Label>
                      </div>
                      <div className="mb-2">
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">Até 12x</Badge>
                      </div>
                      <p className="text-gray-300 text-sm">Parcelamento em até 12x</p>
                    </div>
                  </div>
                </div>

                {/* Dinheiro */}
                {deliveryMethod === "local" && (
                  <div
                    className={`border ${
                      paymentMethod !== "money"
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-green-500 ring-2 ring-green-500/30"
                    } rounded-xl p-4 transition-all cursor-pointer`}
                    onClick={() => setPaymentMethod("money")}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="money" id="payment-money" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Banknote className="w-5 h-5 text-green-400 mr-2" />
                          <Label htmlFor="payment-money" className="text-white font-bold text-base cursor-pointer">
                            Dinheiro
                          </Label>
                          <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                            Na Entrega
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm">Pagamento na hora da entrega</p>
                      </div>
                    </div>
                  </div>
                )}
              </RadioGroup>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Dialog de erro */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center text-orange-400">
              <AlertCircle className="w-5 h-5 mr-2" />
              Atenção
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-300">{errorMessage}</DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowErrorDialog(false)} className="bg-orange-500 hover:bg-orange-600">
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating Logo - Desktop only */}
      <div className="hidden md:block fixed top-6 left-6 z-50 animate-float">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-3 border border-gray-600/50 shadow-lg">
          <Image
            src="/images/smart-ilha-logo-oficial.png"
            alt="Smart Ilha Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile Logo */}
        <div className="md:hidden mb-8 flex justify-center">
          <div className="w-full max-w-lg">
            <Image
              src="/images/smart-ilha-logo-oficial.png"
              alt="Smart Ilha Logo"
              width={800}
              height={300}
              className="w-full h-auto max-h-24 object-contain"
              priority
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="https://smartilha.com.br/fones">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              AirPods Premium
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Complete sua compra em poucos passos simples
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 md:mb-12">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 md:space-x-8 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div
                    className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "border-gray-600 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="ml-2 md:ml-3 hidden sm:block">
                    <p
                      className={`text-xs md:text-sm font-medium ${currentStep >= step.id ? "text-orange-400" : "text-gray-400"}`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-4 md:w-16 h-0.5 mx-2 md:mx-4 transition-all duration-300 ${
                        currentStep > step.id ? "bg-orange-500" : "bg-gray-600"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Product Summary - Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl lg:sticky lg:top-6 rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Image */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-600/50">
                  <Image
                    src={airpodsModel === "pro" ? "/images/airpods-pro.png" : "/images/airpods-product.jpeg"}
                    alt={airpodsModel === "pro" ? "AirPods Pro" : "AirPods 4ª Geração"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {airpodsModel === "pro" ? "AirPods Pro" : "AirPods 4ª Geração"}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {airpodsModel === "pro"
                      ? "Com pontas de silicone para isolamento acústico"
                      : "Design universal sem pontas de silicone"}
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                {/* Price Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Produto:</span>
                    <span className="line-through text-gray-400 mr-2">R$ 185,00</span>
                    <span className="text-white font-bold">R$ 125,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Frete:</span>
                    <span className="text-green-400 font-bold">Grátis</span>
                  </div>
                  {paymentMethod === "pix" && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Desconto PIX (5%):</span>
                      <span className="text-green-400 font-bold">
                        - R$ {(basePrice * 0.05).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  )}
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">Total:</span>
                    <span className="text-orange-400 font-bold text-xl">
                      R${" "}
                      {paymentMethod === "pix"
                        ? (basePrice * 0.95).toFixed(2).replace(".", ",")
                        : basePrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="text-center mt-4">
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">OFERTA LIMITADA</Badge>
                  </div>
                </div>

                {/* Customer Info Summary */}
                {currentStep > 2 && customerData.firstName && (
                  <>
                    <Separator className="bg-gray-700" />
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Dados do Cliente:</h4>
                      <p className="text-gray-300 text-sm">
                        {customerData.firstName} {customerData.lastName}
                      </p>
                      <p className="text-gray-300 text-sm">{customerData.whatsapp}</p>
                      <p className="text-gray-300 text-sm">{customerData.email}</p>
                    </div>
                  </>
                )}

                {/* Delivery Info Summary */}
                {currentStep > 3 && deliveryMethod && (
                  <>
                    <Separator className="bg-gray-700" />
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Entrega:</h4>
                      <p className="text-gray-300 text-sm">
                        {deliveryMethod === "local" ? "Entrega Local (24h)" : "Sedex (1-5 dias úteis)"}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/60 backdrop-blur-md border-gray-600/50 shadow-xl rounded-xl">
              <CardContent className="p-8">
                {getStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    disabled={currentStep === 1}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>

                  {currentStep < 4 ? (
                    <Button onClick={nextStep} className="bg-orange-500 hover:bg-orange-600 text-white">
                      Próximo
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  ) : (
                    <Button
                      onClick={openWhatsApp}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-3"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Finalizar Pedido
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 border border-gray-600/50 shadow-lg">
              <Image
                src="/images/smart-ilha-logo-oficial.png"
                alt="Smart Ilha Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Smart Ilha - Todos os direitos reservados
          </p>
        </footer>
      </main>
    </div>
  )
}
