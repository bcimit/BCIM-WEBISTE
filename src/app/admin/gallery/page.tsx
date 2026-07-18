import type { Metadata } from 'next'
import { Upload, Trash2 } from 'lucide-react'

export const metadata: Metadata = { title: 'Gallery' }

const PHOTOS = [
  { id: 1, src: '1486325212136-afb4a73e7a9b', caption: 'Techridge Park Phase 3', cat: 'Commercial' },
  { id: 2, src: '1600596542815-ffad4c1539a9', caption: 'Godrej Ascend Residences', cat: 'Residential' },
  { id: 3, src: '1497366216548-37526070297c', caption: 'Trinity Business Park', cat: 'Commercial' },
  { id: 4, src: '1541888946425-d81bb19240f5', caption: 'Divyasree Omega Corporate', cat: 'Commercial' },
  { id: 5, src: '1564013799919-ab600027ffc6', caption: 'Verdant Villa Enclave', cat: 'Residential' },
  { id: 6, src: '1486406146926-c627a92ad1ab', caption: 'LOCL Commercial Tower', cat: 'Commercial' },
  { id: 7, src: '1504307651254-35680f356dfd', caption: 'Construction in progress', cat: 'Construction' },
  { id: 8, src: '1503387762-592deb58ef4e', caption: 'Aluminium formwork system', cat: 'Construction' },
]

const CAT_COLOR: Record<string, string> = {
  Commercial: 'bg-primary/10 text-primary',
  Residential: 'bg-emerald-100 text-emerald-700',
  Construction: 'bg-amber-100 text-amber-700',
}

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Gallery</h1>
          <p className="text-navy-500 text-sm mt-1">{PHOTOS.length} photos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
          <Upload size={16} /> Upload Photos
        </button>
      </div>

      {/* Upload drop zone */}
      <div className="border-2 border-dashed border-navy-200 rounded-2xl p-10 text-center hover:border-primary transition-colors cursor-pointer bg-white">
        <Upload size={32} className="text-navy-300 mx-auto mb-3" />
        <p className="font-semibold text-navy-700">Drop photos here or click to upload</p>
        <p className="text-xs text-navy-400 mt-1">JPG, PNG, WebP up to 10MB each</p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PHOTOS.map(photo => (
          <div key={photo.id} className="group relative rounded-2xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)] bg-white">
            <div className="aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://images.unsplash.com/photo-${photo.src}?q=70&w=400&auto=format&fit=crop`}
                alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-dark line-clamp-1">{photo.caption}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[0.625rem] font-bold ${CAT_COLOR[photo.cat] ?? 'bg-navy-100'}`}>{photo.cat}</span>
            </div>
            <button className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
