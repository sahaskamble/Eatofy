export default function IntegerValidator(value) {
  return Number(value) === value && value % 1 === 0;
}
