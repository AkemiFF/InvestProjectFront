import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function TermsOfUsePage() {
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
            Conditions d'Utilisation
          </h1>

          <div className="text-gray-300 space-y-8">
            <p className="text-lg">Dernière mise à jour: 20 Mars 2025</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">1. Acceptation des Conditions</h2>
              <p>
                En accédant à notre plateforme et en l'utilisant, vous acceptez d'être lié par ces Conditions
                d'Utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes
                responsable du respect des lois locales applicables. Si vous n'acceptez pas l'une de ces conditions,
                vous êtes interdit d'utiliser ou d'accéder à ce site.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">2. Licence d'Utilisation</h2>
              <p>
                La permission est accordée pour utiliser temporairement la plateforme à des fins personnelles et non
                commerciales. Cette licence ne comprend pas : (a) la modification ou la copie de nos contenus; (b) toute
                utilisation des contenus à des fins commerciales ou pour toute exposition publique; (c) toute tentative
                de décompilation ou d'ingénierie inverse de la plateforme; (d) la suppression de tout droit d'auteur ou
                autres notations de propriété; ou (e) le transfert des contenus à une autre personne ou la mise en
                miroir des contenus sur un autre serveur.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">3. Comptes Utilisateurs</h2>
              <p>
                Lorsque vous créez un compte sur notre plateforme, vous devez nous fournir des informations exactes,
                complètes et à jour à tout moment. Le non-respect de cette obligation constitue une violation des
                Conditions, ce qui peut entraîner la résiliation immédiate de votre compte sur notre plateforme.
              </p>
              <p>
                Vous êtes responsable de la protection du mot de passe que vous utilisez pour accéder à la plateforme et
                de toutes les activités ou actions sous votre mot de passe. Vous acceptez de ne pas divulguer votre mot
                de passe à un tiers. Vous devez nous informer immédiatement si vous avez connaissance d'une violation de
                la sécurité ou d'une utilisation non autorisée de votre compte.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">4. Investissements et Transactions</h2>
              <p>
                Notre plateforme facilite les investissements dans divers projets. Tous les investissements comportent
                des risques, et les performances passées ne garantissent pas les résultats futurs. Nous ne garantissons
                pas le succès de tout projet présenté sur notre plateforme.
              </p>
              <p>
                Vous êtes seul responsable de vos décisions d'investissement. Nous vous recommandons de consulter un
                conseiller financier professionnel avant de prendre des décisions d'investissement.
              </p>
              <p>
                Les frais associés aux transactions sont détaillés dans notre section Tarification. Ces frais peuvent
                être modifiés à tout moment, avec un préavis raisonnable aux utilisateurs.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">5. Limitation de Responsabilité</h2>
              <p>
                En aucun cas, notre plateforme, ses dirigeants, administrateurs et employés ne seront tenus responsables
                de tout dommage résultant de l'utilisation ou de l'incapacité d'utiliser les contenus de notre
                plateforme, même si nous avons été informés de la possibilité de tels dommages.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">6. Modifications</h2>
              <p>
                Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à
                tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant que
                les nouvelles conditions prennent effet. Ce qui constitue un changement important sera déterminé à notre
                seule discrétion.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">7. Loi Applicable</h2>
              <p>
                Ces Conditions seront régies et interprétées conformément aux lois françaises, sans égard aux
                dispositions relatives aux conflits de lois.
              </p>
              <p>
                Notre incapacité à faire valoir un droit ou une disposition de ces Conditions ne sera pas considérée
                comme une renonciation à ces droits. Si une disposition de ces Conditions est jugée invalide ou
                inapplicable par un tribunal, les dispositions restantes de ces Conditions resteront en vigueur.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Contactez-nous</h3>
              <p className="mb-4">
                Si vous avez des questions concernant ces Conditions d'Utilisation, veuillez nous contacter:
              </p>
              <div className="flex flex-col space-y-2">
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                  Page de contact
                </Link>
                <p>Email: legal@votreplateforme.com</p>
                <p>Téléphone: +33 (0)1 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

