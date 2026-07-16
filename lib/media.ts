// All footage is hotlinked from Pexels CDNs (free for commercial use, no
// attribution required). Every slot on the site plays a DIFFERENT clip —
// no video is used twice. Swap any clip for real clinic footage later.

export type Video = { mp4: string; poster: string };

function video(id: string, file: string, poster: string, w = 1280): Video {
  return {
    mp4: `https://videos.pexels.com/video-files/${id}/${file}.mp4`,
    poster: `https://images.pexels.com/videos/${id}/${poster}?auto=compress&cs=tinysrgb&w=${w}`,
  };
}

const adventist = (id: string) => `adventist-adventist-health-doctor-nurse-${id}.jpeg`;
const pp = (id: string) => `pexels-photo-${id}.jpeg`;

export const media = {
  // ── Hero montage (hero-only clips) ──────────────────────────
  heroMontage: [
    video("30141924", "12925508_1920_1080_30fps", adventist("30141924"), 1920), // nurse caring for patient
    video("6130037", "6130037-hd_1920_1080_30fps", pp("6130037"), 1920), // nurse tending patient bedside
    video("30141938", "12925561_1920_1080_24fps", adventist("30141938"), 1920), // doctor with smiling patient
  ],

  // ── Section videos (each used exactly once) ─────────────────
  teamVideo: video("30141965", "12925604_1920_1080_24fps", adventist("30141965"), 1920), // why-us: medical team
  ctaVideo: video("6130026", "6130026-hd_1920_1080_30fps", pp("6130026"), 1920), // home CTA: nurse checking patient
  servicesHeaderVideo: video("4214779", "4214779-hd_1920_1080_25fps", pp("4214779"), 1920), // services header: lab scientist
  pediatricSectionVideo: video("8375752", "8375752-hd_720_1366_25fps", pp("8375752"), 720), // pediatric: mom on advice call
  employersVideo: video("8540037", "8540037-hd_720_1366_25fps", "analysis-biochemistry-biology-biotechnology-8540037.jpeg", 720), // employers: lab work
  aboutHeaderVideo: video("6686962", "6686962-hd_1920_1080_25fps", pp("6686962"), 1920), // about header: medic with patient
  aboutBandVideo: video("8375441", "8375441-hd_720_1366_25fps", pp("8375441"), 720), // about band: caring consult
  contactHeaderVideo: video("6998548", "6998548-hd_1080_1920_25fps", "cardiogram-clinic-diagnosis-doctor-6998548.jpeg", 1080), // contact: patient care

  // ── Service card clips (24 unique) ──────────────────────────
  svcFever: video("3989331", "3989331-hd_1920_1080_30fps", pp("3989331")), // mom checking son's temperature
  svcThroat: video("7195603", "7195603-hd_1366_720_25fps", "adolescent-advice-beautiful-bed-7195603.jpeg"), // sick woman resting
  svcCut: video("5721605", "5721605-hd_1366_720_25fps", pp("5721605")), // bandaging a hand
  svcSprain: video("7187397", "7187397-hd_1920_1080_24fps", "abdomen-active-activity-adult-7187397.jpeg"), // wrapping a hand bandage
  svcStomach: video("5998433", "5998433-hd_1080_1920_30fps", "child-computer-covid-covid-19-5998433.jpeg", 720), // provider interviewing patient
  svcRash: video("8375667", "8375667-hd_720_1366_25fps", pp("8375667"), 720), // mom with sick child
  svcPhysical: video("8460075", "8460075-hd_1920_1080_24fps", "adult-appoint-blood-pressure-business-8460075.jpeg"), // doctor's office check
  svcWork: video("8460350", "8460350-hd_1920_1080_24fps", "abstract-adult-anatomy-art-8460350.jpeg"), // arm care closeup

  svcEar: video("6998336", "6998336-hd_1080_1920_25fps", pp("6998336"), 720), // neck/ear ultrasound exam
  svcUti: video("6290542", "6290542-hd_1920_1080_30fps", pp("6290542")), // sample collected in test tube
  svcPinkeye: video("7640955", "7640955-hd_720_1366_25fps", pp("7640955"), 720), // mom checking on boy
  svcAsthma: video("5867817", "5867817-hd_1366_720_25fps", pp("5867817")), // girl checking her temperature
  svcBurn: video("7698679", "7698679-hd_720_1366_25fps", pp("7698679"), 720), // wounded hand
  svcBite: video("8375713", "8375713-hd_1366_720_25fps", pp("8375713")), // mom checking daughter
  svcCovid: video("8534603", "8534603-hd_1920_1080_30fps", "4k-analyzing-biotechnology-chemical-8534603.jpeg"), // sealing a sample tube
  svcIv: video("6688055", "6688055-hd_1080_1920_25fps", "ambulance-ambulance-call-cough-couple-6688055.jpeg", 720), // arm receiving IV fluids

  svcXray: video("7705202", "7705202-hd_1920_1080_25fps", "healthcare-and-medicine-medic-medical-equipment-medical-practitioner-7705202.jpeg"), // imaging equipment in use
  svcLab: video("8381266", "8381266-hd_720_1280_25fps", pp("8381266"), 720), // test tubes in analyzer
  svcVaccine: video("8413524", "8413524-hd_1920_1080_25fps", "abdomen-adult-aid-blood-8413524.jpeg"), // vaccine being administered
  svcSchool: video("8375758", "8375758-hd_1366_720_25fps", "adult-communication-connection-consultation-8375758.jpeg"), // parent & child consult
  svcWomens: video("5858754", "5858754-hd_1366_720_25fps", pp("5858754")), // woman monitoring her health
  svcPeds: video("8375759", "8375759-hd_1366_720_25fps", pp("8375759")), // mother taking child's temperature
  svcScreen: video("3735731", "3735731-hd_1920_1080_25fps", pp("3735731")), // lab sample analysis
  svcEmployer: video("6998092", "6998092-hd_1920_1080_25fps", pp("6998092")), // provider operating diagnostics
};
