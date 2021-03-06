import React from "react";
import { AppError } from "../../services/httpClient/AppError";
import { getParameterCaseInsensitive } from "../../services/util/ObjectUtil";

type Props = {
  name: string;
  error: AppError | undefined;
};

export default function InputError(props: Props) {
  const errors: string[] = getParameterCaseInsensitive(
    props.error && props.error.validationResult,
    props.name
  );
  return (
    <>
      {errors &&
        errors.map((x, i) => (
          <p className="text-red-500 text-xs italic mt-2" key={i}>
            {x}
          </p>
        ))}
    </>
  );
}

export const AddError = <T extends {}>(
  validationResult: Record<keyof T, string[]>,
  key: keyof T,
  message: string
) => {
  if (key in validationResult) {
    validationResult[key].push(message);
  } else {
    validationResult[key] = [message];
  }
};

export const ClearError = <T extends {}>(appError: AppError | undefined, key: keyof T) => {
  if (appError) {
    return new AppError({ ...appError.validationResult, key: [] });
  }

  return new AppError({ key: [] });
};

export const HasErrors = (errors: Record<string, string[]>): boolean => {
  return Object.keys(errors).length > 0;
};
