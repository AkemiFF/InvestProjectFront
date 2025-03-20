import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CookiePolicyPage() {
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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Politique des Cookies
          </h1>

          <div className="text-gray-300 space-y-8">
            <p className="text-lg">Dernière mise à jour: 20 Mars 2025</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">1. Qu'est-ce qu'un Cookie?</h2>
              <p>
                Les cookies sont de petits fichiers texte qui sont stockés sur votre ordinateur ou appareil mobile
                lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web, ou
                pour les faire fonctionner plus efficacement, ainsi que pour fournir des informations aux propriétaires
                du site.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">2. Comment Nous Utilisons les Cookies</h2>
              <p>
                Nous utilisons des cookies pour plusieurs raisons détaillées ci-dessous. Malheureusement, dans la
                plupart des cas, il n'existe pas d'options standard de l'industrie pour désactiver les cookies sans
                désactiver complètement les fonctionnalités et caractéristiques qu'ils ajoutent à ce site. Il est
                recommandé de laisser tous les cookies si vous n'êtes pas sûr d'en avoir besoin ou non, au cas où ils
                seraient utilisés pour fournir un service que vous utilisez.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">3. Les Cookies que Nous Utilisons</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-cyan-300">Cookies Nécessaires</h3>
                <p>
                  Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent pas être désactivés dans nos
                  systèmes. Ils sont généralement établis en réponse à des actions que vous effectuez et qui constituent
                  une demande de services, telles que la définition de vos préférences de confidentialité, la connexion
                  ou le remplissage de formulaires.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-cyan-300">Cookies de Performance</h3>
                <p>
                  Ces cookies nous permettent de compter les visites et les sources de trafic afin que nous puissions
                  mesurer et améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les
                  plus et les moins populaires et à voir comment les visiteurs se déplacent sur le site.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-cyan-300">Cookies de Fonctionnalité</h3>
                <p>
                  Ces cookies permettent au site web de fournir une fonctionnalité et une personnalisation améliorées.
                  Ils peuvent être définis par nous ou par des fournisseurs tiers dont nous avons ajouté les services à
                  nos pages.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-cyan-300">Cookies de Ciblage</h3>
                <p>
                  Ces cookies peuvent être définis par nos partenaires publicitaires via notre site. Ils peuvent être
                  utilisés par ces entreprises pour établir un profil de vos intérêts et vous montrer des publicités
                  pertinentes sur d'autres sites.
                </p>
              </div>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">4. Comment Gérer les Cookies</h2>
              <p>
                Vous pouvez empêcher l'installation de cookies en ajustant les paramètres de votre navigateur (voir
                l'aide de votre navigateur pour savoir comment procéder). Sachez que la désactivation des cookies
                affectera la fonctionnalité de ce site et de nombreux autres sites que vous visitez. La désactivation
                des cookies entraînera généralement la désactivation de certaines fonctionnalités et caractéristiques de
                ce site. Il est donc recommandé de ne pas désactiver les cookies.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">5. Cookies Tiers</h2>
              <p>
                Dans certains cas particuliers, nous utilisons également des cookies fournis par des tiers de confiance.
                La section suivante détaille les cookies tiers que vous pourriez rencontrer via ce site.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Ce site utilise Google Analytics, qui est l'une des solutions d'analyse les plus répandues et les plus
                  fiables sur le web, pour nous aider à comprendre comment vous utilisez le site et comment nous pouvons
                  améliorer votre expérience.
                </li>
                <li>
                  De temps à autre, nous testons de nouvelles fonctionnalités et apportons des changements subtils à la
                  façon dont le site est livré. Lorsque nous testons encore de nouvelles fonctionnalités, ces cookies
                  peuvent être utilisés pour s'assurer que vous recevez une expérience cohérente sur le site tout en
                  nous assurant que nous comprenons quelles optimisations nos utilisateurs apprécient le plus.
                </li>
                <li>
                  Nous utilisons également des boutons de médias sociaux et/ou des plugins sur ce site qui vous
                  permettent de vous connecter avec votre réseau social de diverses façons. Pour que ceux-ci
                  fonctionnent, les sites de médias sociaux suivants, incluant Facebook, Twitter, LinkedIn, établiront
                  des cookies via notre site.
                </li>
              </ul>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Plus d'Informations</h3>
              <p className="mb-4">
                Si vous avez des questions concernant notre utilisation des cookies, n'hésitez pas à nous contacter.
              </p>
              <div className="flex flex-col space-y-2">
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                  Page de contact
                </Link>
                <p>Email: cookies@votreplateforme.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

