import {
  TokenTransfered,
  withdrawComplete
} from "../generated/Contract/Contract"
import { LockToken } from "../generated/schema"
import { WithdrawToken } from "../generated/schema"

export function handleTokenTransfered(event: TokenTransfered): void {
  let entity = LockToken.load(event.params._id.toString())
  if (!entity) {
    entity = new LockToken(event.params._id.toString())
    entity._from = event.params._from
    entity._to = event.params._to
    entity._amount = event.params._value
  }
  entity.save()
}

export function handlewithdrawComplete(event: withdrawComplete): void {
  let entity = WithdrawToken.load(event.transaction.from.toHex())
  if (!entity) {
    entity = new WithdrawToken(event.transaction.from.toHex())
    entity._from = event.params._from
    entity._to = event.params._to
  }
  entity.save()

}
