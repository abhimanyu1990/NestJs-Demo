import { registerDecorator, ValidationOptions, ValidationArguments,ValidatorConstraint,ValidatorConstraintInterface, IsBoolean, Validator } from 'class-validator';

@ValidatorConstraint({name: 'MatchRegex'})
export class MatchRegexConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
      let strongRegex = new RegExp(args.constraints[0]);
      return typeof value === 'string' && strongRegex.test(value);
    }

   defaultMessage(args: ValidationArguments) {
     return `${args.property} must be Alphanumeric and have minimum length of 8 charaters. It contain atleast 1 capital letter, 1 small letter , atleast one special character !@#$%^&*'`;
  }
}

export function MatchRegex(property: string,validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'MatchRegex',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: MatchRegexConstraint
    });
  };
}
