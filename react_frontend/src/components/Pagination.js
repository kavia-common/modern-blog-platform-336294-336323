import React from 'react';
import './Pagination.css';

/**
 * Pagination - Blog pagination matching Figma node 1:291.
 * Layout: Previous button | page number boxes | Next button
 * - Top border: stroke_WGH1DK #EAECF0 1px (border-top only)
 * - Prev/Next: row, gap 8px, arrow SVG + text label
 * - Numbers: layout_QMLV88 row, gap 2px; each box 40×40, borderRadius 8px
 * - Active: fill_EKYITE (#F9F5FF) bg, fill_TQ3KBG (#7F56D9) text
 *
 * Contract:
 *   - Input: currentPage (1-indexed), totalPages, onPageChange callback
 *   - Output: nav JSX or null if totalPages <= 1
 *   - Side effects: none
 *
 * @param {Object} props
 * @param {number} props.currentPage - Active page (1-indexed)
 * @param {number} props.totalPages - Total page count
 * @param {Function} props.onPageChange - Callback(newPage: number)
 */
// PUBLIC_INTERFACE
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  /**
   * buildPageNumbers - Generates the sequence of page numbers and ellipsis markers.
   * Uses delta=1 around current page; always includes first and last page.
   *
   * @returns {Array<number|string>} sequence of page numbers or '...'
   */
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

  const pageNumbers = buildPageNumbers();

  return (
    <nav className="tb-pagination" aria-label="Blog post pagination">
      {/* Previous button: layout_LINZSW > layout_3VH3NZ row, center, gap 8px */}
      <button
        className="tb-pagination__btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        {/* arrow-left: layout_4XNLBZ 20×20 */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8334 9.99999H4.16675M4.16675 9.99999L10.0001 15.8333M4.16675 9.99999L10.0001 4.16666" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Previous</span>
      </button>

      {/* Pagination numbers: layout_QMLV88 row, gap 2px */}
      <div className="tb-pagination__numbers" role="list">
        {pageNumbers.map((page, idx) => (
          <div key={`${page}-${idx}`} className="tb-pagination__number-box" role="listitem">
            {page === '...' ? (
              /* Ellipsis 40×40 box */
              <span className="tb-pagination__ellipsis" aria-hidden="true">...</span>
            ) : (
              /* layout_XGEDBK: row, center, padding 12px, 40×40, borderRadius 8px */
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

      {/* Next button: layout_LINZSW > layout_3VH3NZ row, center, gap 8px */}
      <button
        className="tb-pagination__btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <span>Next</span>
        {/* arrow-right: layout_4XNLBZ 20×20 */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16675 9.99999H15.8334M15.8334 9.99999L10.0001 4.16666M15.8334 9.99999L10.0001 15.8333" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </nav>
  );
}

export default Pagination;
