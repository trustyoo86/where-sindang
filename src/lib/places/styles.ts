import type { Place } from "@/lib/notion/types";

export const categoryStyles: Record<Place["category"], string> = {
  food: "border-[#ff385c] bg-white text-[#222222]",
  cafe: "border-[#222222] bg-[#f7f7f7] text-[#222222]",
  culture: "border-[#6a6a6a] bg-white text-[#222222]",
  place: "border-[#dddddd] bg-[#222222] text-white",
};

export const imageStyles: Record<string, string> = {
  "warm-table":
    "bg-[radial-gradient(circle_at_28%_24%,#fff4e7_0_12%,transparent_13%),linear-gradient(135deg,#8f3e28_0%,#e6a36f_42%,#fff0df_100%)]",
  "coffee-light":
    "bg-[radial-gradient(circle_at_70%_22%,#ffffff_0_10%,transparent_11%),linear-gradient(135deg,#6f4b32_0%,#c99c74_48%,#f6e7d8_100%)]",
  "gallery-room":
    "bg-[linear-gradient(90deg,rgba(255,255,255,.55)_0_18%,transparent_19%),linear-gradient(135deg,#d9d9d9_0%,#ffffff_45%,#c7b8a7_100%)]",
  "alley-sun":
    "bg-[radial-gradient(circle_at_75%_20%,#fff0a8_0_13%,transparent_14%),linear-gradient(135deg,#d7d0bd_0%,#9da897_52%,#f2d28c_100%)]",
  "night-kitchen":
    "bg-[radial-gradient(circle_at_66%_28%,#ffd3a3_0_10%,transparent_11%),linear-gradient(135deg,#241f1d_0%,#7a3f2b_50%,#c07849_100%)]",
  "yard-cafe":
    "bg-[radial-gradient(circle_at_24%_78%,#6f8c65_0_16%,transparent_17%),linear-gradient(135deg,#efe6d5_0%,#ffffff_42%,#b7c0a4_100%)]",
};
