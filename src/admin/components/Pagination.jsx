import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ 
  currentPage, 
  totalPages = 10, 
  onPageChange, 
  showPages = 10,
  className = ""
}) => {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className={`flex justify-center mt-6 ${className}`}>
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`p-2  rounded hover:bg-gray-50 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Previous page"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 rounded-full text-sm font-medium ${
              currentPage === page
                ? 'bg-[#D1D5DC] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2  rounded hover:bg-gray-50 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Next page"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
