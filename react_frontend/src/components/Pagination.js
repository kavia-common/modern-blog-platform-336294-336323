import React from 'react';
import './Pagination.css';

/**
 * Pagination - Blog pagination matching Figma node 1:291.
 * Previous / numbered pages / Next with active page highlight.
 *
 * @param {Object} props
 * @param {number} props.currentPage - Active page (1-indexed)
 * @param {number} props.totalPages - Total page count
 * @param {Function} props.onPageChange - Callback(newPage: number)
 */
// PUBLIC_INTERFACE
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const buildPageNumbers = () => {
    const pages = [];
    const delta = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <nav className="tb-pagination" aria-label="Blog post pagination">
      <button
        className="tb-pagination__btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M15.8334 9.99999H4.16675M4.16675 9.99999L10.0001 15.8333M4.16675 9.99999L10.0001 4.16666" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Previous</span>
      </button>

      <div className="tb-pagination__numbers" role="list">
        {buildPageNumbers().map((page, idx) => (
          <div key={`${page}-${idx}`} role="listitem">
            {page === '...' ? (
              <span className="tb-pagination__ellipsis" aria-hidden="true">...</span>
            ) : (
              <button
                className={`tb-pagination__number${page === currentPage ? ' tb-pagination__number--active' : ''}`}
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        className="tb-pagination__btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <span>Next</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4.16675 9.99999H15.8334M15.8334 9.99999L10.0001 4.16666M15.8334 9.99999L10.0001 15.8333" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </nav>
  );
}

export default Pagination;
