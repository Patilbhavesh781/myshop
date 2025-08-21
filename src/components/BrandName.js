
export default function TrustedByFooter() {
  const companies = [
    { name: "STPL", logo: "/images/sptl.jpg" },
    { name: "IIT Delhi", logo: "/images/delhi.jpg" },
    { name: "Xiaomi", logo: "/images/xiomi.jpg" },
    { name: "VIT", logo: "/images/vit.jpg" },
    { name: "L&T", logo: "/images/tech.jpg" },
    { name: "IIT Kanpur", logo: "/images/lit.jpg" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-14 tracking-tight text-gray-100">
          Trusted by leading institutions & companies
        </h2>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-10 items-center justify-items-center">
          {companies.map((c, i) => (
            <div
              key={i}
              className="w-28 h-20 flex items-center justify-center p-3   rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={c.logo}
                alt={c.name}
                className=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Optional SVG Decoration (very subtle) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      
      <div className="relative z-10 border-t border-gray-700 py-6 text-center text-sm text-white font-bold">
        © {new Date().getFullYear()} <span className="font-semibold text-white">INFILL FILAMENT</span>. All rights reserved.
      </div>
    </footer>
  );
}
