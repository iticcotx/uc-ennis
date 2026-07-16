// All footage is hotlinked from Pexels CDNs (free for commercial use, no
// attribution required). Swap any clip for real clinic footage later.
// NOTE: this clip set is intentionally distinct from the NuvMed site.

export type Video = { mp4: string; poster: string };

function video(id: string, file: string, poster: string, w = 1280): Video {
  return {
    mp4: `https://videos.pexels.com/video-files/${id}/${file}.mp4`,
    poster: `https://images.pexels.com/videos/${id}/${poster}?auto=compress&cs=tinysrgb&w=${w}`,
  };
}

const adventist = (id: string) => `adventist-adventist-health-doctor-nurse-${id}.jpeg`;

export const media = {
  // Hero montage — modern hospital care scenes, crossfading
  heroMontage: [
    video("30141924", "12925508_1920_1080_30fps", adventist("30141924"), 1920), // nurse caring for patient
    video("6130037", "6130037-hd_1920_1080_30fps", "pexels-photo-6130037.jpeg", 1920), // nurse tending patient bedside
    video("30141938", "12925561_1920_1080_24fps", adventist("30141938"), 1920), // doctor with smiling patient
  ],

  // Service category tabs
  illnessVideo: video("3989331", "3989331-hd_1920_1080_30fps", "pexels-photo-3989331.jpeg"), // mom checking sick son's temperature
  injuryVideo: video("5721605", "5721605-hd_1366_720_25fps", "pexels-photo-5721605.jpeg"), // bandaging an injured hand
  diagnosticsVideo: video("4214779", "4214779-hd_1920_1080_25fps", "pexels-photo-4214779.jpeg"), // lab scientist with blood sample
  physicalsVideo: video("8413524", "8413524-hd_1920_1080_25fps", "abdomen-adult-aid-blood-8413524.jpeg"), // vaccine being administered

  // Section videos
  teamVideo: video("30141965", "12925604_1920_1080_24fps", adventist("30141965"), 1920), // medical team in hallway
  doctorPatientVideo: video("30141938", "12925561_1920_1080_24fps", adventist("30141938"), 1920), // doctor with patient
  pediatricVideo: video("8375667", "8375667-hd_720_1366_25fps", "pexels-photo-8375667.jpeg", 720), // mom with sick child (vertical)
  labVideo: video("8381266", "8381266-hd_720_1280_25fps", "pexels-photo-8381266.jpeg", 720), // test tubes in analyzer (vertical)
  nurseCheckVideo: video("6130026", "6130026-hd_1920_1080_30fps", "pexels-photo-6130026.jpeg", 1920), // nurse checking on patient
};
