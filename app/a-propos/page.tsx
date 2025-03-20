import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Users, Rocket, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AboutUsPage() {
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

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              À Propos de Nous
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous révolutionnons le monde de l'investissement en connectant les innovateurs aux investisseurs à travers
              une plateforme technologique de pointe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-cyan-400">Notre Mission</h2>
              <p className="text-gray-300">
                Notre mission est de démocratiser l'accès au financement pour les projets innovants tout en offrant aux
                investisseurs des opportunités uniques de participer à la prochaine génération d'entreprises
                révolutionnaires.
              </p>
              <p className="text-gray-300">
                Nous croyons que les grandes idées méritent d'être financées, quelle que soit leur origine. Notre
                plateforme élimine les barrières traditionnelles et crée un écosystème où l'innovation peut prospérer.
              </p>
            </div>

            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden border border-cyan-800/50 shadow-lg shadow-cyan-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 z-10"></div>
              <Image src="/placeholder.svg?height=400&width=600" alt="Notre mission" fill className="object-cover" />
            </div>
          </div>

          <Separator className="border-gray-800 my-16" />

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">Nos Valeurs</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-cyan-800/50">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Communauté</h3>
                <p className="text-gray-300">
                  Nous construisons une communauté mondiale d'innovateurs et d'investisseurs qui partagent des valeurs
                  communes et une vision pour l'avenir.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-cyan-800/50">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Innovation</h3>
                <p className="text-gray-300">
                  Nous encourageons l'innovation à tous les niveaux, en soutenant les idées audacieuses qui ont le
                  potentiel de transformer notre monde.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-cyan-800/50">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Intégrité</h3>
                <p className="text-gray-300">
                  Nous opérons avec la plus grande transparence et intégrité, en veillant à ce que chaque transaction
                  soit sécurisée et chaque projet soit vérifié.
                </p>
              </div>
            </div>
          </div>

          <Separator className="border-gray-800 my-16" />

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">Notre Histoire</h2>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">2020</span>
                  </div>
                  <div className="h-full w-0.5 bg-gradient-to-b from-cyan-400 to-transparent mt-4 hidden md:block"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Fondation</h3>
                  <p className="text-gray-300">
                    Notre plateforme a été fondée par une équipe d'entrepreneurs et d'experts en technologie financière
                    qui ont identifié un besoin crucial de démocratiser l'accès au capital pour les projets innovants.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">2022</span>
                  </div>
                  <div className="h-full w-0.5 bg-gradient-to-b from-cyan-400 to-transparent mt-4 hidden md:block"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Expansion</h3>
                  <p className="text-gray-300">
                    Après un lancement réussi, nous avons rapidement étendu nos opérations à plusieurs pays, attirant
                    des milliers d'investisseurs et de porteurs de projets sur notre plateforme.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">2024</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Innovation Continue</h3>
                  <p className="text-gray-300">
                    Aujourd'hui, nous continuons d'innover avec de nouvelles fonctionnalités et services qui rendent
                    l'investissement et le financement de projets plus accessibles, plus transparents et plus efficaces
                    que jamais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="border-gray-800 my-16" />

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">Notre Équipe</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-cyan-800/50 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400 mb-4">
                    <Image
                      src={`/placeholder.svg?height=200&width=200`}
                      alt={`Membre de l'équipe ${index}`}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-400">Nom Prénom</h3>
                  <p className="text-cyan-300 mb-3">Titre du Poste</p>
                  <p className="text-gray-300 text-sm">
                    Expert avec plus de 10 ans d'expérience dans le domaine de la finance et de la technologie.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-cyan-800/50 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-8 text-center">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Rejoignez Notre Aventure</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Que vous soyez un investisseur à la recherche d'opportunités uniques ou un innovateur avec une idée
              révolutionnaire, nous vous invitons à rejoindre notre plateforme et à faire partie de notre communauté
              grandissante.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-black font-semibold">
              Créer un Compte
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

