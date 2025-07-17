export const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
