"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Headphones,
  Music,
  Smartphone,
  Battery,
  Mic,
  Waves,
  Droplet,
  Bluetooth,
  Check,
  Star,
  Volume2,
  Zap,
  Users,
  Percent,
  Sparkles,
} from "lucide-react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visitCount, setVisitCount] = useState(0)

  // Função para calcular visitas baseado no horário
  const getVisitCount = () => {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const dayProgress = (hour * 60 + minute) / (24 * 60)
    const minVisits = 30
    const maxVisits = 300
    return Math.floor(minVisits + (maxVisits - minVisits) * dayProgress)
  }

  // Atualizar contador de visitas a cada minuto
  useEffect(() => {
    setVisitCount(getVisitCount())
    const interval = setInterval(() => {
      setVisitCount(getVisitCount())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255, 122, 0, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  // Load Wistia scripts
  useEffect(() => {
    // Load Wistia player script
    const playerScript = document.createElement("script")
    playerScript.src = "https://fast.wistia.com/player.js"
    playerScript.async = true
    document.head.appendChild(playerScript)

    // Load Wistia embed script
    const embedScript = document.createElement("script")
    embedScript.src = "https://fast.wistia.com/embed/cwoav4j1ri.js"
    embedScript.async = true
    embedScript.type = "module"
    document.head.appendChild(embedScript)

    // Add Wistia styles
    const style = document.createElement("style")
    style.textContent = `
      wistia-player[media-id='cwoav4j1ri']:not(:defined) { 
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/cwoav4j1ri/swatch'); 
        display: block; 
        filter: blur(5px); 
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup scripts and styles on unmount
      if (document.head.contains(playerScript)) {
        document.head.removeChild(playerScript)
      }
      if (document.head.contains(embedScript)) {
        document.head.removeChild(embedScript)
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Smartphone,
      title: "Compatibilidade Universal",
      description:
        "Funciona perfeitamente com Android e iPhone, permitindo que você desfrute da sua música em qualquer smartphone.",
    },
    {
      icon: Music,
      title: "Controles Práticos",
      description:
        "Controle músicas e chamadas de maneira fácil e rápida. Com um simples toque, você ajusta o que precisa sem complicações.",
    },
    {
      icon: Mic,
      title: "Chamadas em Movimento",
      description:
        "Atenda e encerre chamadas sem esforço, mantendo o celular no bolso e a atenção no que realmente importa.",
    },
    {
      icon: Battery,
      title: "Bateria Duradoura",
      description: "Aproveite até 2 horas de reprodução contínua e várias recargas com o estojo compacto (até 5 dias).",
    },
  ]

  const exclusiveFeatures = [
    {
      icon: Waves,
      title: "Áudio Espacial Dinâmico",
      description:
        "Mergulhe em um som tridimensional que acompanha os movimentos da sua cabeça, proporcionando uma imersão sonora completa.",
    },
    {
      icon: Headphones,
      title: "Design Ergonômico",
      description: "Leve e arredondado, o design se adapta ao ouvido, com haste 33% menor e controles fáceis ao toque.",
    },
    {
      icon: Volume2,
      title: "Equalização Adaptativa",
      description:
        "Sons ajustados ao formato dos seus ouvidos para uma fidelidade impressionante em todas as frequências.",
    },
    {
      icon: Droplet,
      title: "Resistência a Suor e Água",
      description: "Ideal para exercícios e uso diário, incluindo a proteção do estojo.",
    },
  ]

  // Função para gerar avatar com iniciais
  const generateAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ]

    const colorIndex = name.length % colors.length
    return { initials, color: colors[colorIndex] }
  }

  // Facebook Comments Data with Replies and Real Profile Pictures
  const facebookComments = [
    {
      name: "Carlos Eduardo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      comment: "Comprei e gostei muito dos fones, qualidade realmente é top demais.",
      time: "1 sem",
      replies: [
        {
          name: "Ana Paula",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          comment: "Também comprei e estou amando. A bateria dura muito tempo!",
          time: "1 sem",
        },
      ],
    },
    {
      name: "Rafael Santos",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      comment: "Mano, tava meio inseguro, mas depois de usar esses fones fiquei muito mais satisfeito. Recomendo!",
      time: "3 sem",
      replies: [],
    },
    {
      name: "André Silva",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      comment:
        "Comprei o meu ontem, podem confiar.A qualidade do fone é demais e meu iPhone reconheceu como o original da Apple",
      time: "3 sem",
      replies: [
        {
          name: "Mariana Costa",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          comment: "André, você recebeu em quanto tempo?",
          time: "3 sem",
        },
        {
          name: "André Silva",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          comment: "Mariana, eu sou aqui da ilha do governador, eles me entregaram 2 horas após a compra pelo motoboy",
          time: "2 sem",
        },
      ],
    },
    {
      name: "Bruno Costa",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      comment:
        "Recebi tudo certinho, estou usando há 2 meses e ainda está perfeito com o mesmo tempo de bateria e qualidade do som que é alto e qualidade absurda",
      time: "2 sem",
      replies: [
        {
          name: "Fernanda Lima",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
          comment: "Bruno, também estava na dúvida! Seu comentário me convenceu. Vou comprar agora!",
          time: "2 sem",
        },
        {
          name: "Bruno Costa",
          avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
          comment: "Fernanda, pode comprar sem medo! Você não vai se arrepender.",
          time: "2 sem",
        },
      ],
    },
    {
      name: "Diego Oliveira",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      comment: "Valeu pessoal, vou comprar!",
      time: "1 sem",
      replies: [],
    },
    {
      name: "Marcos Pereira",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      comment: "Sei não, será que isso é bom mesmo? E se eu gastar o dinheiro e não gostar?",
      time: "56 min",
      replies: [
        {
          name: "Juliana Santos",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
          comment: "Marcos, eu também estava com medo! Mas comprei e não me arrependi. Tem garantia de 90 dias!",
          time: "50 min",
        },
        {
          name: "Marcos Pereira",
          avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
          comment: "Obrigado Juliana! Vou ver se compro essa semana.",
          time: "24 min",
        },
      ],
    },
  ]

  // Componente para Avatar com fallback
  const ProfileAvatar = ({ src, name, size = "md" }: { src: string; name: string; size?: "sm" | "md" }) => {
    const [imageError, setImageError] = useState(false)
    const avatar = generateAvatar(name)

    const sizeClasses = {
      sm: "w-6 h-6 md:w-8 md:h-8",
      md: "w-8 h-8 md:w-10 md:h-10",
    }

    const textSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
    }

    if (imageError || !src) {
      return (
        <div
          className={`${sizeClasses[size]} ${avatar.color} rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <span className={`text-white font-bold ${textSizeClasses[size]}`}>{avatar.initials}</span>
        </div>
      )
    }

    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0`}>
        <Image
          src={src || "/placeholder.svg"}
          alt={name}
          width={size === "sm" ? 32 : 40}
          height={size === "sm" ? 32 : 40}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Professional Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Logo - Desktop only */}
      <div className="hidden md:block fixed top-6 left-6 z-50 animate-float">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-3 border border-gray-600/50 shadow-lg">
          <Image
            src="/images/smart-ilha-logo-oficial.png"
            alt="Smart Ilha Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </div>
      </div>

      {/* Header - Desktop only */}
      <header className="hidden md:block relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-3 border border-gray-600/50 shadow-lg">
            <h1 className="text-white font-bold text-xl">AirPods Premium</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Hero Section - Otimizado para Mobile */}
          <section className="text-center pt-4 md:pt-12 mb-12 md:mb-24">
            {/* Mobile Logo - Maior e mais proeminente */}
            <div className="md:hidden mb-6 flex justify-center px-4">
              <div className="w-full max-w-xs flex justify-center">
                <Image
                  src="/images/smart-ilha-logo-oficial.png"
                  alt="Smart Ilha Logo"
                  width={300}
                  height={120}
                  className="w-auto h-20 md:h-32 object-contain"
                  priority
                />
              </div>
            </div>

            <Badge
              variant="secondary"
              className="mb-4 md:mb-6 bg-orange-600/30 text-orange-300 border-orange-500/30 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold backdrop-blur-sm shadow-md"
            >
              🎧 Áudio Premium
            </Badge>

            {/* Title - Otimizado para Mobile */}
            <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 md:mb-6 leading-tight tracking-tight px-2">
              AirPods{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>

            <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal mb-8 md:mb-10 px-4">
              Mais que ouvir música, transforme sua rotina com uma qualidade de som superior e praticidade inigualável.
            </p>

            {/* Wistia Video Player - Native Resolution, Inline Play */}
            <div className="mb-12 md:mb-16 flex justify-center px-4">
              <div className="relative">
                <wistia-player
                  media-id="cwoav4j1ri"
                  aspect="0.5625"
                  style={{
                    width: "300px",
                    height: "534px",
                  }}
                ></wistia-player>
                <div className="text-center mt-3">
                  <p className="text-gray-300 text-xs md:text-sm">🎧 Conheça os AirPods Premium em ação</p>
                </div>
              </div>
            </div>

            {/* Features Grid - Otimizado para Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 px-2">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-orange-500/20 transform hover:-translate-y-1 shadow-xl rounded-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="p-2 md:p-3 bg-orange-500/10 rounded-full inline-block mb-3 md:mb-4">
                      <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                    </div>
                    <h3 className="text-white font-bold text-base md:text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Audio Experience Section - Otimizado para Mobile */}
          <section className="py-12 md:py-24 bg-gray-900/50 rounded-2xl md:rounded-3xl mb-12 md:mb-16 mx-2 md:mx-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center px-4 md:px-6">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center bg-orange-600/20 text-orange-300 rounded-full px-3 md:px-4 py-1 md:py-2 mb-3 md:mb-4">
                  <Percent className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <span className="text-xs md:text-sm font-semibold">OFERTA LIMITADA</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 md:mb-6 tracking-tight">
                  Recursos{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Exclusivos
                  </span>
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">
                  Experimente uma qualidade de áudio superior com recursos que transformam a maneira como você ouve
                  música, assiste vídeos e faz chamadas.
                </p>

                <div className="space-y-4 md:space-y-6">
                  {exclusiveFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="p-1.5 md:p-2 bg-orange-500/10 rounded-full mr-3 md:mr-4 flex-shrink-0">
                        <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base md:text-lg mb-1">{feature.title}</h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-full max-w-xs md:max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
                  <Image
                    src="/images/airpods-standard.png"
                    alt="AirPods Premium"
                    width={400}
                    height={400}
                    className="relative z-10 w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Battery & Connectivity Section - Otimizado para Mobile */}
          <section className="py-12 md:py-24 bg-gray-900/50 rounded-2xl md:rounded-3xl mb-12 md:mb-16 mx-2 md:mx-0">
            <div className="text-center mb-8 md:mb-12 px-4">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 md:mb-6 tracking-tight">
                Experiência{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Premium Simplificada
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Conectividade perfeita e bateria duradoura para acompanhar seu dia a dia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-4 md:px-6">
              <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-4 md:p-6">
                  <div className="p-2 md:p-3 bg-orange-500/10 rounded-full inline-block mb-3 md:mb-4">
                    <Battery className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg mb-2">Bateria de Longa Duração</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Aproveite até 2 horas de reprodução contínua com uma única carga e estenda seu uso com múltiplas
                    recargas através do estojo compacto.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-4 md:p-6">
                  <div className="p-2 md:p-3 bg-orange-500/10 rounded-full inline-block mb-3 md:mb-4">
                    <Bluetooth className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg mb-2">Conexão Instantânea</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Emparelhamento rápido e troca automática entre dispositivos para um uso contínuo e sem interrupções
                    em todos os seus aparelhos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-4 md:p-6">
                  <div className="p-2 md:p-3 bg-orange-500/10 rounded-full inline-block mb-3 md:mb-4">
                    <Zap className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg mb-2">Reconhecimento Automático</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Caso tenha um iPhone, os fones são reconhecidos como originais, oferecendo uma integração perfeita
                    com todo o ecossistema Apple.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Facebook Comments Section with Replies and Real Profile Pictures - Mobile Optimized */}
          <section className="mb-12 md:mb-16 mx-2 md:mx-0">
            {/* Headline */}
            <div className="text-center mb-6 md:mb-12 px-2 md:px-4">
              <h2 className="text-xl md:text-4xl font-extrabold text-white mb-3 md:mb-6 tracking-tight">
                Veja o que estão{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  falando sobre nós
                </span>
              </h2>
              <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                Depoimentos reais de clientes e seguidores em nossas redes sociais.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 max-w-4xl mx-auto overflow-hidden">
              {/* Header */}
              <div className="border-b border-gray-200 pb-3 md:pb-4 mb-4 md:mb-6">
                <h3 className="text-gray-700 font-semibold text-base md:text-lg">248 Comentários</h3>
              </div>

              {/* Comments */}
              <div className="space-y-4 md:space-y-6">
                {facebookComments.map((comment, index) => (
                  <div key={index} className="w-full">
                    {/* Main Comment */}
                    <div className="flex space-x-2 md:space-x-3 w-full">
                      {/* Profile Picture */}
                      <ProfileAvatar src={comment.avatar} name={comment.name} size="md" />

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        {/* Username */}
                        <h4 className="text-blue-600 font-semibold text-xs md:text-sm hover:underline cursor-pointer break-words">
                          {comment.name}
                        </h4>

                        {/* Comment Text */}
                        <p className="text-gray-800 text-xs md:text-sm mt-1 leading-relaxed break-words pr-2">
                          {comment.comment}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 md:space-x-4 mt-2 text-xs text-gray-500 flex-wrap">
                          <button className="hover:underline font-semibold">Responder</button>
                          <span className="hidden sm:inline">·</span>
                          <button className="hover:underline font-semibold">Curtir</button>
                          <span className="hidden sm:inline">·</span>
                          <button className="hover:underline font-semibold">Seguir</button>
                          <span className="hidden sm:inline">·</span>
                          <span className="text-gray-400">{comment.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 md:ml-8 mt-3 md:mt-4 space-y-3 md:space-y-4 border-l border-gray-200 pl-2 md:pl-4">
                        {comment.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="flex space-x-2 md:space-x-3 w-full">
                            {/* Reply Profile Picture */}
                            <ProfileAvatar src={reply.avatar} name={reply.name} size="sm" />

                            {/* Reply Content */}
                            <div className="flex-1 min-w-0">
                              {/* Reply Username */}
                              <h5 className="text-blue-600 font-semibold text-xs md:text-sm hover:underline cursor-pointer break-words">
                                {reply.name}
                              </h5>

                              {/* Reply Text */}
                              <p className="text-gray-800 text-xs md:text-sm mt-1 leading-relaxed break-words pr-2">
                                {reply.comment}
                              </p>

                              {/* Reply Actions */}
                              <div className="flex items-center space-x-2 md:space-x-4 mt-2 text-xs text-gray-500 flex-wrap">
                                <button className="hover:underline font-semibold">Responder</button>
                                <span className="hidden sm:inline">·</span>
                                <button className="hover:underline font-semibold">Curtir</button>
                                <span className="hidden sm:inline">·</span>
                                <button className="hover:underline font-semibold">Seguir</button>
                                <span className="hidden sm:inline">·</span>
                                <span className="text-gray-400">{reply.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More Comments */}
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200">
                <button className="text-blue-600 text-xs md:text-sm font-semibold hover:underline">
                  Ver mais comentários
                </button>
              </div>

              {/* Facebook Plugin Footer */}
              <div className="mt-3 md:mt-4 pt-2 border-t border-gray-200 flex items-center text-xs text-gray-500">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded-sm mr-2 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <span className="text-xs">Plug-in social do Facebook</span>
              </div>
            </div>
          </section>

          {/* CTA Section - Otimizado para Mobile */}
          <section className="text-center px-4">
            <div className="bg-gray-800/60 backdrop-blur-xl border border-orange-500/30 rounded-2xl md:rounded-3xl p-6 md:p-12 max-w-4xl mx-auto shadow-2xl">
              <div className="mb-6 md:mb-8">
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight">
                  Sua Experiência de Áudio{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Premium
                  </span>
                </h2>
                <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-lg font-light leading-relaxed">
                  Transforme sua maneira de ouvir música, assistir vídeos e fazer chamadas com a qualidade premium dos
                  AirPods.
                </p>
              </div>

              <div className="space-y-6">
                {/* Botão Principal com Fundo Especial - Otimizado para Mobile */}
                <div className="flex justify-center">
                  <div className="relative group w-full max-w-sm md:max-w-none">
                    {/* Fundo animado com gradiente */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                    {/* Fundo secundário para profundidade */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl group-hover:opacity-75 transition duration-300"></div>

                    {/* Botão principal */}
                    <Button
                      size="lg"
                      className="relative bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 md:px-12 py-4 md:py-6 rounded-xl text-base md:text-xl shadow-lg transition-all duration-300 hover:scale-105 w-full md:w-auto md:min-w-[350px] border-0 group-hover:shadow-orange-500/50 group-hover:shadow-2xl"
                      asChild
                    >
                      <Link href="/checkout">
                        <Sparkles className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
                        <span className="font-bold">INICIAR MINHA EXPERIÊNCIA</span>
                      </Link>
                    </Button>

                    {/* Partículas flutuantes */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-60 animate-ping"></div>
                      <div
                        className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full opacity-40 animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full opacity-50 animate-ping"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <div
                        className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
                        style={{ animationDelay: "1.5s" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Texto de urgência melhorado */}
                <div className="text-center">
                  <p className="text-orange-300 text-sm md:text-base font-semibold">
                    ⚡ Oferta por tempo limitado - Últimas unidades!
                  </p>
                </div>

                {/* Badges de garantia - Otimizado para Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-300">
                  <div className="flex items-center justify-center bg-gray-700/60 backdrop-blur-sm p-3 rounded-xl border border-gray-600/50">
                    <Check className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                    <span className="text-xs md:text-sm">Entrega Rápida</span>
                  </div>
                  <div className="flex items-center justify-center bg-gray-700/60 backdrop-blur-sm p-3 rounded-xl border border-gray-600/50">
                    <Check className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                    <span className="text-xs md:text-sm">Garantia de 90 dias</span>
                  </div>
                  <div className="flex items-center justify-center bg-gray-700/60 backdrop-blur-sm p-3 rounded-xl border border-gray-600/50">
                    <Check className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                    <span className="text-xs md:text-sm">Suporte Completo</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer - Otimizado para Mobile */}
          <footer className="mt-12 md:mt-16 text-center px-4">
            <div className="hidden md:flex justify-center mb-6">
              <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 border border-gray-600/50 shadow-lg">
                <Image
                  src="/images/smart-ilha-logo-oficial.png"
                  alt="Smart Ilha Logo"
                  width={150}
                  height={150}
                  className="h-16 w-auto"
                />
              </div>
            </div>
            <p className="text-gray-400 text-xs md:text-sm">
              © {new Date().getFullYear()} Smart Ilha - Todos os direitos reservados
            </p>
          </footer>
        </div>

        {/* Contador de Visitas - Otimizado para Mobile */}
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-2 md:p-3 border border-gray-700 shadow-2xl max-w-xs">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="bg-orange-500/10 p-1.5 md:p-2 rounded-full border border-orange-500/30">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              </div>
              <div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="text-orange-400 font-bold text-sm md:text-lg">{visitCount.toLocaleString()}</span>
                  <span className="text-gray-300 text-xs md:text-sm">visitas hoje</span>
                </div>
                <div className="text-gray-400 text-xs">{new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
