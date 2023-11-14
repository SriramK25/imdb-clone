function Loading({ className }) {
  return (
    <div className={`sw-empty ${className}`}>
      <div className="dots"></div>
    </div>
  );
}

export default Loading;
