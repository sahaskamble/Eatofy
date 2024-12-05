import StringValidators from "./StringValidator"

export default function StringArrayValidator(array) {
  let validationFlag = true;

  array.map((item) => {

    const check = StringValidators(item);
    if (!check) {
      validationFlag = false;
    }
  });

  return validationFlag;
}
