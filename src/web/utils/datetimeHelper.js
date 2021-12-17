import { format } from 'date-fns';

/**
 * Kiểm tra Date có hợp lệ (khác Invalid Date).
 * @param {Date} date
 * @returns {boolean}
 */
export function isDateValid(date) {
  return date instanceof Date && date.getTime() === date.getTime();
}

export const defaultDateTimeFormat = 'dd/MM/yyyy HH:mm';
export const defaultDateFormat = 'dd/MM/yyyy';
export const defaultDateMask = '__/__/____';

/**
 * Format date sang string.
 * @param {Date | string} date
 * @param {string} dateFormat @default 'dd/MM/yyyy HH:mm'
 * @returns Giá trị Date đã format sang string.
 */
export function formatDateTime(date, dateFormat = defaultDateTimeFormat) {
  try {
    if (date !== undefined) {
      if (date instanceof Date) {
        return format(date, dateFormat);
      } else {
        return format(new Date(date), dateFormat);
      }
    }

    return '';
  } catch (e) {
    console.error(e);
    return '';
  }
}

export function resetTime(date, hours, minutes, seconds, milliseconds = 0) {
  date.setHours(hours, minutes, seconds, milliseconds);
  return date;
}
