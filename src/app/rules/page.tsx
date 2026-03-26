/**
 * rules/page.tsx
 *
 * Concise tile game rules reference with scoring examples.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-26 — full i18n support for rule body text
 */

'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function RulesPage() {
  const t = useTranslation();

  return (
    <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
      <h1 className="text-3xl font-extrabold mb-6">{t.howToPlay}</h1>

      <div className="space-y-6 text-foreground/80">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">{t.setup}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.ruleSetup1}</li>
            <li>{t.ruleSetup2}</li>
            <li>{t.ruleSetup3}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">{t.onYourTurn}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.ruleTurn1}</li>
            <li>{t.ruleTurn2}</li>
            <li>{t.ruleTurn3}</li>
            <li>{t.ruleTurn4}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">{t.scoring}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.ruleScore1}</li>
            <li>{t.ruleScore2}</li>
            <li>{t.ruleScore3}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">{t.scoringExamples}</h2>
          <div className="space-y-3 text-sm bg-surface rounded-2xl p-4">
            <div>
              <p className="font-bold">{t.ruleExample1Title}</p>
              <p>{t.ruleExample1Score}</p>
            </div>
            <div>
              <p className="font-bold">{t.ruleExample2Title}</p>
              <p>{t.ruleExample2Score}</p>
            </div>
            <div>
              <p className="font-bold">{t.ruleExample3Title}</p>
              <p>{t.ruleExample3Score}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">
            <span className="text-primary">{t.perfectLine}</span> ({t.perfectLineBonus})
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.rulePerfect1}</li>
            <li>{t.rulePerfect2}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">{t.endGameRules}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.ruleEnd1}</li>
            <li>{t.ruleEnd2}</li>
            <li>{t.ruleEnd3}</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
