function ArrayDisplay(props) {
  const array = props?.array ?? [];

  return (
    <div className="text-white mt-2 text-sm">
      {Array.isArray(array) && array.length > 0
        ? array.join(", ")
        : "Array is empty"}
    </div>
  );
}

export default ArrayDisplay;
