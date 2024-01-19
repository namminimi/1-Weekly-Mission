export const isLocation = () => {
  if (typeof window !== undefined) {
    const location = window.location.pathname;
    if (location.indexOf("folder") > -1) {
      return true;
    } else {
      return false;
    }
  }
};
