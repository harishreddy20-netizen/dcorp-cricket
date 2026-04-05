import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { createClient } from "@supabase/supabase-js";
import PageBanner from "@/components/PageBanner";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Dcorp Cricket Club matches, training sessions, and club events.",
};

const BUCKET = "Dcorp-cricket";

export default async function GalleryPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data: files, error } = await supabase.storage.from(BUCKET).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  const images =
    files
      ?.filter((f) => f.name !== ".emptyFolderPlaceholder" && /\.(jpe?g|png|webp|gif|avif)$/i.test(f.name))
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      })) ?? [];

  return (
    <div>
      <PageBanner
        eyebrow="Dcorp CC"
        title="Gallery"
        subtitle="Moments from matches, training sessions, and club events."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">
            Club Photos
          </h2>
          {images.length > 0 && (
            <span className="ml-auto text-xs bg-red-50 text-[#dc2626] border border-red-200 px-3 py-1.5 rounded-full font-semibold">
              {images.length} photos
            </span>
          )}
        </div>

        {error ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-900 font-semibold mb-1">Couldn&apos;t load photos</p>
            <p className="text-gray-500 text-sm">{error.message}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-900 font-semibold mb-1">No photos yet</p>
            <p className="text-gray-500 text-sm">Photos will appear here once uploaded to the storage bucket.</p>
          </div>
        ) : (
          <GalleryGrid images={images} />
        )}
      </div>
    </div>
  );
}
