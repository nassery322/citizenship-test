import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <section className="loading">
      <div className="multi-spinner-container">
        <div className="multi-spinner">
          <div className="multi-spinner">
            <div className="multi-spinner">
              <div className="multi-spinner">
                <div className="multi-spinner">
                  <div className="multi-spinner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSpinner;
