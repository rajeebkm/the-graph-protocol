import { OwnerSet as OwnerSetEvent } from "../generated/Owner/Owner"
import { OwnerSet } from "../generated/schema"

export function handleOwnerSet(event: OwnerSetEvent): void {
  let entity = new OwnerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
