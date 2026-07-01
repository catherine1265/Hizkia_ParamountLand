import proyekJson from "@/data/proyek.json";
import profilJson from "@/data/profil.json";
import socialJson from "@/data/social.json";

// ---------- Types ----------
export type TipeUnit = {
  nama_tipe: string;
  luas_tanah_m2: number | null;
  luas_bangunan_m2: number | null;
  kamar_tidur: number | null;
  kamar_mandi: number | null;
  jumlah_lantai: number | null;
  harga_rupiah: number | null;
  harga_display: string | null;
  status_unit: string;
};

export type Proyek = {
  slug: string;
  nama: string;
  kategori: string;
  lokasi: string;
  alamat: string;
  status: string;
  harga_mulai_dari: number | null;
  harga_mulai_dari_display: string | null;
  harga_tertinggi: number | null;
  harga_tertinggi_display: string | null;
  deskripsi: string;
  keunggulan: string;
  fasilitas: string;
  fasilitas_tags: string[];
  poi_terdekat: string[];
  legalitas: string;
  skema_pembayaran: string;
  highlight: string[];
  spesifikasi: string[];
  fasilitas_detail: string[];
  promo: string[];
  arsitek: string | null;
  link_video: string | null;
  wa_khusus: string | null;
  urutan_tampil: number | null;
  featured: boolean;
  jumlah_tipe: number;
  jumlah_tipe_tersedia: number;
  card: {
    kamar_tidur: string | null;
    kamar_mandi: string | null;
    luas_tanah_m2: string | null;
    luas_bangunan_m2: string | null;
  };
  foto: {
    cover: string | null;
    galeri: string[];
    denah: string[];
    brosur: string[];
    jumlah: number;
  };
  brosur: string | null;
  brosur_preview: string | null;
  rekomendasi: string[];
  tipe_unit: TipeUnit[];
};

export type Meta = {
  sumber: string;
  jumlah_proyek: number;
  jumlah_tipe_unit: number;
  jumlah_foto: number;
  jumlah_brosur: number;
  harga_terendah: number;
  harga_terendah_display: string;
  harga_tertinggi: number;
  harga_tertinggi_display: string;
  proyek_per_kategori: Record<string, number>;
  proyek_per_lokasi: Record<string, number>;
  proyek_featured: string[];
};

export type Profil = {
  nama: string;
  jabatan: string;
  wa: string;
  wa_link: string;
  email: string;
  pengalaman: string[];
  foto: string;
};

export type Social = {
  whatsapp: string;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  post_terbaru: { platform: string; tipe: string; url: string }[];
};

// ---------- Data accessors ----------
const data = proyekJson as { meta: Meta; proyek: Proyek[] };

export const meta: Meta = data.meta;
export const semuaProyek: Proyek[] = data.proyek;
export const profil: Profil = profilJson as Profil;
export const social: Social = socialJson as Social;

export function getProyek(slug: string): Proyek | undefined {
  return semuaProyek.find((p) => p.slug === slug);
}

export function proyekFeatured(): Proyek[] {
  return semuaProyek.filter((p) => p.featured);
}

export function proyekByKategori(kategori: string): Proyek[] {
  return semuaProyek.filter((p) => p.kategori === kategori);
}

// ---------- Helpers ----------
/** Path aset di JSON (mis. "foto-proyek/x/cover.png") -> URL public "/aset/..." */
export function aset(path: string | null | undefined): string {
  if (!path) return "/aset/placeholder.svg";
  return "/aset/" + path.replace(/^\/+/, "");
}

/** Link WhatsApp dengan pesan prefill nama proyek */
export function waLink(p?: Pick<Proyek, "nama" | "harga_mulai_dari_display">): string {
  const nomor = (social.whatsapp.match(/\d+/) || ["6281211418507"])[0];
  const pesan = p
    ? `Halo Hizkia, saya tertarik dengan proyek *${p.nama}*` +
      (p.harga_mulai_dari_display ? ` (mulai ${p.harga_mulai_dari_display})` : "") +
      `. Boleh minta info lebih lanjut?`
    : `Halo Hizkia, saya mau tanya-tanya soal properti Paramount Land.`;
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
}
