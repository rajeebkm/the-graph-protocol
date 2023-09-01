import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { OwnerSet } from "../generated/Owner/Owner"

export function createOwnerSetEvent(
  oldOwner: Address,
  newOwner: Address
): OwnerSet {
  let ownerSetEvent = changetype<OwnerSet>(newMockEvent())

  ownerSetEvent.parameters = new Array()

  ownerSetEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  ownerSetEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownerSetEvent
}
