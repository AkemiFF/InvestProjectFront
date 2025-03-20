import Link from "next/link"
import { ArrowLeft, Search, BookOpen, FileText, Video, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function HelpCenterPage() {
  const categories = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Guides d'utilisation",
      description: "Apprenez à utiliser toutes les fonctionnalités de notre plateforme",
      articles: 24,
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation technique",
      description: "Spécifications techniques et guides d'intégration",
      articles: 18,
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Tutoriels vidéo",
      description: "Apprenez visuellement avec nos guides étape par étape",
      articles: 12,
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "Questions fréquentes",
      description: "Réponses aux questions les plus courantes",
      articles: 36,
    },
  ]

  const popularArticles = [
    "Comment créer un compte et vérifier son identité",
    "Guide de soumission de projet étape par étape",
    "Comprendre les différents types d'investissements",
    "Comment retirer des fonds de votre compte",
    "Guide de sécurité et protection de votre compte",
    "Résolution des problèmes de paiement courants",
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="group flex items-center text-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Centre d'Aide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Trouvez des réponses à vos questions et apprenez à tirer le meilleur parti de notre plateforme.
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher dans le centre d'aide..."
                className="pl-10 h-12 bg-blue-950/30 border-cyan-800/50 focus:border-cyan-400 text-white placeholder:text-gray-500 rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-cyan-800/50 hover:border-cyan-400 transition-colors group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">{category.title}</h3>
                <p className="text-gray-300 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{category.articles} articles</span>
                  <ArrowRight className="h-5 w-5 text-cyan-400 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <Separator className="border-gray-800 my-16" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Articles Populaires</h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-4 rounded-lg border border-cyan-800/50 hover:border-cyan-400 transition-colors cursor-pointer"
                  >
                    <h3 className="text-lg font-medium text-white hover:text-cyan-300 transition-colors">{article}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-cyan-800/50 h-fit">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Besoin d'aide personnalisée?</h2>
              <p className="text-gray-300 mb-6">
                Notre équipe de support est disponible pour vous aider avec vos questions spécifiques.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-black font-semibold">
                  Contacter le support
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-cyan-800/50 hover:bg-blue-900/30 hover:text-cyan-300"
                >
                  Démarrer un chat en direct
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Heures de support:</p>
                <p className="text-gray-300">Lun-Ven: 9h-18h</p>
                <p className="text-gray-300">Sam: 10h-15h</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50 p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Vous ne trouvez pas ce que vous cherchez?</h2>
              <p className="text-gray-300">
                Consultez notre documentation complète ou contactez notre équipe de support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-black font-semibold">
                Documentation
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="border-cyan-800/50 hover:bg-blue-900/30 hover:text-cyan-300">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

