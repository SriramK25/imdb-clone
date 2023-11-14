function Error({ text }) {
  return (
    <div className="sw-empty">
      <ion-icon name="warning-outline"></ion-icon>
      <p className="sw-empty--text">{text}</p>
    </div>
  );
}

export default Error;
