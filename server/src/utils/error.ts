export class CustomError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (error) => {
  const { status, message } = error;
  return { status: status || 500, message };
};
