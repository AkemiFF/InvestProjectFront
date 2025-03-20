import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
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
            Politique de Confidentialité
          </h1>

          <div className="text-gray-300 space-y-8">
            <p className="text-lg">Dernière mise à jour: 20 Mars 2025</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">1. Introduction</h2>
              <p>
                Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette
                politique de confidentialité vous informera sur la façon dont nous traitons vos données personnelles
                lorsque vous visitez notre site web et vous informera de vos droits en matière de confidentialité et de
                la manière dont la loi vous protège.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">2. Les Données que Nous Collectons</h2>
              <p>
                Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous
                concernant, que nous avons regroupées comme suit:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium text-cyan-300">Données d'identité:</span> prénom, nom de famille, nom
                  d'utilisateur ou identifiant similaire, date de naissance.
                </li>
                <li>
                  <span className="font-medium text-cyan-300">Données de contact:</span> adresse de facturation, adresse
                  de livraison, adresse e-mail et numéros de téléphone.
                </li>
                <li>
                  <span className="font-medium text-cyan-300">Données financières:</span> coordonnées bancaires, détails
                  de carte de paiement.
                </li>
                <li>
                  <span className="font-medium text-cyan-300">Données de transaction:</span> détails des paiements à
                  destination et en provenance de vous, et détails des produits et services que vous avez achetés auprès
                  de nous.
                </li>
                <li>
                  <span className="font-medium text-cyan-300">Données techniques:</span> adresse IP, données de
                  connexion, type et version du navigateur, fuseau horaire et localisation, types et versions de
                  plug-ins de navigateur, système d'exploitation et plateforme, et autres technologies sur les appareils
                  que vous utilisez pour accéder à ce site web.
                </li>
              </ul>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">3. Comment Nous Utilisons Vos Données</h2>
              <p>
                Nous n'utiliserons vos données personnelles que lorsque la loi nous y autorise. Le plus souvent, nous
                utiliserons vos données personnelles dans les circonstances suivantes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Lorsque nous devons exécuter le contrat que nous sommes sur le point de conclure ou que nous avons
                  conclu avec vous.
                </li>
                <li>
                  Lorsque cela est nécessaire pour nos intérêts légitimes (ou ceux d'un tiers) et que vos intérêts et
                  droits fondamentaux ne l'emportent pas sur ces intérêts.
                </li>
                <li>Lorsque nous devons nous conformer à une obligation légale ou réglementaire.</li>
              </ul>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">4. Partage de Vos Données</h2>
              <p>Nous pouvons partager vos données personnelles avec les parties suivantes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Prestataires de services qui fournissent des services informatiques et d'administration de système.
                </li>
                <li>Conseillers professionnels, y compris avocats, banquiers, auditeurs et assureurs.</li>
                <li>Autorités fiscales, autorités de régulation et autres autorités.</li>
                <li>
                  Tiers auxquels nous pouvons choisir de vendre, transférer ou fusionner des parties de notre entreprise
                  ou de nos actifs.
                </li>
              </ul>
              <p>
                Nous exigeons de tous les tiers qu'ils respectent la sécurité de vos données personnelles et qu'ils les
                traitent conformément à la loi. Nous n'autorisons pas nos prestataires de services tiers à utiliser vos
                données personnelles à leurs propres fins et nous ne leur permettons de traiter vos données personnelles
                qu'à des fins spécifiques et conformément à nos instructions.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">5. Sécurité des Données</h2>
              <p>
                Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles
                ne soient accidentellement perdues, utilisées ou consultées de manière non autorisée, modifiées ou
                divulguées. De plus, nous limitons l'accès à vos données personnelles aux employés, agents, contractants
                et autres tiers qui ont un besoin professionnel de les connaître.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">6. Vos Droits Légaux</h2>
              <p>
                Dans certaines circonstances, vous avez des droits en vertu des lois sur la protection des données
                concernant vos données personnelles, notamment:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Demander l'accès à vos données personnelles.</li>
                <li>Demander la correction de vos données personnelles.</li>
                <li>Demander l'effacement de vos données personnelles.</li>
                <li>S'opposer au traitement de vos données personnelles.</li>
                <li>Demander la limitation du traitement de vos données personnelles.</li>
                <li>Demander le transfert de vos données personnelles.</li>
                <li>Droit de retirer son consentement.</li>
              </ul>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Contactez-nous</h3>
              <p className="mb-4">
                Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter:
              </p>
              <div className="flex flex-col space-y-2">
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                  Page de contact
                </Link>
                <p>Email: privacy@votreplateforme.com</p>
                <p>Téléphone: +33 (0)1 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

