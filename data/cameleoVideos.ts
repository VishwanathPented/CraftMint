import type { Finish } from "@/types";

/**
 * Official Cameleo Deco Coatings (Poland) application-technique videos.
 *
 * Craftmint imports and applies Cameleo materials on Indian projects (see
 * app/(site)/cameleo). Every entry below was verified directly against the
 * live cameleo.pl product pages — each product page embeds one YouTube
 * video via youtube.com/embed/{id} — and cross-checked against the YouTube
 * oEmbed API, which confirms `author_name: "Cameleo TV"` (the brand's
 * official channel, youtube.com/@Cameleo_TV) for every ID here. Nothing in
 * this list is guessed.
 *
 * Craftmint's own finish catalogue (data/finishes.ts) uses placeholder
 * names pending a finalised product range, so these are intentionally
 * mapped at the category/technique level (getFinishTechniqueVideo below),
 * not claimed as a specific SKU match.
 */
export interface CameleoVideo {
  id: string;
  youtubeId: string;
  title: string;
}

export const cameleoVideos: CameleoVideo[] = [
  { id: "concrete-effect-classic", youtubeId: "3FlQfxUTuI8", title: "Concrete Effect Classic Effect" },
  { id: "concrete-effect-smooth", youtubeId: "UQd8K2Cey7U", title: "Concrete Effect Smooth Effect" },
  { id: "uni-concrete-classic", youtubeId: "eAFVrF-LPwY", title: "Uni Concrete Classic Effect" },
  { id: "uni-concrete-metallic", youtubeId: "twT5ahK1mXY", title: "Uni Concrete Metallic Classic Effect" },
  { id: "concrete-effect-rough", youtubeId: "eQTBgg6VoPU", title: "Concrete Effect Rough Classic Effect" },
  { id: "manhattan-classic", youtubeId: "GJ9qZv9t1bk", title: "Manhattan Classic Effect" },
  { id: "pearl-stucco-matt", youtubeId: "NDt2axB4Fjo", title: "Pearl Stucco Matt Classic Effect" },
  { id: "venetian-stucco-classic", youtubeId: "N8q9Zta0gGQ", title: "Venetian Stucco Classic Effect" },
];

function getVideo(id: string): CameleoVideo {
  const video = cameleoVideos.find((v) => v.id === id);
  if (!video) throw new Error(`Unknown Cameleo video id: ${id}`);
  return video;
}

/**
 * Maps a finish to an application-technique video, at the category level
 * only, and only where the correspondence is unambiguous (our "Concrete"
 * and "Metallic" categories map directly onto Cameleo's own Concrete
 * Effect / Uni Concrete Metallic product lines). Every other category is
 * deliberately left unmatched rather than paired with a lookalike video.
 */
export function getFinishTechniqueVideo(finish: Pick<Finish, "category" | "textureType">): CameleoVideo | null {
  if (finish.category === "Concrete") {
    const isRough = finish.textureType === "Rough" || finish.textureType === "Sculptural" || finish.textureType === "Heavy";
    return getVideo(isRough ? "concrete-effect-rough" : "concrete-effect-classic");
  }
  if (finish.category === "Metallic") {
    return getVideo("uni-concrete-metallic");
  }
  return null;
}
