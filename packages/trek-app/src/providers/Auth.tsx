import React, { useContext, useEffect, useState } from "react"

import useStorageState from "hooks/useStorageState"

import { User } from "types/User"

import { queryClient } from "../query"

export type AuthType = {
  jwt?: string
}

const initialData: AuthType = {
  jwt: undefined,
}
const initialUserData: User = {
  id: undefined,
  name: undefined,
  email: undefined,
  type: undefined,
  company: undefined,
  companyId: undefined,
  channelId: undefined,
  supervisorId: undefined,
  supervisorTypeId: undefined,
  initial: undefined,
  reportable_type: undefined,
  as: undefined,
  emailVerifiedAt: undefined,
  discount_approval_limit_percentage: undefined,
  app_show_hpp: undefined,
  app_approve_discount: undefined,
  app_create_lead: undefined,
}

type ProviderType = {
  loggedIn: boolean
  data: AuthType
  onLogin: (jwt: string) => void
  saveData: (User) => void
  onLogout: () => void
  isLoading: boolean
  userData: User
}

export const AuthContext = React.createContext<ProviderType>({
  loggedIn: true,
  data: { jwt: "" },
  onLogin: () => {},
  saveData: () => {},
  onLogout: () => {},
  userData: null,
  isLoading: true,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthConsumer = AuthContext.Consumer

export const AuthProvider = (props) => {
  const [data, setData] = useStorageState<AuthType>("auth", initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useStorageState<User>("user", initialUserData)

  useEffect(() => {
    if (!!data && data.jwt !== undefined) {
      setIsLoading(false)
    }
  }, [data, setIsLoading])

  const onLogin = (newJwt) => {
    setData((prevData) => ({ ...prevData, jwt: newJwt }))
  }
  const saveData = (userData) => {
    setUserData(userData)
  }
  const onLogout = () => {
    setData((prevData) => ({ ...prevData, jwt: null }))
    // Clear all API cache. Makes sure we have correct data
    queryClient.clear()
  }

  const loggedIn = !!data.jwt && data.jwt !== ""

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        data,
        userData,
        onLogin,
        saveData,
        onLogout,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
