// All footage is hotlinked from Pexels CDNs (free for commercial use, no
// attribution required). Swap any clip for real clinic footage later.

export type Video = { mp4: string; poster: string };

function pexels(id: string, variant: string, poster: string, w = 1280): Video {
  return {
    mp4: `https://videos.pexels.com/video-files/${id}/${id}-${variant}.mp4`,
    poster: `https://images.pexels.com/videos/${id}/${poster}?auto=compress&cs=tinysrgb&w=${w}`,
  };
}

const ptPoster = (id: string) => `disabled-equipment-exercise-fitness-${id}.jpeg`;

export const media = {
  // Hero montage — clinic scenes crossfade for a continuous long loop
  heroMontage: [
    pexels("6997934", "hd_1920_1080_25fps", "pexels-photo-6997934.jpeg", 1920), // patients arriving at the clinic
    pexels("6998077", "hd_1920_1080_25fps", "pexels-photo-6998077.jpeg", 1920), // doctor talking with patient
    pexels("14939817", "hd_1920_1080_25fps", "pexels-photo-14939817.jpeg", 1920), // diagnostic ultrasound
    pexels("14936269", "hd_1920_1080_25fps", "pexels-photo-14936269.jpeg", 1920), // knee exam
  ],

  // Large section videos (HD)
  doctorTalkVideo: pexels("6998077", "hd_1920_1080_25fps", "pexels-photo-6998077.jpeg"), // doctor with patient
  kneeExamVideo: pexels("14936269", "hd_1920_1080_25fps", "pexels-photo-14936269.jpeg"), // injury exam
  ultrasoundVideo: pexels("14939817", "hd_1920_1080_25fps", "pexels-photo-14939817.jpeg"), // imaging/diagnostics
  seniorCareVideo: pexels("7579595", "hd_720_1280_25fps", "pexels-photo-7579595.jpeg", 720), // warm physician consult (vertical)
  clinicCoupleVideo: pexels("6997934", "hd_1920_1080_25fps", "pexels-photo-6997934.jpeg", 1920), // family at the clinic
  rehabVideo: pexels("6111018", "hd_1920_1080_25fps", ptPoster("6111018")), // work-injury recovery therapy
  ptSessionVideo: pexels("6111093", "hd_1920_1080_25fps", ptPoster("6111093"), 1920), // guided therapy session
  reformerVideo: pexels("6111023", "hd_1920_1080_25fps", ptPoster("6111023"), 1920), // therapy backdrop for CTA band

  // Small card videos (SD — light files for grids)
  doctorTalkSd: pexels("6998077", "sd_640_360_25fps", "pexels-photo-6998077.jpeg", 640),
  kneeExamSd: pexels("14936269", "sd_640_360_25fps", "pexels-photo-14936269.jpeg", 640),
  ultrasoundSd: pexels("14939817", "sd_640_360_25fps", "pexels-photo-14939817.jpeg", 640),
  seniorCareSd: pexels("7579595", "sd_360_640_25fps", "pexels-photo-7579595.jpeg", 640),
  clinicCoupleSd: pexels("6997934", "sd_640_360_25fps", "pexels-photo-6997934.jpeg", 640),
  rehabSd: pexels("6111018", "sd_640_360_25fps", ptPoster("6111018"), 640),
  recoverySd: pexels("6111091", "hd_1920_1080_25fps", ptPoster("6111091"), 640), // guided recovery exercise
};
