import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      category: "Général",
      questions: [
        {
          question: "Qu'est-ce que votre plateforme?",
          answer:
            "Notre plateforme est un marché d'investissement qui connecte les porteurs de projets innovants avec des investisseurs. Nous facilitons le financement de projets tout en offrant aux investisseurs des opportunités d'investissement diversifiées.",
        },
        {
          question: "Comment fonctionne votre plateforme?",
          answer:
            "Les porteurs de projets soumettent leurs idées, qui sont ensuite vérifiées par notre équipe. Une fois approuvés, les projets sont listés sur notre plateforme où les investisseurs peuvent les découvrir, les analyser et y investir. Nous gérons toute la partie administrative et les transactions financières.",
        },
        {
          question: "Qui peut utiliser votre plateforme?",
          answer:
            "Notre plateforme est ouverte aux entrepreneurs et porteurs de projets cherchant du financement, ainsi qu'aux investisseurs individuels et institutionnels cherchant des opportunités d'investissement. Tous les utilisateurs doivent passer par un processus de vérification conforme aux réglementations en vigueur.",
        },
      ],
    },
    {
      category: "Pour les Porteurs de Projets",
      questions: [
        {
          question: "Comment puis-je soumettre mon projet?",
          answer:
            "Pour soumettre votre projet, créez un compte, complétez votre profil, puis utilisez notre formulaire de soumission de projet. Vous devrez fournir des détails sur votre projet, votre équipe, vos finances et votre vision. Notre équipe examinera votre soumission et vous contactera pour les étapes suivantes.",
        },
        {
          question: "Quels types de projets sont acceptés?",
          answer:
            "Nous acceptons une large gamme de projets innovants dans des secteurs tels que la technologie, l'énergie verte, la santé, l'éducation, et plus encore. Les projets doivent être viables, avoir un potentiel de croissance et respecter nos directives éthiques. Nous n'acceptons pas les projets impliquant des activités illégales ou non éthiques.",
        },
        {
          question: "Quels sont les frais pour les porteurs de projets?",
          answer:
            "Nous prélevons une commission de 5% sur les fonds levés avec succès. Il n'y a pas de frais initiaux pour soumettre un projet. Des frais supplémentaires peuvent s'appliquer pour des services premium comme la promotion de votre projet ou l'accès à des outils d'analyse avancés.",
        },
      ],
    },
    {
      category: "Pour les Investisseurs",
      questions: [
        {
          question: "Comment puis-je commencer à investir?",
          answer:
            "Pour commencer à investir, créez un compte, complétez votre profil d'investisseur et passez par notre processus de vérification. Une fois approuvé, vous pouvez déposer des fonds sur votre compte et commencer à explorer les projets disponibles. Vous pouvez investir dans plusieurs projets pour diversifier votre portefeuille.",
        },
        {
          question: "Quel est le montant minimum d'investissement?",
          answer:
            "Le montant minimum d'investissement varie selon les projets, mais commence généralement à 100€. Certains projets premium peuvent avoir des seuils d'investissement plus élevés. Nous encourageons la diversification, donc investir de petits montants dans plusieurs projets est une stratégie courante.",
        },
        {
          question: "Comment sont gérés les retours sur investissement?",
          answer:
            "Les retours sur investissement dépendent du type de projet et de l'accord d'investissement. Ils peuvent prendre la forme de dividendes, d'intérêts, ou de plus-values lors de la revente de parts. Tous les paiements sont traités via notre plateforme et déposés directement sur votre compte, d'où vous pouvez les retirer ou les réinvestir.",
        },
      ],
    },
    {
      category: "Sécurité et Conformité",
      questions: [
        {
          question: "Comment protégez-vous mes données personnelles?",
          answer:
            "Nous utilisons des protocoles de cryptage avancés pour protéger vos données personnelles et financières. Notre plateforme est conforme au RGPD et à d'autres réglementations internationales sur la protection des données. Nous ne partageons jamais vos informations avec des tiers sans votre consentement explicite.",
        },
        {
          question: "Comment vérifiez-vous les projets?",
          answer:
            "Chaque projet passe par un processus de vérification rigoureux qui comprend la vérification de l'identité des fondateurs, l'analyse du plan d'affaires, l'évaluation de la viabilité du projet et la vérification de la conformité légale. Nous travaillons avec des experts dans divers domaines pour évaluer les aspects techniques des projets.",
        },
        {
          question: "Quelles réglementations suivez-vous?",
          answer:
            "Notre plateforme est conforme aux réglementations financières européennes, y compris les directives sur les services de paiement (DSP2), les réglementations sur le financement participatif, et les lois anti-blanchiment. Nous travaillons en étroite collaboration avec les autorités de régulation pour assurer une conformité totale.",
        },
      ],
    },
    {
      category: "Support et Assistance",
      questions: [
        {
          question: "Comment puis-je contacter le support client?",
          answer:
            "Vous pouvez contacter notre équipe de support via le formulaire de contact sur notre site, par email à support@votreplateforme.com, ou par téléphone au +33 (0)1 23 45 67 89 pendant les heures d'ouverture (9h-18h CET, du lundi au vendredi).",
        },
        {
          question: "Proposez-vous des ressources éducatives?",
          answer:
            "Oui, nous offrons une bibliothèque complète de ressources éducatives, y compris des guides d'investissement, des webinaires, des études de cas et des tutoriels sur l'utilisation de notre plateforme. Ces ressources sont disponibles gratuitement pour tous les utilisateurs enregistrés.",
        },
        {
          question: "Que faire si je rencontre un problème technique?",
          answer:
            "Si vous rencontrez un problème technique, consultez d'abord notre section d'aide qui couvre les problèmes courants. Si vous ne trouvez pas de solution, contactez notre support technique via le chat en direct ou par email à tech@votreplateforme.com. Notre équipe est disponible 24/7 pour résoudre les problèmes urgents.",
        },
      ],
    },
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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Foire Aux Questions
          </h1>

          <p className="text-xl text-gray-300 mb-12">
            Trouvez des réponses aux questions les plus fréquemment posées sur notre plateforme.
          </p>

          <div className="space-y-10">
            {faqs.map((category, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-semibold text-cyan-400">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${index}-${faqIndex}`}
                      className="border border-cyan-800/50 rounded-lg overflow-hidden bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-blue-900/30 transition-colors text-left">
                        <span className="text-lg font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 text-gray-300">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {index < faqs.length - 1 && <Separator className="border-gray-800 my-8" />}
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-800/50 text-center">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Vous n'avez pas trouvé votre réponse?</h3>
            <p className="text-gray-300 mb-6">
              Notre équipe de support est disponible pour répondre à toutes vos questions.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-black font-semibold">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

