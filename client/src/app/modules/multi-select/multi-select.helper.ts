export const KEY_UP: string = 'keyup';
export const KEY_DOWN: string = 'keydown';
export const ESCAPE: string = 'Escape';
export const ENTER: string = 'Enter';
export const BACKSPACE: string = 'Backspace';

export const sanitizeString = ( text: string ): string|null =>
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();