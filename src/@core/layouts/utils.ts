// ** Types
import { NavGroup, NavLink } from 'src/@core/layouts/types'
import { NextRouter } from 'next/router'

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */
export const handleURLQueries = (router: NextRouter, path: string | undefined): boolean => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query)

    return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]] as string) && path !== '/'
  }

  return false
}

/**
 * Check if the given item has the given url
 * in one of its children
 *
 * @param item
 * @param currentURL
 */
export const hasActiveChild = (item: NavGroup, currentURL: string): boolean => {
  const { children } = item

  if (!children) {
    return false
  }

  for (const child of children) {
    if ((child as NavGroup).children) {
      if (hasActiveChild(child, currentURL)) {
        return true
      }
    }
    const childPath = (child as NavLink).path

    // Check if the child has a link and is active
    if (
      child &&
      childPath &&
      currentURL &&
      (childPath === currentURL || (currentURL.includes(childPath) && childPath !== '/'))
    ) {
      return true
    }
  }

  return false
}

/**
 * Check if this is a children
 * of the given item
 *
 * @param children
 * @param openGroup
 * @param currentActiveGroup
 */
export const removeChildren = (children: NavLink[], openGroup: string[], currentActiveGroup: string[]) => {
  children.forEach((child: NavLink) => {
    if (!currentActiveGroup.includes(child.title)) {
      const index = openGroup.indexOf(child.title)
      if (index > -1) openGroup.splice(index, 1)

      // @ts-ignore
      if (child.children) removeChildren(child.children, openGroup, currentActiveGroup)
    }
  })
}

export const convertDateFormat = (inputDate: string) => {
  // Parse the input date string
  const parts = inputDate.split('-')
  if (parts.length !== 3) {
    return 'Invalid date format'
  }

  const year = parseInt(parts[0])
  const month = parseInt(parts[1])
  const day = parseInt(parts[2])

  // Create a new Date object
  const date = new Date(year, month - 1, day)

  // Format the date as desired
  const formattedDate = date.toDateString() + ' ' + date.toTimeString()

  return formattedDate
}

export const formatDate = (userData: any, key: string) => {
  if (userData[key] !== undefined && userData[key] !== null) {
    const date = userData[key]
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
  } else {
    return ''
  }
}
