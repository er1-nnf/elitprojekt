"use client";

// components/ErrorScreen.jsx
const ErrorScreen = ({
    title = "Greška pri učitavanju",
    message = "Dogodila se greška prilikom učitavanja sadržaja. Molimo pokušajte kasnije.",
    onRetry,
    showRetryButton = true
  }) => {
    const handleRetry = () => {
      if (onRetry) {
        onRetry();
      } else {
        window.location.reload();
      }
    };

    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Error Icon */}
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h2 className="text-2xl font-bold text-dark-color mb-4">
            {title}
          </h2>
          <p className="text-light-gray mb-6">
            {message}
          </p>

          {/* Retry Button */}
          {showRetryButton && (
            <button
              onClick={handleRetry}
              className="bg-dark-color text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              Pokušaj ponovno
            </button>
          )}
        </div>
      </div>
    );
  };

  export default ErrorScreen;
