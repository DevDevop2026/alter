import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Politique de confidentialité",
  description:
    "Découvrez comment Almira Aldahab Foundation protège les données des participants à Projet Solidarité.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-(--color-bg) text-slate-900">
      <PageShell
        title="Politique de confidentialité"
        eyebrow="Transparence • protection des données"
        description="Cette politique explique quelles informations sont utilisées dans le cadre de Projet Solidarité et comment elles sont protégées."
        align="left"
      >
        <div className="space-y-8 text-left">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">1. Responsable du traitement</h2>
            <p className="mt-3 text-sm text-slate-600">
              Les informations présentées sur ce site sont liées à Projet Solidarité, une initiative solidaire d’Almira Aldahab Foundation, dirigée par Amira. Pour toute question relative à vos données personnelles, vous pouvez contacter l’équipe via la page Contact.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">2. Données utilisées</h2>
            <p className="mt-3 text-sm text-slate-600">
              Lorsque vous participez au jeu solidaire, le site peut utiliser les informations que vous saisissez dans le formulaire : nom, prénom, pays et numéro WhatsApp. Le système génère également un code unique associé à votre participation.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Nous vous invitons à ne communiquer que les informations nécessaires au traitement de votre participation. Le site ne demande pas de mot de passe ni de données bancaires dans le formulaire de participation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">3. Fonctionnement du jeu solidaire</h2>
            <p className="mt-3 text-sm text-slate-600">
              Projet Solidarité est un jeu solidaire proposé par Almira Aldahab Foundation. Pour participer, vous renseignez les informations demandées, puis le site génère un code unique de participation. Ce code sert à identifier et suivre votre demande pendant le processus de validation.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              La participation est personnelle et doit respecter les instructions affichées sur le site. La génération d’un code ne constitue pas, à elle seule, une confirmation automatique d’un don ou d’une récompense : la validation dépend de la vérification effectuée par l’équipe et des conditions applicables au jeu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">4. Utilisation des informations</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>enregistrer et suivre votre participation à Projet Solidarité ;</li>
              <li>générer et associer votre code unique à votre participation ;</li>
              <li>vous contacter au sujet de la validation, d’un don ou d’une récompense ;</li>
              <li>transmettre, à votre demande, les informations nécessaires via WhatsApp à l’équipe chargée du suivi ;</li>
              <li>améliorer la clarté, la sécurité et le fonctionnement du site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">5. Redirection vers WhatsApp</h2>
            <p className="mt-3 text-sm text-slate-600">
              Après la génération de votre code, vous pouvez choisir d’ouvrir WhatsApp pour envoyer vos informations à l’équipe. Cette action ouvre un service tiers soumis à la politique de confidentialité et aux conditions d’utilisation de WhatsApp. Vérifiez le contenu du message avant de l’envoyer et ne partagez aucune information inutile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">6. Conservation et sécurité</h2>
            <p className="mt-3 text-sm text-slate-600">
              Les informations sont conservées pendant la durée nécessaire au suivi de votre participation, à la validation de votre code et au traitement de votre demande. Almira Aldahab Foundation met en œuvre des mesures raisonnables pour limiter l’accès aux informations et éviter leur utilisation non autorisée.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Aucun système connecté à Internet ne pouvant garantir une sécurité absolue, évitez de transmettre des informations sensibles qui ne sont pas demandées par le site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">7. Partage des données</h2>
            <p className="mt-3 text-sm text-slate-600">
              Les données ne sont pas vendues. Elles peuvent être communiquées uniquement aux personnes ou services nécessaires au suivi de votre participation, notamment lorsque vous choisissez d’envoyer votre message via WhatsApp, ou lorsque la loi l’exige.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">8. Vos droits</h2>
            <p className="mt-3 text-sm text-slate-600">
              Selon la réglementation applicable, vous pouvez demander l’accès, la rectification, la suppression ou la limitation de l’utilisation de vos données personnelles. Vous pouvez également vous opposer à certains traitements. Pour exercer vos droits, contactez l’équipe via la page Contact en précisant votre demande et les informations permettant de retrouver votre participation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">9. Mise à jour de cette politique</h2>
            <p className="mt-3 text-sm text-slate-600">
              Cette politique peut être mise à jour pour tenir compte de l’évolution du site, de ses fonctionnalités ou des obligations applicables. La version publiée sur cette page est la version de référence.
            </p>
          </section>
        </div>
      </PageShell>
    </div>
  );
}
