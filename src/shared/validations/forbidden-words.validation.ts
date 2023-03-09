/**
 *  Valida si el valor contiene palabras prohibidas.
 *
 * @param {string} value Valor a validar.
 * @return  {boolean} Verdadero si contiene palabras prohibidas.
 */
export const ContainForbiddenWords = (value: string): boolean => {
  const forbiddenWords = [
    'admin',
    'root',
    'password',
    'sexo',
    'drogas',
    'alcohol',
    'violencia',
    'asesino',
    'terrorista',
    'nazi',
    'racista',
    'homofóbico',
    'misógino',
    'anarquía',
    'anarquista',
    'comunista',
    'socialista',
    'fascista',
    'totalitario',
    'dictador',
  ];
  if (
    forbiddenWords.filter((word) => value.toLowerCase().includes(word)).length >
    0
  )
    return true;
  return false;
};
