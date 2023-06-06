export default function tryCatch(callback: () => any) {
  try {
    return callback();
  } catch (err: any) {
    return err.message;
  }
}
