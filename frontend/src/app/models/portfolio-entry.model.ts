export interface PortfolioEntry {
  id?: number
  userId?: number
  title: string
  description: string
  customerUrl: string
  entryImage?: ArrayBuffer | string |undefined
}
