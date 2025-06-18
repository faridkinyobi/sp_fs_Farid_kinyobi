interface ZodErrorDetail {
  message: string;
  [key: string]: any;
}
export const joiClearMessage = (err: any): string => {
  if (err && Array.isArray(err)) {
    const message = err
      .map((detail: ZodErrorDetail) => detail.message)
      .join(', ');
    return message;
  }

  return 'Validation error';
};
