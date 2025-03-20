import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LegalNoticePage() {
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
            Mentions Légales
          </h1>

          <div className="text-gray-300 space-y-8">
            <p className="text-lg">Dernière mise à jour: 20 Mars 2025</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">1. Informations Légales</h2>
              <p>Le site web [Nom de votre plateforme] est édité par:</p>
              <div className="pl-4 border-l-2 border-cyan-800">
                <p>Société [Nom de votre société]</p>
                <p>Société par actions simplifiée (SAS) au capital de [montant] euros</p>
                <p>Siège social: [adresse complète]</p>
                <p>RCS [ville et numéro]</p>
                <p>N° TVA intracommunautaire: [numéro]</p>
                <p>Téléphone: [numéro]</p>
                <p>Email: [adresse email]</p>
              </div>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">2. Directeur de la Publication</h2>
              <p>Le Directeur de la publication est [Nom et Prénom], en qualité de [Fonction].</p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">3. Hébergement</h2>
              <p>Le site est hébergé par:</p>
              <div className="pl-4 border-l-2 border-cyan-800">
                <p>[Nom de l'hébergeur]</p>
                <p>[Adresse complète]</p>
                <p>Téléphone: [numéro]</p>
              </div>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">4. Propriété Intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la
                propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">5. CNIL et Gestion des Données Personnelles</h2>
              <p>
                Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux
                fichiers et aux libertés, vous disposez d'un droit d'accès, de modification, de rectification et de
                suppression des données qui vous concernent. Pour demander une modification, rectification ou
                suppression des données vous concernant, il vous suffit d'envoyer un courrier par voie électronique ou
                postale à l'adresse suivante: [adresse email ou postale].
              </p>
              <p>Le site est déclaré à la CNIL sous le numéro [numéro de déclaration].</p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">6. Cookies</h2>
              <p>
                L'utilisateur est informé que lors de ses visites sur le site, un cookie peut s'installer
                automatiquement sur son logiciel de navigation. Un cookie est un élément qui ne permet pas d'identifier
                l'utilisateur mais sert à enregistrer des informations relatives à la navigation de celui-ci sur le site
                Internet. L'utilisateur pourra désactiver ce cookie par l'intermédiaire des paramètres figurant au sein
                de son logiciel de navigation.
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">7. Liens Hypertextes</h2>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres
                ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de [Nom de votre
                société].
              </p>
            </div>

            <Separator className="border-gray-800" />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-cyan-400">8. Droit Applicable et Juridiction Compétente</h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux
                français seront seuls compétents.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Contactez-nous</h3>
              <p className="mb-4">Pour toute question concernant ces mentions légales, veuillez nous contacter:</p>
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

