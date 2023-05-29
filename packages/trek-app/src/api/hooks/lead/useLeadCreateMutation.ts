import useApi from "hooks/useApi"
import useMutation from "hooks/useMutation"

import { Lead } from "types/Lead"

import { queryClient } from "../../../query"
import defaultMutationErrorHandler from "../../errors/defaultMutationError"

type CreateLeadMutationData = {
  type: Lead["type"]
  label: Lead["label"]
  customerId: Lead["customer"]["id"]
  leadCategoryId: Lead["leadCategory"]["id"]
  isUnhandled: Lead["isUnhandled"]
  interest: Lead["interest"]
  voucher: any
  channelId?: number
}

export default () => {
  const api = useApi()

  const mutationData = useMutation<any, CreateLeadMutationData>(
    ({
      type,
      label,
      customerId,
      leadCategoryId,
      isUnhandled,
      interest,
      voucher,
      channelId,
    }: CreateLeadMutationData) => {
      return api.leadStore({
        data: {
          type,
          label,
          customer_id: customerId,
          channel_id: channelId,
          lead_category_id: leadCategoryId,
          is_unhandled: isUnhandled,
          interest,
          vouchers: voucher,
        },
      })
    },
    {
      chainSettle: (x, passedVariables: CreateLeadMutationData) =>
        x
          .then(() => {
            toast("Lead berhasil dibuat")

            queryClient.invalidateQueries("leadListByUser")
            queryClient.invalidateQueries("leadListByUnhandled")
            queryClient.invalidateQueries([
              "leadListByCustomer",
              passedVariables.customerId,
            ])
          })
          .catch(defaultMutationErrorHandler({})),
    },
  )

  return mutationData
}
