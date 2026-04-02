export const joinClassNames = (
  ...classNames: Array<string | false | null | undefined>
) => {
  return classNames.filter(Boolean).join(" ");
};
