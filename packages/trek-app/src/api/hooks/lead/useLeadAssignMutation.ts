import useApi, { useAxios } from "hooks/useApi"
import useMutation from "hooks/useMutation"

import { Lead } from "types/Lead"
import { User } from "types/User"

import { queryClient } from "../../../query"
import defaultMutationErrorHandler from "../../errors/defaultMutationError"

type AssignLeadMutationData = {
  id: Lead["id"]
  brand: any
}

export default () => {
  const axios = useAxios()
  const mutationData = useMutation<any, AssignLeadMutationData>(
    ({ id, brand }: AssignLeadMutationData) => {
      return axios.put(`leads/${id}/assign`, {
        product_brand_ids: brand,
      })
    },
    {
      chainSettle: (x, passedVariables) =>
        x
          .then((res) => {
            toast("Lead berhasil di assign")
            queryClient.invalidateQueries("leadListByUser")
            queryClient.invalidateQueries("leadListByCustomer")
            queryClient.invalidateQueries("leadListByUnhandled")
            queryClient.invalidateQueries(["lead", passedVariables.id])
          })
          .catch(defaultMutationErrorHandler({})),
    },
  )

  return mutationData
}
