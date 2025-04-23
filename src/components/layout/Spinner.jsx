const Spinner = () => (
  <div className="flex justify-center items-center h-48">
    <div
      role="status"
      className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
    ></div>
  </div>
);

export default Spinner;