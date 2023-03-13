export /**
 * valida si el valor es un email
 *
 * @param {string} value
 * @return {boolean} true si es un email, false si no lo es
 */
const IsEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
