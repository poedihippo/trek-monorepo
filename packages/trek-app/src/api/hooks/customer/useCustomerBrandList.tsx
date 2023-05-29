import { useQuery } from "react-query"

import useApi, { useAxios } from "hooks/useApi"

import { Paginated, standardExtraQueryParam } from "helper/pagination"

import standardErrorHandling from "../../errors"

export default (id, perPage = 20) => {
  const axios = useAxios()
  const queryData = useQuery<any>(
    ["userList", id, perPage],
    ({ pageParam = 1 }) => {
      return axios
        .get(`leads/${id}/product-brands`, {
          params: {
            available_product_brands: true,
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
