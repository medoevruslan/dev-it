import { useMemo } from 'react'

export type Props = {
  currentPage: number
  siblingCount?: number
  totalCount: number
}

const DOTS = '...'

export const usePagination = ({ currentPage, siblingCount = 1, totalCount }: Props) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = 7

    /*
     Case 1:
     If the number of pages is less than the page numbers we want to show in our
     paginationComponent, we return the range [1..totalPageCount]
   */
    if (totalPageNumbers >= totalCount) {
      return range(1, totalCount)
    }

    const firstPageIndex = 1
    const lastPageIndex = totalCount

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalCount - 2

    /*
  Case 2: No left dots to show, but rights dots to be shown
*/
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, lastPageIndex]
    }

    /*
     Case 3: No right dots to show, but left dots to be shown
   */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalCount - rightItemCount + 1, totalCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
   Case 4: Both left and right dots to be shown
 */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [currentPage, siblingCount, totalCount])

  return paginationRange || []
}

function range(start: number, end: number) {
  const length = end - start + 1

  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start)
}
