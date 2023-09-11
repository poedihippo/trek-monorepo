import { useQuery } from "react-query"

import { useAxios } from "hooks/useApi"

import { standardExtraQueryParam } from "helper/pagination"

import standardErrorHandling from "../../errors"

export default (requestObject, perPage = 20) => {
  const axios = useAxios()
  const queryData = useQuery<any>(
    ["promo", requestObject, perPage],
    ({ pageParam = 1 }) => {
      return axios
        .get(`promos`, {
          params: {
            ...requestObject,
          },
        })
        .then((res) => {
          return { data: res.data.data }
        })
        .catch(standardErrorHandling)
    },
    standardExtraQueryParam,
  )
  return queryData
}
