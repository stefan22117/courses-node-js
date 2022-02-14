export const formatVideoLength = (length: number) => {
    if (!length) {
      return "00:00";
    }
    let str = new Date(length * 1000).toISOString();
  
    str = str.substring(11, 8 + 11);
  
    if (length < 3600) {
      str = str.substring(3, 5 + 3);
    }
    return str;
  };