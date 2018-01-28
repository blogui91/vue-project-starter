const getters = {
  currentUser  (state) {
    return state.currentUser
  },
  isStaff (state) {
    let user = state.currentUser

    if (user) {
      return user.is_staff
    }
    return false
  },
  isAdmin (state) {
    let user = state.currentUser

    if (user) {
      return user.is_admin
    }
    return false
  },
  isSuperAdmin (state) {
    let user = state.currentUser

    if (user) {
      return user.is_superadmin
    }
    return false
  },
  isStaffOrAdmin (state) {
    let user = state.currentUser

    if (user) {
      return (user.is_staff || user.is_admin) && !user.is_superadmin
    }
    return false
  },
  isSeller (state) {
    let user = state.currentUser
    if (user) {
      return !user.is_super_admin && !user.is_admin && !user.is_staff
    }
    return false
  }
}

export default getters
