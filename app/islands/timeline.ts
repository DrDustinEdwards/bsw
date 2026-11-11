/*
  Process timeline, an island (app/site.ts starts it) on Timeline.tsx: Capsomer's timeline behavior,
  which fills the line once the timeline scrolls into view. enhance() looks through the page (it skips
  a timeline already started); the island only decides when it loads.
*/
import { enhance } from "capsomer/behavior/timeline";

export default function timeline() {
  enhance();
}
