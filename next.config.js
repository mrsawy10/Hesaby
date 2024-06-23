/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // exclude: [/v1/],
  // output: "export", // for making the application into html & css (SSG)

  images: {
    domains: ["aceternity.com", `images.unsplash.com`, `tailwindui.com` ,
    
    'hesaby-s3.s3.me-south-1.amazonaws.com' , 
    'hesaby.s3.me-south-1.amazonaws.com' , 
  ],
  },
};

// module.exports = {
// };

// module.exports = {
//   images: {
//     domains: ['aceternity.com'],
//   },
// };
module.exports = nextConfig;
