export const dynamic = "force-dynamic";
import { getGallery } from '@/services/gallery.service';
import GalleryClient from '@/components/public/gallery/GalleryClient';
import { Gallery } from '@/types/gallery';

export default async function GalleryPage() {
    let data: Gallery[] = [];

    try {
        data = await getGallery();
    } catch {
        // Tetap tampilkan halaman kosong ketika backend sedang tidak tersedia.
    }

    return (
        <main><GalleryClient data={data} /></main>
    );
}
