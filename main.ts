// Funniest Time Machine Warning Label — entry program.
// Writes one warning label, 120 characters at most, to
// <MAKEFUN_OUTPUT_DIR>/entry.txt. The grader runs the repo read-only,
// so the program writes only to the output directory, never a
// relative path.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The label: the grandfather paradox — the canonical time-travel
// hazard — turned into a deadpan practical problem. The straight
// face holds until the last three words, where the punchline lands:
// killing him is not a moral problem, it is a logistics problem,
// because he holds the only way home.
const LABEL =
  "WARNING: Do not kill your grandfather. He has the only copy of the return instructions.";

// The gate the house runs is 1-120 characters, not only white space,
// so refuse to write anything that is not both before touching the
// output. The brief also demands a single line, phrased as a genuine
// warning label, so enforce both of those too.
if (LABEL.trim().length === 0) {
  console.error("label must not be blank");
  process.exit(1);
}
if (LABEL.includes("\n")) {
  console.error("label must be a single line");
  process.exit(1);
}
if (!LABEL.startsWith("WARNING:")) {
  console.error("label must read as a warning label");
  process.exit(1);
}
if (LABEL.length < 1 || LABEL.length > 120) {
  console.error(`label must be 1-120 characters, got ${LABEL.length}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LABEL, "utf8");
console.log(`wrote entry.txt (${LABEL.length} chars) to ${OUTPUT_DIR}`);
