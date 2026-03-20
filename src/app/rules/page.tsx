/**
 * rules/page.tsx
 *
 * Concise tile game rules reference with scoring examples.
 *
 * @author claude — 2026-03-20
 */

export default function RulesPage() {
  return (
    <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
      <h1 className="text-3xl font-extrabold mb-6">How to Play</h1>

      <div className="space-y-6 text-foreground/80">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">Setup</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>2–4 players, 108 tiles (6 shapes x 6 colors x 3 copies)</li>
            <li>Each player draws 6 tiles</li>
            <li>First player: whoever can play the most tiles</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">On Your Turn</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Place 1+ tiles in a single line, OR trade tiles (score 0)</li>
            <li>All tiles in a line must share exactly one attribute (same color OR same shape)</li>
            <li>No duplicates in a line, max 6 tiles per line</li>
            <li>Draw back to 6 tiles after placing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">Scoring</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Each tile placed scores 1 point per tile in the line (including existing tiles)</li>
            <li>If a tile touches two lines, both lines score</li>
            <li>A single tile next to one existing tile = 2 points minimum</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">Scoring Examples</h2>
          <div className="space-y-3 text-sm bg-foreground/5 rounded-2xl p-4">
            <div>
              <p className="font-bold">Place 1 tile extending a line of 3:</p>
              <p>Score: 4 points (4 tiles in the line)</p>
            </div>
            <div>
              <p className="font-bold">Place 2 tiles extending a line of 2:</p>
              <p>Score: 4 points (4 tiles in the line)</p>
            </div>
            <div>
              <p className="font-bold">Place 1 tile that touches two lines (3 and 4):</p>
              <p>Score: 3 + 4 = 7 points</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">
            <span className="text-primary">Perfect Line!</span> (+6 bonus)
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Complete a line of exactly 6 tiles = 6 points for the line + 6 bonus = <strong>12 total</strong></li>
            <li>Complete two perpendicular lines of 6 = <strong>24 points</strong></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">End Game</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Game ends when no more tiles can be drawn and a player empties their hand</li>
            <li>That player gets <strong>+6 bonus points</strong></li>
            <li>Highest score wins!</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
