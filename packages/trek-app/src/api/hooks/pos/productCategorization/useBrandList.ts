import { useQuery } from "react-query"

import useApi, { useAxios } from "hooks/useApi"
import useInfiniteQuery from "hooks/useInfiniteQuery"

import { V1ApiProductBrandRequest } from "api/openapi"

import { Paginated, standardExtraQueryParam } from "helper/pagination"

import { Brand, mapBrand } from "types/POS/ProductCategorization/Brand"

import standardErrorHandling from "../../../errors"

export default (requestObject, perPage = 10) => {
  // const api = useApi()
  const axios = useAxios()

  const queryData = useQuery<any>(
    ["brandList", requestObject, perPage],
    ({ pageParam = 1 }) => {
      return axios
        .get(`brands`, {
          params: {
            ...requestObject,
          },
        })
        .then((res) => {
          return { data: res.data }
        })
        .catch(standardErrorHandling)
    },
    standardExtraQueryParam,
  )

  return queryData
}
