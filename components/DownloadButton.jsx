"use client";

const DownloadButton = ({ text, blueprint }) => {
    const handleDownload = () => {
        if (!blueprint?.url) {
          console.error('No blueprint URL available')
          return
        }

        const link = document.createElement('a')
        link.href = blueprint.url
        link.download = blueprint.name || 'blueprint.pdf'
        link.target = '_blank' // Optional: opens in new tab if download fails
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

    return (
      <button className="animated-button" onClick={handleDownload}>
        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          ></path>
        </svg>
        <span className="text">{text}</span>
        <span className="circle"></span>
        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          ></path>
        </svg>
      </button>
    )
  }

  export default DownloadButton
