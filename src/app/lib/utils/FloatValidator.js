export default function FloatValidator(value) {
  // First convert to number if it's a string
  const num = typeof value === 'string' ? Number(value) : value;
  
  // Check if it's a valid number and greater than 0
  return !isNaN(num) && num > 0;
}
