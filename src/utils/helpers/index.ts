import { parseISO, format } from 'date-fns'

export const isoDateFormatter = (date: string): string => {
  return format(parseISO(date), 'MM/dd')
}
