import ConvertApi from "convertapi";

if (!process.env.CONVERT_API_SECRET) {
  throw new Error('CONVERT_API_SECRET environment variable is not set');
}

// Initialize ConvertAPI with the secret key
export const convertApi = new ConvertApi(process.env.CONVERT_API_SECRET);