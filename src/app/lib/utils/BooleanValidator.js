export default function BooleanValidator(value) {
  if (typeof value != "boolean") {
    return false;
  }
  else {
    return true;
  }
}
