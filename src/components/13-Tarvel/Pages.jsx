// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const CardDetailPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { image } = location.state || {};

//   if (!image) {
//     // Redirect back if no image data
//     navigate("/", { replace: true });
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
//         <img
//           src={image.url}
//           alt="Selected Card"
//           className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] object-cover"
//         />
//         <div className="p-6">
//           <p className="text-gray-800 text-lg md:text-xl leading-relaxed">{image.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pages;
