const strDate = (str, isToDate) => {
  if (isToDate) {
    return str.split(".").reverse().join("-")
  } else {
    return str.split("-").reverse().join(".")
  }

};

export default strDate;