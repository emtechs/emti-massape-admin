export interface iYear {
  id: string
  year: string
}

export type iCategory = 'BIMESTRE' | 'SEMESTRE' | 'ANO'

export interface iPeriod {
  id: string
  name: string
  label: string
  category: iCategory
  date_initial: Date
  date_final: Date
  year: iYear
}
