// components/LoadingScreen.jsx
const LoadingScreen = ({ message = "Učitavanje sadržaja..." }) => {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        {/* Logo or Brand Name */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-dark-color">
            ElitProjekt
          </h1>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          {/* Spinning Circle */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-dark-color rounded-full animate-spin mb-6"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg text-light-gray font-medium animate-pulse">
            {message}
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-dark-color rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-dark-color rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-dark-color rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  };

  export default LoadingScreen;
