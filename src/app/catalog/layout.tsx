import { generateCatalogMetadata } from '@/lib/metadata'

export const metadata = generateCatalogMetadata()

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
