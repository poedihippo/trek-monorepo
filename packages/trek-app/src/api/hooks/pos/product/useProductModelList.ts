import { useQuery, UseQueryOptions } from "react-query"

import useApi, { useAxios } from "hooks/useApi"
import useInfiniteQuery from "hooks/useInfiniteQuery"

import { V1ApiProductModelRequest } from "api/openapi"

import { Paginated, standardExtraQueryParam } from "helper/pagination"

import { ProductModel, mapProductModel } from "types/POS/Product/ProductModel"

import standardErrorHandling from "../../../errors"

export default (
  requestObject,
  perPage = 10,
  // extraProps?: UseQueryOptions<any, any, any>,
) => {
  // const api = useApi()
  const axios = useAxios()
  const queryData = useQuery<any>(
    ["productModelList", requestObject, perPage],
    ({ pageParam = 1 }) => {
      return axios
        .get(`products`, {
          params: {
            ...requestObject,
          },
        })
        .then((res) => {
          return { data: res.data }
        })
        .catch(standardErrorHandling)
    },
    { ...standardExtraQueryParam },
  )

  return queryData
}
